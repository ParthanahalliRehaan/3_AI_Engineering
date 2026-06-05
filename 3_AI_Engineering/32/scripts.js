import { hf, supabase } from "./config.mjs";
import { embedIt } from "./content.mjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { query } from "./query.mjs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function storeEmbeddings(input) {
  const results = await Promise.all(
    input.map(async (textChunk) => {
      const embeddingResponse = await hf.featureExtraction({
        model: process.env.EMBED_MODEL, 
        inputs: textChunk,
      });

      // Convert to plain array
      const embedding = Array.from(embeddingResponse);

      // Insert into Supabase
      const { data, error } = await supabase
        .from("embeddings")
        .insert([{ content: textChunk, embedding }])
        .select();

      if (error) {
        console.error("Insert error:", error);
      } else {
        console.log("Inserted:", data);
      }

      return { content: textChunk, embedding };
    })
  );
  console.log("All embeddings processed:");
}

async function semanticSearch(queries){
    const results = await Promise.all(
        queries.map( async query => {
            const embeddingResponse = await hf.featureExtraction(
                {
                    model:process.env.EMBED_MODEL,
                    inputs:query,
                }
            )
            const queryEmbedding = Array.from(embeddingResponse);
            const { data } = await supabase.rpc('match_embeddings', {
                query_embedding: queryEmbedding,
                match_threshold: 0.50,
                match_count: 1
            });
            return { query , queryEmbedding , SimilarQuery : data};
        })
    );
    console.log(JSON.stringify(results, null, 2));

}
semanticSearch(query);