import { HfInference } from "@huggingface/inference";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.HF_API_KEY) {
    throw new Error("HuggingFace API key is missing or invalid.");
}
export const hf = new HfInference(process.env.HF_API_KEY);
if(!process.env.SUPABASE_API_KEY){
    throw new Error("Supabase API key missing or invalid");
}
if(!process.env.SUPABASE_URL){
    throw new Error("Supabase URL missing or invalid");
}
export const supabase = createClient(process.env.SUPABASE_URL,process.env.SUPABASE_API_KEY);