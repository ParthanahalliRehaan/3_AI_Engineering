import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
export async function getLocation(){
    try{
        const response = await axios.get("https://ipapi.co/json/");
        return response.data;
    }catch(error){
        return error;
    }
}
export async function getCurrentWeather() {
    try {
        const location = await getLocation(); // plain object, not wrapped
        const { latitude, longitude, city } = location;

        const response = await axios.get("https://api.open-meteo.com/v1/forecast", {
            params: {
                latitude,
                longitude,
                current_weather: true
            }
        });

        const weather = response.data.current_weather;

        return {
            success: true,
            data: {
                city,
                temperature: weather.temperature,
                windspeed: weather.windspeed,
                winddirection: weather.winddirection,
                weathercode: weather.weathercode,
                time: weather.time
            }
        };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
export const systemPrompt = `
You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer. Your final answer should be highly specific to the observations you have from running
the actions.
1. Thought: Describe your thoughts about the question you have been asked.
2. Action: run one of the actions available to you - then return PAUSE.
3. PAUSE
4. Observation: will be the result of running those actions.

Available actions:
- getCurrentWeather: 
    E.g. getCurrentWeather: Salt Lake City
    Returns the current weather of the location specified.
- getLocation:
    E.g. getLocation: null
    Returns user's location details. No arguments needed.

Example session:
Question: Please give me some ideas for activities to do this afternoon.
Thought: I should look up the user's location so I can give location-specific activity ideas.
Action: getLocation: null
PAUSE

You will be called again with something like this:
Observation: "New York City, NY"

Then you loop again:
Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
Action: getCurrentWeather: New York City
PAUSE

You'll then be called again with something like this:
Observation: { location: "New York City, NY", forecast: ["sunny"] }

You then output:
Answer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>
`