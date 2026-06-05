import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { HfInference } from "@huggingface/inference";
import { createClient } from "@supabase/supabase-js"; 
import openai from "openai";
import { CharacterTextSplitter, RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname,"../.env")});
if(!process.env.HF_API_KEY){
    throw new Error("Huggingface API key Invalid or Expired");
}
if(!process.env.EMBED_MODEL){
    throw new Error("Huggingface Model Invalid or Expired");
}
if(!process.env.SUPABASE_API_KEY){
    throw new Error("Supabase API key Invalid or Expired");
}
if(!process.env.SUPABASE_URL){
    throw new Error("Supabase URL Invalid or Changed");
}
if(!process.env.AI_KEY){
    throw new Error("OpenAI API key Invalid or Expired");
}
if(!process.env.AI_URL){
    throw new Error("OpenAI URL Invalid or Changed");
}
export const hf = new HfInference(process.env.HF_API_KEY);
export const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API_KEY);
export const openAI = new openai({
    apiKey:process.env.AI_KEY,
    baseURL:process.env.AI_URL,
});
export const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 150,
    chunkOverlap: 15,
});