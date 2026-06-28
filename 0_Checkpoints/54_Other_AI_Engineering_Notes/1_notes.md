# 📘 Study Guide: Open Source AI Models(HF models can be accessed through openai library)

---

## 1. Step-by-Step Breakdown
Let’s simplify the lecture into clear steps:

1. **Understand "Open Source" in AI**  
   - In software: usually means making code public (e.g., GitHub repo).  
   - In AI: three components can be open sourced:  
     1. **Dataset** (training data)  
     2. **Code** (neural network/algorithm)  
     3. **Model weights** (trained parameters that make predictions)

2. **Why Open Source Models Matter**  
   - You can deploy them in your own apps.  
   - No need to pay third parties.  
   - More control and flexibility.

3. **History of Open vs Closed Source in AI**  
   - 1950s: AI research was mostly open.  
   - 2017: Google’s *Attention is All You Need* paper introduced transformers (openly shared).  
   - OpenAI: GPT-1 & GPT-2 were open, but GPT-3 onward became closed.  
   - 2022: ChatGPT (closed source) exploded in popularity.  
   - Meta: Released LLaMA (open source), competing strongly.  
   - Image generation: Closed (DALL·E, MidJourney) vs Open (Stable Diffusion).

4. **Current Landscape**  
   - Closed source (e.g., GPT-4) still leads in performance.  
   - Open source models are catching up fast.  
   - Hugging Face is the main hub for open source AI models.

---

## 2. Visual Explanations
Here are diagrams you could sketch:

- **Flowchart: Open Source Components**
  ```
  Dataset → Code → Training → Model (weights & biases)
  ```

- **Battle Timeline**
  - 1950s → Open sharing  
  - 2017 → Transformer paper  
  - 2018–2019 → GPT-1 & GPT-2 (open)  
  - 2020 → GPT-3 (closed)  
  - 2022 → ChatGPT (closed, huge success)  
  - 2023 → LLaMA (open, strong competitor)

- **Mind Map: Open vs Closed Source**
  - Open Source: Free, flexible, community-driven  
  - Closed Source: High performance, proprietary, costly

---

## 3. Analogies & Metaphors
- **Open Source AI = Public Library**  
  Anyone can borrow books (models) and use them freely.  
- **Closed Source AI = Private Club**  
  You pay membership fees (subscriptions) to access exclusive resources.  
- **Dataset + Code + Weights = Recipe**  
  - Dataset = Ingredients  
  - Code = Cooking instructions  
  - Model weights = Finished dish

---

## 4. Active Recall Questions
- **MCQ:** Which of the following is *not* an open source component in AI?  
  A) Dataset  
  B) Code  
  C) Model weights  
  D) User interface  
  *(Answer: D)*

- **True/False:** GPT-2 was released as an open source model.  
  *(Answer: True)*

- **Short Answer:** What platform is often called “GitHub for AI”?  
  *(Answer: Hugging Face)*

---

## 5. Mnemonics & Memory Techniques
- **3 Components of Open Source AI → DCM**  
  - **D**ataset  
  - **C**ode  
  - **M**odel weights  

- **Timeline Mnemonic → “Old Transformers Generate Cool LLaMAs”**  
  - Old (1950s open sharing)  
  - Transformers (2017 paper)  
  - Generate (GPT-1 & GPT-2 open)  
  - Cool (ChatGPT closed)  
  - LLaMAs (Meta’s open source model)

---

## 6. Summary & Key Takeaways
- Open source in AI includes datasets, code, and model weights.  
- Models are the most relevant for engineers since they can be deployed directly.  
- AI history shows a tug-of-war between open and closed approaches.  
- Closed source currently leads in performance (e.g., GPT-4).  
- Open source models (like LLaMA, Stable Diffusion) are rapidly innovating.  
- Hugging Face is the go-to platform for open source AI.

---

## 7. Application Examples
- **App Development:** Use open source models from Hugging Face to build chatbots, image generators, or translation tools without subscription costs.  
- **Customization:** Fine-tune open source models on your own dataset for domain-specific tasks (e.g., medical chatbots).  
- **Cost Savings:** Deploy open source models locally to avoid API fees from closed providers.  
- **Experimentation:** Mix open and closed source models depending on project needs (e.g., GPT-4 for premium features, open source for scalable backend).

# ISP Issue
## 📖 Internet as a Phonebook Analogy

- **Domain name** → A person’s name in your contacts.  
  Example: `huggingface.co` is like “Hugging Face” in your phone.

- **IP address** → The actual phone number.  
  Example: `34.120.xxx.xxx` is the number you dial to reach Hugging Face’s servers.

- **DNS (Domain Name System)** → The phonebook that maps names to numbers.  
  Your ISP gave you a phonebook, but it didn’t have Hugging Face listed.  
  Google DNS (`8.8.8.8`) or Cloudflare (`1.1.1.1`) are bigger, more reliable phonebooks that *do* have Hugging Face.

- **URL (Uniform Resource Locator)** → The full contact details.  
  Like name + number + extension. Example:  
  `https://api-inference.huggingface.co/models/facebook/bart-large-cnn`  
  → Protocol (how to call), Domain (who to call), Path (which department).

- **ISP (Internet Service Provider)** → The phone company that gives you the line.  
  They provide internet access and usually their own DNS, but sometimes their phonebook is incomplete.

- **Port** → The extension number at the office.  
  HTTPS uses port `443` — it’s like saying “connect me to the secure line.”

- **Protocol (HTTP/HTTPS)** → The language of the conversation.  
  HTTPS is like speaking securely so nobody can eavesdrop.

- **TLS/SSL** → The lock on the line.  
  Ensures your conversation with Hugging Face is private and encrypted.

---

## 🧩 Putting it together
When your Node script runs:
1. You dial the **URL** (like calling Hugging Face’s office).  
2. Your computer asks **DNS** to look up the number for that name.  
3. Your ISP’s DNS says: “Sorry, I don’t have Hugging Face in my book.” → ❌  
4. You switch to Google’s DNS. Google says: “Here’s the number: 34.120.xxx.xxx.” → ✅  
5. Your computer dials that number on **port 443**, using **HTTPS** with **TLS**.  
6. Hugging Face answers the call and processes your request.

---

👉 So yes: your ISP’s DNS couldn’t resolve Hugging Face’s domain, so you gave the job to Google’s DNS — and now the call goes through.  

# HF Code example
```js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { InferenceClient } from "@huggingface/inference";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });


const client = new InferenceClient(process.env.HF_TOKEN);

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
    //Error so moved to raw http request.

    try {
        // Still error, ISP Provider blocking.
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
    
export async function chatCompletion() {
  const response = await client.chatCompletion({
  messages: [
        {
          role: "system",
          content: "Respond like you are William Shakespeare",
        },
        {
          role: "user",
          content: "Tell me a fun fact about the internet",
        },
    ],
    model: "katanemo/Arch-Router-1.5B:hf-inference",
  });

  const finalText = response.choices[0].message.content;
  return finalText;
  
}
```

# HF MultiModal Models Code Example
```js
// server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { InferenceClient } from "@huggingface/inference";
const client = new InferenceClient(process.env.HF_TOKEN);

// Generate an image as close as you can to the 'Mona Lisa' reference 
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
```

# How to use Ollama Models(Express App)
## 🖥️ What Ollama Is
- **Ollama** is a desktop app that lets you run large language models (LLMs) locally on your computer.  
- Instead of connecting to a cloud server, the model runs entirely on your machine.  
- Benefits:  
  - **Free tokens** (no per‑use cost, only hardware + electricity).  
  - **Privacy** (your data never leaves your device).  
  - **Flexibility** (you can use it in your own projects).

---

## 📥 Installing Ollama
1. Go to the **Ollama website**.  
2. Search for models (e.g., **Mistral**).  
   - Example: Mistral is ~4.1 GB in size.  
   - You can read performance comparisons with other open‑source models.  
3. Head back to the homepage → click **Download** → choose your platform (Windows, macOS, Linux).  
4. Install Ollama on your computer.

---

## ⚡ Running a Model
1. Open your **terminal**.  
2. Type:  
   ```bash
   ollama run mistral
   ```  
   - This downloads and sets up the Mistral model.  
   - First run takes time because it downloads the full model.  
3. Once ready, you’ll see a **chat‑like UI** in the terminal.  
   - Example: type *“Feeling a bit demotivated today, can you help me get started with my day?”*  
   - The model replies with motivational tips — all running locally.

---

## 🌐 Using Ollama in a Project
1. Download the provided **scrim project** as a ZIP.  
2. Unzip → rename the folder (e.g., `ollama-hello-world`) → move it to your dev projects directory.  
3. In terminal:  
   ```bash
   npm install
   npm start
   ```  
   - This starts a local server on **http://localhost:3000**.  

---

## 🛠️ How the Project Works
- It’s a small **Express.js app**.  
- The app checks if the URL has a `question` parameter.  
  - If **no question** → shows a default string.  
  - If **question exists** → sends it to Ollama via the SDK.  
- Example code pattern:  
   ```js
   ollama.chat({
     model: "mistral",
     messages: [
       { role: "user", content: question }
     ]
   })
   ```  
- Browser example:  
  - Visit: `http://localhost:3000/?question=why+do+stars+shine`  
  - Output: *“Stars shine due to nuclear fusion…”*  

---

## 🌟 Key Takeaways
- **Ollama lets you run LLMs locally** → free, private, flexible.  
- You can **integrate models into Node.js projects** using the Ollama SDK.  
- The workflow is:  
  1. Install Ollama.  
  2. Run a model in terminal.  
  3. Connect it to your own project (Express app).  
  4. Pass user questions → get AI responses.  

---

👉 For revision: think of it as **three layers** —  
1. **App installation** (Ollama).  
2. **Model execution** (Mistral).  
3. **Integration into code** (Express + SDK).  

## Coding eg,
```js
import ollama from "ollama";
import express from "express";

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const question = req.query.question;
    if (!question) {
        res.status(200).send("Ask something via the `?question=` parameter");  
    } else {
        const response = await ollama.chat({
            model: 'mistral',
            messages: [{ role: 'user', content: question }],
        });
        res.status(200).send(response.message.content);
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

# Object detection eg code,
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="style.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Object Detection demo</title>
</head>

<body>
    <main class="container">
        <p id="status"></p> 
        <button id="detect-objects" disabled>Click to Detect Objects</button> 
        <div id="image-container">
            <img id="image" src="road.jpeg"/>
        </div>
    </main>
    <script src="./index.js" type="module"></script>
</body>

</html>
```
```js
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.8.0'

// Reference the HTML elements that we will need
const status = document.getElementById('status')
const image = document.getElementById('image')
const detectObjectsButton = document.getElementById('detect-objects')
const imageContainer = document.getElementById('image-container')

// Create a new object detection pipeline
status.textContent = 'Loading model...'
const detector = await pipeline('object-detection', 'Xenova/yolos-tiny')

// Enable Object Detection
detectObjectsButton.addEventListener('click', detectAndDrawObjects)
detectObjectsButton.disabled = false
status.textContent = 'Ready'

/* ⛳️ CHALLENGE 

Complete this function with the following requirements:

1. The AI Model must be 95% sure of the detected object
2. The box coordinates must be compatible with the drawObjectBox helper function
*/
async function detectAndDrawObjects() {
    // Detect Objects
    status.textContent = 'Detecting...'
    const detectedObjects = await detector(image.src, {
        threshold: 0.95,
        percentage: true
    });
    
    // Draw Detected Objects
    status.textContent = 'Drawing...'
    detectedObjects.forEach(obj => {
        drawObjectBox(obj)
    })
    
    status.textContent = 'Done!'
}

// Helper function that draws boxes for every detected object in the image
// ⚠️ ️This function requires box coordinates to be in percentages  ️
function drawObjectBox(detectedObject) {
    const { label, score, box } = detectedObject
    const { xmax, xmin, ymax, ymin } = box

    // Generate a random color for the box
    const color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, 0)
    
    // Draw the box
    const boxElement = document.createElement('div')
    boxElement.className = 'bounding-box'
    Object.assign(boxElement.style, {
        borderColor: color,
        left: 100 * xmin + '%',
        top: 100 * ymin + '%',
        width: 100 * (xmax - xmin) + '%',
        height: 100 * (ymax - ymin) + '%',
    })

    // Draw label
    const labelElement = document.createElement('span')
    labelElement.textContent = `${label}: ${Math.floor(score * 100)}%`
    labelElement.className = 'bounding-box-label'
    labelElement.style.backgroundColor = color

    boxElement.appendChild(labelElement)
    imageContainer.appendChild(boxElement)
}
```
