import { checkEnvironment } from "../env.mjs";
import openai from "openai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { giftSchemaResponses } from "./schema.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
checkEnvironment();
const openAI = new openai({
    baseURL:process.env.AI_URL,
    apiKey:process.env.AI_KEY
});
const response = await openAI.responses.create({
    model:process.env.AI_MODEL,
   
    input:"Suggest 5 gifts for Japanese New Year (Shogatsu)",
   
    text: {
      format: giftSchemaResponses
    },
    tools: [ {
      type: "web_search"
    }]
    //response_format:giftSchema
    // wont work 
    /*The reason you’re only seeing `{}` is because you’re mixing two different APIs:

                - `chat.completions.create` only supports simple formats like `"json"` or `"text"`.  
                - JSON schema enforcement (`{ type: "json_schema", json_schema: { … } }`) is only supported in the newer `responses.create` API.  

                When you pass a schema object into `chat.completions.create`, the endpoint doesn’t know how to apply it, so it just returns an empty object.  

                ✅ To fix this, you need to call `responses.create` instead of `chat.completions.create` when using a schema. That way, the model will generate structured JSON that matches your `giftSchema`.*/

});
console.log(JSON.parse(response.output_text));
// Web search 
/*
{
  gifts: [
    {
      name: 'Premium Wagashi Gift Box',
      price_range: '$25–$60',
      why_its_good: 'Traditional Japanese sweets like nerikiri, manju, and mochi are perfect for Shogatsu tea-time. A beautifully boxed wagashi set is shareable with family and g
uests, and its delicate presentation fits the festive mood (red/white accents are common for New Year). Tip: include a short New Year message card.'
    },
    {
      name: 'Seasonal Fruit Gift Box (high-end citrus or mixed fruit)',
      price_range: '$40–$100',
      why_its_good: 'Luxurious fruit is a classic New Year gift in Japan, signaling prosperity and abundance for the year ahead. Great for hosting or giving to families; you can 
choose seasonal options like mandarins/mikan, yuzu, or a mixed fruit box.'
    },
    {
      name: 'Mini Kadomatsu or Kagami Mochi Decoration',
      price_range: '$12–$40',
      why_its_good: 'These traditional New Year decorations help set a festive mood and symbolize good fortune. A small, elegant decoration can be a thoughtful host gift or a hou
sewarming-style gesture for Shogatsu.'
    },
    {
      name: 'Sake Gift Set or Japanese Tea Set',
      price_range: '$25–$120',
      why_its_good: 'Alcoholic options (premium sake or Japanese whisky) are popular among adults celebrating the New Year, while a tea set or high-quality tea assortment works f
or non-drinkers. Either choice pairs well with a celebratory toast or quiet New Year tea time.'
    },
    {
      name: 'Nengajo New Year Greeting Cards (with a personal message)',
      price_range: '$5–$20',
      why_its_good: 'Nengajo are the quintessential New Year greeting in Japan. Sending a carefully written card (ideally with a personal note) is a meaningful gesture; you can p
air it with a small gift card or token if you like.'
    }
  ]
}
 */

//for web search n system prompts go to 10