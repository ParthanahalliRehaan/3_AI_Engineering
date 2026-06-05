import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import openai from "openai";
import { getMyLocation, getWeather } from "./functions.mjs";
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
/*
Why __?
In a Node.js file:

You cannot just write filename and expect it to magically give you the current file’s path. 
That would just be a normal variable name, and unless you define it yourself, it won’t exist.

You can use __filename because Node.js reserves that variable name and automatically injects it into your module’s scope.

So yes, __filename and __dirname are reserved, special variables provided by Node. 
They’re not keywords in JavaScript itself, but Node makes them available to you. 
The double underscores are simply part of the naming convention to mark them as special system variables and avoid clashing with your own code.
*/
