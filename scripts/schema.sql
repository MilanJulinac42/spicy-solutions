-- Solvera knowledge base schema.
-- Run this in the Supabase Dashboard → SQL Editor → New query → Run.
-- Needed once per (new) Supabase project, before `npx tsx scripts/seed-knowledge.ts`.

-- 1. Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Knowledge chunks table (embedding dim 1536 = OpenAI text-embedding-3-small)
CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  locale VARCHAR(5) NOT NULL,
  category VARCHAR(50),
  embedding VECTOR(1536) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HNSW index for fast cosine similarity search
CREATE INDEX IF NOT EXISTS knowledge_chunks_embedding_idx
ON knowledge_chunks
USING hnsw (embedding vector_cosine_ops);

-- 4. Leads table (chatbot lead capture + voice demo requests)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  company VARCHAR(255),
  need TEXT,
  locale VARCHAR(5),
  source VARCHAR(50) DEFAULT 'chatbot',
  conversation JSONB,
  phone VARCHAR(50),
  industry VARCHAR(100),
  preferred_time VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4b. Voice demo columns for databases created before this feature.
-- Safe to run repeatedly; no-ops once the columns exist.
ALTER TABLE leads ADD COLUMN IF NOT EXISTS phone VARCHAR(50);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS industry VARCHAR(100);
ALTER TABLE leads ADD COLUMN IF NOT EXISTS preferred_time VARCHAR(100);

-- 4c. Voice demo session log.
-- Serves two purposes: rate limiting that survives serverless cold starts
-- (in-memory counters reset per instance, so they can't be trusted), and a
-- record of how much the demo is actually used. IPs are stored hashed.
CREATE TABLE IF NOT EXISTS voice_sessions (
  id SERIAL PRIMARY KEY,
  ip_hash VARCHAR(64),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS voice_sessions_created_at_idx
ON voice_sessions (created_at DESC);

CREATE INDEX IF NOT EXISTS voice_sessions_ip_idx
ON voice_sessions (ip_hash, created_at DESC);

-- 4d. Small key/value store for things the code must be able to rewrite.
-- Currently the Instagram access token: Meta's expires after 60 days and the
-- refreshed value has to outlive a redeploy, which a host env var can't do.
CREATE TABLE IF NOT EXISTS app_settings (
  key VARCHAR(64) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4e. Clients. Everything with a tenant_id points here.
-- Keyed by slug rather than the UUID id: it shows up in logs, in connect links
-- and in hand-written queries, so it has to be readable.
CREATE TABLE IF NOT EXISTS tenants (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name                TEXT NOT NULL,
  slug                VARCHAR(64) NOT NULL,
  system_prompt_extra TEXT,
  kontakt_fallback    TEXT,
  active              BOOLEAN DEFAULT TRUE,
  created_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Older databases carry a NOT NULL api_key from an abandoned widget product.
-- Nothing reads it, and leaving it required means inventing a fake key for
-- every client just to get the row in.
ALTER TABLE tenants ALTER COLUMN api_key DROP NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS tenants_slug_key ON tenants (slug);

INSERT INTO tenants (name, slug, kontakt_fallback, active)
VALUES ('Solvera', 'solvera', 'info@solveradev.rs', TRUE)
ON CONFLICT (slug) DO NOTHING;

ALTER TABLE knowledge_chunks
  ADD COLUMN IF NOT EXISTS tenant_id VARCHAR(64) NOT NULL DEFAULT 'solvera'
  REFERENCES tenants(slug);

CREATE INDEX IF NOT EXISTS knowledge_chunks_tenant_idx
  ON knowledge_chunks (tenant_id, locale);

-- 4f. Connected Instagram accounts. Keyed by the account id because that is
-- what arrives on the webhook and decides whose customer is writing.
CREATE TABLE IF NOT EXISTS ig_accounts (
  ig_user_id   VARCHAR(64) PRIMARY KEY,
  tenant_id    VARCHAR(64) NOT NULL REFERENCES tenants(slug),
  access_token TEXT NOT NULL,
  username     TEXT,
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ig_accounts_tenant_idx ON ig_accounts (tenant_id);

-- 5. Similarity search RPC used by src/lib/rag.ts
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding VECTOR(1536),
  query_locale VARCHAR(5),
  match_limit INT DEFAULT 4,
  match_threshold FLOAT DEFAULT 0.3,
  query_tenant VARCHAR(64) DEFAULT 'solvera'
)
RETURNS TABLE (
  id INT,
  content TEXT,
  category VARCHAR(50),
  similarity FLOAT
)
LANGUAGE sql STABLE
AS $$
  SELECT
    knowledge_chunks.id,
    knowledge_chunks.content,
    knowledge_chunks.category,
    1 - (knowledge_chunks.embedding <=> query_embedding) AS similarity
  FROM knowledge_chunks
  WHERE knowledge_chunks.locale = query_locale
    AND knowledge_chunks.tenant_id = query_tenant
    AND 1 - (knowledge_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_chunks.embedding <=> query_embedding
  LIMIT match_limit;
$$;
