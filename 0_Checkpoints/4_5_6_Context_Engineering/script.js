import {fileURLToPath} from "url";
import dotenv from "dotenv";
import path from "path";
import OpenAI from "openai";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
import {checkEnvironment} from "../tool.mjs";
checkEnvironment();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  baseURL: process.env.OPENAI_URL,
  dangerouslyAllowBrowser: true
})

const messages = [ 
  {
    role: "user",
    content: `Suggest some gifts for someone who loves hiphop music. 
    Make these suggestions thoughtful and practical. Your response 
    must be under 100 words. Skip intros and conclusions. 
    Only output gift suggestions.
    
    Give me response under 100 words and it must be concise and straight to the point`
  }
  //You can explicitly mention in the content about token limit, 100 words or so or implicitly too.
]

const firstResponse = await openai.chat.completions.create({
  model: process.env.OPENAI_MODEL,
  //max_completion_tokens: 256,
  messages
  
})

console.log(firstResponse.choices[0].message.content)

const firstAssistantMessage = firstResponse.choices[0].message
messages.push(firstAssistantMessage)

messages.push({
  role: "user",
  content: "More budget friendly. Less than $40."
})

const secondResponse = await openai.chat.completions.create({
  model: process.env.OPENAI_MODEL,
  messages,
});

console.log("Budget friendly suggestions:");
console.log(secondResponse.choices[0].message.content);
/*Output
{
  id: 'chatcmpl-DC7mjd3SInuTqJG8cCcmiu7b5e481',
  object: 'chat.completion',
  created: 1771782233,
  model: 'gpt-5-nano-2025-08-07',
  choices: [ { index: 0, message: [Object], finish_reason: 'length' } ],
  usage: {
    prompt_tokens: 24,
    completion_tokens: 256,
    total_tokens: 280,
    prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
    completion_tokens_details: {
      reasoning_tokens: 256,
      audio_tokens: 0,
      accepted_prediction_tokens: 0,
      rejected_prediction_tokens: 0
    }
  },
  service_tier: 'default',
  system_fingerprint: null
}
*/