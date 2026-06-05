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
]

/*async function main(){
    const response = await hf.featureExtraction({
        model:process.env.EMBED_MODEL,
        inputs:embedIt,
    });
    const embedding = typeof embedIt === "string" ? [response] : response;
    const paired = embedIt.map((text, index) => ({
        text: text,
        embedding: Array.from(response[index])
    }));
    console.log(paired);
}
main();*/
async function main(input) {
  const results = await Promise.all(
    input.map(async (textChunk) => {
      const embeddingResponse = await hf.featureExtraction({
        model: process.env.EMBED_MODEL,
        inputs: textChunk,
      });
      return { content: textChunk, embeddings: Array.from(embeddingResponse) };
    })
  );
  console.log(results);
}
main(embedIt);