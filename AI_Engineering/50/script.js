import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Groq from "groq-sdk";
import { getLocation, getCurrentWeather, systemPrompt } from "./tools.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const groq = new Groq({
    apiKey: process.env.AI_KEY,
});

const messages = [
    {
        role: "system",
        content: systemPrompt
    },
];

const actionRegex = /^Action:\s*(\w+):\s*(.*)$/;
const availableFunctions = { getCurrentWeather, getLocation };

async function agent(q) {
    for (let i = 0; i < 5; i++) {
        console.log(`Iteration #${i + 1}`);

        const response = await groq.chat.completions.create({
            model: process.env.AI_MODEL,
            messages
        });

        const responseText = response.choices[0].message.content;
        messages.push({ role: "assistant", content: responseText });

        const foundActionStr = responseText.split("\n").find(line => actionRegex.test(line));

        if (foundActionStr) {
            const [_, action, actionArg] = actionRegex.exec(foundActionStr);

            if (!availableFunctions.hasOwnProperty(action)) {
                throw new Error(`Unknown action: ${action}`);
            }

            console.log(`Calling function ${action}`);
            const observation = await availableFunctions[action](actionArg);
            console.log("Observation:", JSON.stringify(observation));

            messages.push({
                role: "assistant",                                          
                content: `Observation: ${JSON.stringify(observation)}` 
            });
        } else {
            console.log("Agent finished\n");
            return responseText;
        }
    }

    return "Max iterations reached.";
}

console.log(await agent("What are some activity ideas that I can do this afternoon based on my location and weather?."));