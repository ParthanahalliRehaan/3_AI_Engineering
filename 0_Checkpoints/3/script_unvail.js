import dotenv from "dotenv";
import path from "path";
import {fileURLToPath} from "url";
import openai from "openai";
import { checkEnvironment } from "../tool.mjs";
// Resolve current directory of script_unvail.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Load .env from parent folder (3_AI_Engineering)
dotenv.config({path:path.resolve(__dirname,"../.env")});
checkEnvironment();
const Openai = new openai({
    apiKey : process.env.OPENAI_KEY,
    baseURL : process.env.OPENAI_URL,
    dangerouslyAllowBrowser : true
});

//First ever API request & Understanding the response of chat completions API Endpoint
const userMessage = {
    role : "user",
    content :  `Hi, Give todays weather highlights of Chennai`
}
const Response = await Openai.chat.completions.create( // Here we can also make a raw HTTP request, look at Cloudflares code
    {
        model : process.env.OPENAI_MODEL,
        messages : [userMessage]
    }
);
console.log(Response);
/* Output
{
id: 'chatcmpl-DBxJFACvotUqOCpxGdPO4D6mzOuvB',
object: 'chat.completion',
created: 1771741965,
model: 'gpt-5-nano-2025-08-07',
choices: [ { index: 0, message: [Object], finish_reason: 'stop' } ],
usage: {
    prompt_tokens: 14,
    completion_tokens: 1748,
    total_tokens: 1762,
    prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
    completion_tokens_details: {
    reasoning_tokens: 1536,
    audio_tokens: 0,
    accepted_prediction_tokens: 0,
    rejected_prediction_tokens: 0
    }
},
service_tier: 'default',
system_fingerprint: null
}
*/
console.log(Response.choices[0].message);
/* Output
{
role: 'assistant',
content: 'I can help with that, but I don’t have real-time weather data unless I fetch it from a live source. Would you like me to pull today’s weather highli
ghts for Chennai from a weather service and summarize them? If yes, I’ll include:\n' +
    '- Current temperature and high/low\n' +
    '- Precipitation chances\n' +
    '- Humidity\n' +
    '- Wind\n' +
    '- UV index\n' +
    '- Air quality (if available)\n' +
    '\n' +
    'If you’d prefer, I can also share typical patterns for Chennai around this time of year.',
refusal: null,
annotations: []
}
*/