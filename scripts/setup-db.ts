import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function setupDatabase() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("Connected to Supabase");

  // Enable pgvector extension
  const { error: extError } = await supabase.rpc("exec_sql", {
    sql: "CREATE EXTENSION IF NOT EXISTS vector",
  });

  // If exec_sql RPC doesn't exist, the user needs to run SQL manually
  if (extError) {
    console.log("\n⚠️  Cannot run SQL via RPC. Please run the following SQL in Supabase SQL Editor:");
    console.log("   (Dashboard → SQL Editor → New query)\n");
    console.log(`-- 1. Enable pgvector
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Knowledge chunks table
CREATE TABLE IF NOT EXISTS knowledge_chunks (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  locale VARCHAR(5) NOT NULL,
  category VARCHAR(50),
  embedding VECTOR(1536) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. HNSW index for fast similarity search
CREATE INDEX IF NOT EXISTS knowledge_chunks_embedding_idx
ON knowledge_chunks
USING hnsw (embedding vector_cosine_ops);

-- 4. Leads table
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

-- 5. RPC function for similarity search
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
`);
    return;
  }

  console.log("Database setup complete!");
}

setupDatabase().catch(console.error);
