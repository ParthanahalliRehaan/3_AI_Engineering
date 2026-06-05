import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import {checkEnvironment} from "../env.mjs";
import openai from "openai";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
    path:path.resolve(__dirname,"../.env")
});
//checkEnvironment();
const openAI = new openai({
    apiKey:process.env.AI_KEY,
    baseURL : process.env.AI_URL
});
const messages = [
    {
        role:"user",
        content:"Hi,Genie Tell me a joke"
    },
    {
        role: "system",
        content: `Make these output thoughtful and practical. 
        Your response must be under 100 words. 
        Skip intros and conclusions. 
        Also give the output in a clean format.
        Act as a Genie.`
  },
]
const response = await openAI.chat.completions.create({
    model:process.env.AI_MODEL, //never hardcord
    messages:messages
});
messages.push(
    {
        role:"assistant",
        content:response.choices[0].message.content
    },
    {
        role:"user",
        content:"Give a better one"
    }
);
const responseAnother = await openAI.chat.completions.create({
    model:process.env.AI_MODEL, //never hardcord
    messages:messages
});
console.log(responseAnother.choices[0].message.content);