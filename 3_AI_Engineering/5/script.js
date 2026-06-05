import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import OpenAI  from "openai";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
import {checkEnvironment} from "../env.mjs";
checkEnvironment();
const openAI = new OpenAI({
    apiKey: process.env.AI_KEY,
    baseURL: process.env.AI_URL
});
const response = await openAI.chat.completions.create({
    model : process.env.AI_MODEL,
    messages : [
        {
            role : "user",
            content : `Suggest some gifts for someone who loves hiphop music. 
                        Make these suggestions thoughtful and practical. Your response 
                        must be under 100 words. Skip intros and conclusions. 
                        Only output gift suggestions.`
        },
        {
            role: "assistant",
            content: `
            - Limited-edition hip-hop vinyl
            - Quality over-ear headphones for listening and mixing
            - USB turntable to digitize records
            - Intro DAW bundle or gift card plus MIDI keyboard
            - Compact MIDI pad controller (Launchpad Mini)
            - Tickets to a hip-hop show or festival
            - Hip-hop history book or documentary collection
            `
        },
        {
            role : "user",
            content : `Please make the suggestions 
                        more budget friendly i.e under $40`
        }
    ]
});
console.log(response.choices[0].message.content);
/*
import { checkEnvironment } from "./utils.js"
import OpenAI from "openai"

// Initialize the OpenAI client using environment variables
const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true
})

checkEnvironment();

const messages = [ 
  {
    role: "user",
    content: `Suggest some gifts for someone who loves hiphop music. 
    Make these suggestions thoughtful and practical. Your response 
    must be under 100 words. Skip intros and conclusions. 
    Only output gift suggestions.`
  }
]

const firstResponse = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages
})

// Extract the model's generated text from the response
console.log(firstResponse.choices[0].message.content)

const firstAssistantMessage = firstResponse.choices[0].message
messages.push(firstAssistantMessage)

messages.push({
  role: "user",
  content: "More budget friendly. Less than $40."
})

// Send second chat completions request with extended messages array
const secondResponse = await openai.chat.completions.create({
  model: process.env.AI_MODEL,
  messages,
});

console.log("Budget friendly suggestions:");
console.log(secondResponse.choices[0].message.content);
*/