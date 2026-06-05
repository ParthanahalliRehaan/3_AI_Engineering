// script.js (inside folder 3)
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Resolve current directory of script.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from parent folder (AI_Engineering)
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Import and run environment check
import { checkEnvironment } from "../env.mjs";
checkEnvironment();

import openAI from 'openai';
const OpenAI = new openAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL,
    dangerouslyAllowBrowser: true //We should never store the API KEY in the frontend 
});

//First AI request
const prompt = "Tell me whats the model that I`m communicating!";
console.log(`Sending prompt to AI Provider : ${prompt}`);
try{
    //response is also a promise
    //Chat completions
    //A chat completion is essentially the bridge between your API request and the model’s conversational output.

    const response = await OpenAI.chat.completions.create({
        model:process.env.AI_MODEL,
        messages:[
            {
                role:"user",
                content:prompt
            }
        ]
    });
    console.log(`response : ${response.choices[0].message.content}`);
} catch(error) {
    if(error.status === 401 || error.staus === 403 ) {
        console.error("Authentication error: Check whether the API_KEY is revoked?");
    } else if (error.status >=500 ) {
        console.error("AI Provider error: Something went wrong on the Providers side, Please try after some time.");
    } else {
        console.error(
            "Unexpected error",
            error.message || error
        );
    }
}
