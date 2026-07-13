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

-- 4. Leads table (chatbot lead capture)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  company VARCHAR(255),
  need TEXT,
  locale VARCHAR(5),
  source VARCHAR(50) DEFAULT 'chatbot',
  conversation JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Similarity search RPC used by src/lib/rag.ts
CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding VECTOR(1536),
  query_locale VARCHAR(5),
  match_limit INT DEFAULT 4,
  match_threshold FLOAT DEFAULT 0.3
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
    AND 1 - (knowledge_chunks.embedding <=> query_embedding) > match_threshold
  ORDER BY knowledge_chunks.embedding <=> query_embedding
  LIMIT match_limit;
$$;
