import openai from "openai";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname  =  path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
if(!process.env.AI_KEY){
    throw new Error("OpenAI API key is missing or invalid.");
}
export default new openai({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL
});
