import openai from "./config.mjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname  =  path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
const embedIt = "Cat";
/*
Can be Array's

const embedIt = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
];*/
async function main(){
    const embedding = await openai.embeddings.create({
        model:process.env.EMBED_MODEL,
        input:embedIt
    });
    console.log(embedding);
    console.log(embedding.data[0].embedding);
    console.log(embedding.data[0].embedding.length);
}
main();