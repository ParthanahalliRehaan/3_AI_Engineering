import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import openai from "openai";
import { getLocation, getCurrentWeather, systemPrompt } from "./tools.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
const openAI = new openai({
    apiKey:process.env.AI_KEY,
    baseURL:process.env.AI_URL,
});
const messages = [
            {
                role:"system",
                content:systemPrompt
            },
            {
                role:"user",
                content:`I am bored right now. So, I want to do some activities based on my location and wheather.`
            }
        ]
async function agent(q){
    const response = await openAI.chat.completions.create({
        model:process.env.AI_MODEL,
        messages
    })
    const responseText = response.choices[0].message.content
    messages.push({
        role:"assistant",
        content:responseText
    })
    const responseLines = responseText.split("\n")
    
    const actionRegex = /^Action: (\w+): (.*)$/
    const foundActionStr = responseLines.find(str => actionRegex.test(str))
    const actions = actionRegex.exec(foundActionStr)
    return actions;
}
const obsv = await agent(`I am bored right now. So, I want to do some activities based on my location and wheather.`);
if(obsv[1]=="getLocation"){
    const location = await getLocation();
    messages.push({
        role:"assistant",
        content:`Observation: ${location.city}`
    })
}
console.log(messages)