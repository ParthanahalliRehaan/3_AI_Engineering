import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { InferenceClient } from "@huggingface/inference";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const client = new InferenceClient(process.env.HF_TOKEN);

// Challenge
// Check your token is correctly stored in your env vars by logging it to the runner.

// It should have the following format : {accessToken: "hf_...", defaultOptions: {}}

export async function huggingFaceFunction() {
    console.log("Your Hugging Face token:", client);
};
const inputText = "A cherry blossom is the flower from a Prunus tree, of which there are many different kinds. Species cherry blossoms are found throughout the world being especially common in regions in the Northern Hemisphere with temperate climates, including Japan, China, and Korea, as well as Nepal, India, Pakistan, Iran, and Afghanistan, and several areas across northern Europe.Japan is particularly famous for its cherry blossom due its large number of varieties and the nationwide celebrations during the blooming season. As the buds burst open in parks and streets across the country, people throw picnic and hanami (flower viewing) parties to appreciate the transient beauty of the flowers and welcome in the warmer weather. Cherry blossoms in Japanese are known as sakura and it would not be an exaggeration to say they are a national obsession.";
const HF_TOKEN = process.env.HF_TOKEN;
export async function textSummarization() {
    /*const response = await client.summarization({
        model: "facebook/bart-large-cnn",
        inputs: inputText,
        provider: "hf-inference",
    });
    return response;*/
    //Gave error so shifted to raw http request

    try {
        const response = await fetch(
        "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
        {
            method: "POST",
            headers: {
            "Authorization": `Bearer ${HF_TOKEN}`,
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            inputs: inputText,
            }),
        }
        );

        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Summary:", data);
    } catch (err) {
        console.error("Request failed:", err.message);
    }

}
    