import { hf } from "./config.mjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const embedIt = "Cat";

async function main() {
    const response = await hf.featureExtraction({
        model: process.env.EMBED_MODEL,
        inputs: embedIt,
    });

    const embeddings = typeof embedIt === "string" ? [response] : response;

    console.log(response);
    console.log(embeddings[0]);
    console.log(embeddings[0].length);
}

main();