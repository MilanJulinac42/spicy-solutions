-- Faza 0 — vodovod za više klijenata.
-- Pokrenuti u Supabase → SQL Editor → New query → Run.
-- Bezbedno je pokrenuti više puta.

-- 1. Klijenti.
--
-- Tabela `tenants` već postoji od ranije (demo botovi SmileDent, ProDrive,
-- PetCare) i nijedan red koda je ne koristi. Struktura joj odgovara, pa se
-- dopunjuje umesto da se pravi druga tabela sa istim značenjem — dve tabele
-- koje obe znače „klijent" su greška koja se plaća godinama.
--
-- Ključ je `slug`, ne UUID: pojavljuje se u logovima, u linkovima za
-- povezivanje i u ručnim upitima, pa mora da bude čitljiv.

ALTER TABLE tenants ADD COLUMN IF NOT EXISTS kontakt_fallback TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS tenants_slug_key ON tenants (slug);

INSERT INTO tenants (name, slug, kontakt_fallback, active)
VALUES ('Solvera', 'solvera', 'info@solveradev.rs', TRUE)
ON CONFLICT (slug) DO NOTHING;

-- 2. Postojeći komadići znanja pripadaju Solveri.
-- DEFAULT postoji da bi stari kod koji ne šalje tenant i dalje radio.
ALTER TABLE knowledge_chunks
  ADD COLUMN IF NOT EXISTS tenant_id VARCHAR(64) NOT NULL DEFAULT 'solvera'
  REFERENCES tenants(slug);

CREATE INDEX IF NOT EXISTS knowledge_chunks_tenant_idx
  ON knowledge_chunks (tenant_id, locale);

-- 3. Povezani Instagram nalozi. Ključ je ID naloga jer webhook stiže sa njim.
CREATE TABLE IF NOT EXISTS ig_accounts (
  ig_user_id   VARCHAR(64) PRIMARY KEY,
  tenant_id    VARCHAR(64) NOT NULL REFERENCES tenants(slug),
  access_token TEXT NOT NULL,
  username     TEXT,
  updated_at   TIMESTAMPTZ DEFAULT NOW(),
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS ig_accounts_tenant_idx ON ig_accounts (tenant_id);

-- 4. Pretraga po klijentu.
--
-- Stara funkcija se briše umesto da se doda preopterećenje: dve verzije sa
-- istim imenom prave dvosmislenost i Postgres odbija poziv sa četiri
-- argumenta. Novi parametar ima podrazumevanu vrednost, pa sajt i glasovni
-- asistent nastavljaju da rade nepromenjeni.
DROP FUNCTION IF EXISTS match_knowledge(VECTOR(1536), VARCHAR(5), INT, FLOAT);

CREATE OR REPLACE FUNCTION match_knowledge(
  query_embedding VECTOR(1536),
  query_locale    VARCHAR(5),
  match_limit     INT DEFAULT 4,
  match_threshold FLOAT DEFAULT 0.3,
  query_tenant    VARCHAR(64) DEFAULT 'solvera'
)
RETURNS TABLE (
  id         INT,
  content    TEXT,
  category   VARCHAR(50),
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

-- 5. Stari jednokorisnički token više nije potreban — nalozi žive u
-- ig_accounts. Red se ne briše automatski; obriši ga sam kad potvrdiš da
-- /status prikazuje nalog.
--   DELETE FROM app_settings WHERE key = 'ig_access_token';
