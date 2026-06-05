import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import openai from "openai";
import { getMyLocation, getWeather } from "./tool.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
const openAI = new openai({
    apiKey:process.env.AI_KEY,
    baseURL:process.env.AI_URL,
});
const Location = await getMyLocation();
const weatherResult = await getWeather();

if (!weatherResult.success) {
    console.error("Weather error:", weatherResult.message);
    process.exit(1);
}

const { city, temperature, weathercode, windspeed } = weatherResult.data;
const response = await openAI.chat.completions.create({
    model:process.env.AI_MODEL,
    messages:[
        {
            role:"user",
            content:`I am bored right now. So, I want to do some activities based on my location and wheather.My location is ${Location.city} 
                    Temperature: ${temperature}°C
                    Condition: ${windspeed}
                    Weather Code: ${weathercode}`
        }
    ]
})
console.log(response.choices[0].message.content);
