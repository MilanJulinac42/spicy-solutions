import { supabase } from "./db";
import { getEmbedding } from "./embeddings";

export async function searchKnowledge(
  userQuery: string,
  locale: string,
  limit = 6
): Promise<string[]> {
  const embedding = await getEmbedding(userQuery);

  const { data, error } = await supabase.rpc("match_knowledge", {
    query_embedding: embedding,
    query_locale: locale,
    match_limit: limit,
    match_threshold: 0.28,
  });

  if (error) {
    console.error("RAG search error:", error);
    return [];
  }

  return (data || []).map((row: { content: string }) => row.content);
}
