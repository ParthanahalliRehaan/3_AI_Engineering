import { hf } from "./config.mjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { supabase } from "./config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const embedIt = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
];

async function main(input) {
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

main(embedIt);