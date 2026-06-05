import {fileURLToPath} from "url";
import dotenv from "dotenv";
import path from "path";
import openai from "openai";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
import {checkEnvironment} from "../env.mjs";
checkEnvironment();
const openAI = new openai({
    apiKey:process.env.AI_KEY,
    baseURL:process.env.AI_URL
});
const response = await openAI.chat.completions.create({
    model:process.env.AI_MODEL,
    messages:[{
        role:"user",
        content:" Add an option to your API call that limits to how many tokens the model can generate. Give me response under 100 words and it must be concise and straight to the point"
    }],
    //max_completion_tokens: 256 // We won't get output because look at the output reponse ie console.log(response)
});
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
console.log(response);
console.log(response.choices[0].message.content);