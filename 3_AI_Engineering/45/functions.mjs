import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({path:path.resolve(__dirname,"../.env")});
export async function getMyLocation(){
    try{
        const response = await axios.get("https://ipapi.co/json/");
        return response.data;
    }catch(error){
        return error;
    }
}
/*export async function getWeather() {
    try {
        const location = await getMyLocation();
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${location.city}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}
//API Key access invalid error
*/
export async function getWeather() {
    try {
        const location = await getMyLocation(); // plain object, not wrapped
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
