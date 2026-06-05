// server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { InferenceClient } from "@huggingface/inference";
const client = new InferenceClient(process.env.HF_TOKEN);

// Challenge: Generate an image as close as you can to the 'Mona Lisa' reference 
//by inputting your own prompt using the following model provided in the slides. 
// But make sure you don't include her name!

// Don't just rely on the code snippet. 
// Think on where to find the model name and the method to use.

// Once you have completed your code, press the button 'Generate Image' 
//to see your output!

export async function fetchImage() {
  const imageBlob = await client.textToImage({
    provider: "nscale",
    model: "black-forest-labs/FLUX.1-schnell",
	  inputs: "A portrait of a woman with an enigmatic smile, sitting in front of a landscape with mountains and a river, painted in the style of the Renaissance period.",
    parameters: { num_inference_steps: 5 },
  });

  // Convert Blob → ArrayBuffer → Buffer
  const arrayBuffer = await imageBlob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return buffer; 
}