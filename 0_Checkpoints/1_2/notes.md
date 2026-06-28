# AI Categories Hierarchy and Differentiation

  AI(Machine Whose intelligence is that of Human's brain less/more)
  ├── Machine Learning (ML)
  │   ├── Definition: Algorithms that learn patterns from data.
  │   ├── Examples: Decision trees, SVMs.
  │   └── Scope: Predictive/classification tasks, not necessarily generative.
  │
  ├── Deep Learning (DL)
  │   ├── Definition: Subset of ML using neural networks.
  │   ├── Examples: CNNs, RNNs, Transformers.
  │   └── Scope: Powers vision, speech, and generative models.
  │
  ├── Reinforcement Learning (RL)
  │   ├── Definition: AI that learns by trial and error with rewards.
  │   ├── Examples: AlphaGo, robotics agents.
  │   └── Scope: Optimizes actions, not content creation.
  |
  ├── Generative AI (GenAI)
  │   ├── Definition: AI systems that generate new content (text, images, audio, video, code).
  │   ├── Examples:
  │   │   ├── Text: GPT-4, Claude
  │   │   ├── Images: DALL·E, Stable Diffusion, MidJourney
  │   │   ├── Audio: ElevenLabs, Jukebox
  │   │   └── Video: Runway, Pika Labs
  │   └── Scope: Umbrella term for all generative systems.
  │
  │   └── Large Language Models (LLMs)
  │       ├── Definition: GenAI specialized in text.
  │       ├── Examples: GPT-4, Claude, LLaMA, Gemini.
  │       └── Scope: Text-based reasoning, summarization, translation, coding.
  |   
  |   └── Multimodal Models
  |       ├── Definition: AI that handles multiple input/output types.
  |       ├── Examples: GPT-4 with vision, Gemini.
  |       └── Scope: Combines text + images + audio for richer interaction.
  │
  └── Agentic AI (Multiple tasks)
          ├── Definition: AI that acts autonomously, sets goals, plans, and executes tasks.
          ├── Characteristics:
          │   ├── Goal-driven behavior and adaptability.
          │   ├── Connects with tools, APIs, and databases.
          │   └── Can orchestrate multiple agents for workflows.
          ├── Examples: Autonomous travel planner, workflow automation agents.
          └── Scope: Builds on GenAI/LLMs but emphasizes autonomy and purposeful action.
            
  ## Generative AI Model Naming by Modality

            - LLM (Large Language Model):
                - Text-focused generative AI.
                - Examples: GPT-4, Claude, LLaMA.

            - VLM (Vision-Language Model):
                - Handles both images and text (multimodal).
                - Examples: GPT-4 with vision, Gemini, CLIP.

            - Diffusion Models / Image Generators:
                - Specialized in generating images.
                - Examples: Stable Diffusion, DALL·E, MidJourney.
                - Sometimes referred to as "Generative Image Models."

            - Audio Models:
                - Generate or transform speech, music, sound.
                - Examples: ElevenLabs (speech), Jukebox (music).
                - Often called "Generative Audio Models" or "Speech Synthesis Models."

            - Video Models:
                - Generate or edit video content.
                - Examples: Runway, Pika Labs, Sora.
                - Sometimes referred to as "Generative Video Models."

            - Multimodal Models:
                - Work across multiple input/output types (text + image + audio + video).
                - Examples: Gemini, GPT-4 multimodal.
                - Commonly called "Multimodal Generative Models."

            # Key Point
                - "LLM" is the standardized name for text models.
                - Other modalities don’t have one universal acronym like LLM, but terms such as:
                - VLM (Vision-Language Model)
                - Diffusion Models (images)
                - Generative Audio Models
                - Generative Video Models
                are widely used in research and industry.           

            # Key Differentiation
            - LLM = A type of GenAI specialized in text.
            - GenAI = Umbrella term for all generative systems (text, image, audio, video).
            - Agentic AI = Builds on GenAI/LLMs, adds autonomy, tool usage, and goal-oriented workflows.
            - Other AI = Broader ML/DL techniques that may classify, predict, or optimize rather than generate.

            👉 All LLMs are GenAI, but not all GenAI are LLMs.  
            👉 Agentic AI is GenAI taken further — autonomous, tool-using, and goal-driven.

  ## Difference between GenAI & Agentic AI

            When GenAI (like an LLM or multimodal model) is simply generating text, images, or audio, it’s still just generative.
            When that same model is connected to tools, APIs, or external systems and can autonomously decide when and how to use them to achieve goals, that’s what’s called Agentic AI.

            Breakdown:
            - GenAI (Generative AI):
                - Produces new content (text, images, audio, video).
                - Needs human prompts to guide it.
                - Example: Asking GPT-4 to write a poem or Stable Diffusion to generate an image.

            - Agentic AI:
                - Goes beyond generation — it can act.
                - Has autonomy: sets sub-goals, plans steps, calls tools, and executes workflows.
                - Example: An AI travel agent that, when asked “Book me a trip to Tokyo,” will:
                        - Search flights via APIs.
                        - Compare hotels.
                        - Reserve tickets.
                        - Send confirmations — all without step-by-step human prompting.



# Agentic AI Deep Understanding
   ## ML vs DL vs ONNX vs Tensorflow
   ### Load model(of any framework eg, .h5 or similar)
  - “If I have a `.onnx` model file locally, can I just point ONNX Runtime in JavaScript to it, give input like text, and then access the model’s input and output for inference?”

- **Best answer**  
  - Yes — you can load a local `.onnx` file in JavaScript using **ONNX Runtime Web** (`onnxruntime-web`). However, ONNX models don’t take raw text or JSON directly — they expect **tensors** (numerical arrays).  
  - The workflow is:  
    1. **Load the model** with `InferenceSession.create('./model.onnx')`.  
    2. **Inspect inputs/outputs** using `session.inputNames` and `session.outputNames`.  
    3. **Preprocess your input** (e.g., tokenize text into IDs, convert images into pixel arrays).  
    4. **Wrap input in `ort.Tensor`** with the correct type and shape.  
    5. **Run inference** with `session.run(feeds)`.  
    6. **Postprocess the output tensor** back into human-readable results.  

  - Example code (Node.js):

    ```javascript
    import * as ort from 'onnxruntime-web';

    async function runModel(text) {
      // Step 1: Load model
      const session = await ort.InferenceSession.create('./model.onnx');

      // Step 2: Inspect inputs/outputs
      console.log('Inputs:', session.inputNames);
      console.log('Outputs:', session.outputNames);

      // Step 3: Preprocess text (toy example: char codes)
      const inputIds = new TextEncoder().encode(text);
      const inputTensor = new ort.Tensor('float32', new Float32Array(inputIds), [1, inputIds.length]);

      // Step 4: Run inference
      const feeds = { [session.inputNames[0]]: inputTensor };
      const results = await session.run(feeds);

      // Step 5: Postprocess output
      console.log('Output:', results[session.outputNames[0]].data);
    }

    runModel("hello world");
    ```

   ### Difference Between ML, DL, Keras/TensorFlow, and ONNX
- **Question you were exploring**  
  - “What’s the difference between ML and DL, and how do frameworks like Keras/TensorFlow compare to ONNX?”

- **Best answer**  
  - **ML (Machine Learning)**: Umbrella field of algorithms (regression, decision trees, SVMs).  
  - **DL (Deep Learning)**: Subset of ML using deep neural networks. Excels at unstructured data.  
  - **Keras/TensorFlow**: Training frameworks — you build and train models here.  
  - **ONNX**: Not a training framework. It’s a **portable model format** for deployment. You export trained models into ONNX and run them anywhere with ONNX Runtime.

---

   ### What is Transformer.js?
- **Question you were exploring**  
  - “What is transformer.js?”

- **Best answer**  
  - **transformers.js** is a JavaScript library (from Hugging Face) that lets you run **Transformer-based models** (like BERT, GPT, DistilBERT) directly in the browser or Node.js.  
  - It uses **ONNX Runtime Web** or **WebAssembly/WebGPU** under the hood for fast inference.  
  - Purpose: make it easy to do NLP tasks (text classification, summarization, translation, question answering) in JS without needing Python.  
  - Example:  
    ```javascript
    import { pipeline } from '@xenova/transformers';

    const classifier = await pipeline('sentiment-analysis');
    const result = await classifier('I love learning ONNX!');
    console.log(result);
    ```
  - Here, you just give text, and the library handles preprocessing → tensor conversion → inference → postprocessing for you.

---

   ### Different Model extensions(.h5 or ONNX or similar)

- **Question you were exploring**  
  - “What are the different model extensions?”

- **Best answer**  
  - Common model file formats/extensions:  

    | Extension      | Framework / Usage             | Notes                                            |
    |----------------|-------------------------------|--------------------------------------------------|
    | `.onnx`        | ONNX (portable format)        | Universal, used for deployment across platforms. |
    | `.h5`          | Keras (HDF5 format)           | Stores model architecture + weights.             |
    | `.pb`          | TensorFlow (Protocol Buffers) | TensorFlow frozen graph format.                  |
    | `.tflite`      | TensorFlow Lite               | Optimized for mobile/edge devices.               |
    | `.pt` / `.pth` | PyTorch                       | Native PyTorch model checkpoint.                 |
    | `.ckpt`        | TensorFlow/PyTorch            | Checkpoint files during training.                |
    | `.json`        | TensorFlow.js                 | Model architecture + weights for browser.        |

  - **Key idea**:  
    - Training frameworks save models in their own formats (`.h5`, `.pt`, `.pb`).  
    - For deployment/interoperability, you often **convert** them into `.onnx`.  
    - For mobile/web, you might use `.tflite` or `.json`.  

   ## 1. Agentic AI vs training models

- Question you were exploring  
  - “Agentic AI is more about orchestrating pre‑existing models than training them from scratch, right? So I can just grab libraries/APIs and let the agent coordinate everything?”

- Best answer  
  - Yes. In most real systems, “agentic AI” = orchestration: an agent routes tasks between existing LLMs, tools, APIs, vector DBs, etc., instead of you training new models from raw data.
  - Your job is mainly to design: model selection (API or local), tool interfaces, memory/RAG, evaluation, and workflows; heavy model training is usually optional and comes later if you need specialization.

   ## 2. Loading a local trained model in JavaScript

- **Question you were exploring**  
  - “If I have a `.onnx` model locally, can I just give it text or structured input directly like an API call, instead of manually creating tensors?”

- **Best answer**  
  - ONNX models don’t inherently understand raw text or JSON — they operate on **numerical tensors**. That’s why you need to wrap your input in `ort.Tensor`.  
  - If your model is a text model (e.g., sentiment analysis, NLP), the preprocessing step converts text into numbers (like token IDs or embeddings). ONNX Runtime then consumes those numbers as tensors.  
  - So the flow is:  
    1. **Preprocess text → numerical array** (e.g., tokenize words into IDs).  
    2. **Wrap array in `ort.Tensor`** with the correct shape and type.  
    3. **Feed tensor into the ONNX model**.  
    4. **Postprocess output tensor → human-readable result** (e.g., convert IDs back to text, or interpret logits as probabilities).  

    Example (sentiment analysis style):

    ```javascript
    import * as ort from 'onnxruntime-web';

    async function runTextModel(text) {
      // Step 1: Preprocess text (toy example: convert chars to char codes)
      const inputIds = new TextEncoder().encode(text); 
      const floatArray = new Float32Array(inputIds);

      // Step 2: Wrap in tensor
      const inputTensor = new ort.Tensor('float32', floatArray, [1, inputIds.length]);

      // Step 3: Load model
      const session = await ort.InferenceSession.create('./text_model.onnx');

      // Step 4: Run inference
      const feeds = { [session.inputNames[0]]: inputTensor };
      const results = await session.run(feeds);

      // Step 5: Postprocess output
      console.log('Raw output:', results[session.outputNames[0]].data);
    }

    runTextModel("hello world");
    ```

   ## 3. Simple packaging: “zip it so others can run”

- Question you were exploring  
  - “If I want someone to easily use my setup locally, can I just zip everything (JS, config, model, README) so they unzip and run it?”

- Best answer  
  - Yes. For a minimal developer‑friendly package, include:  
    - Source (JS/TS), a clear `README`, `package.json`, example config, and scripts (`npm run start`, etc.).  
  - A zip is fine, but a public GitHub repo plus `npm` (or a release zip) is much nicer for others: they can clone or `npm install` directly and follow the documented steps. 


   ## 4. Standardized model/context packaging (MCP, model cards, manifests)

- Question you were exploring  
  - “MCP or ‘Model‑Card Packaging’ – is that required, or just a nice way to bundle models so users can load them in a standard way?”

- Best answer  
  - You don’t *need* MCP or a formal model‑card bundle to ship a working package, but standardized packaging helps when you have many tools/models and want interoperability.  
  - The real MCP in the ecosystem today is the Model Context Protocol: an open standard for connecting LLM/agent hosts to external tools and data in a uniform way, similar to how Language Server Protocol standardized IDE integrations. 
### MCP

MCP (Model Context Protocol) is an **open standard** that allows AI applications 
to connect seamlessly with external systems like databases, APIs, and tools.

#### Key Points
- **Purpose**: Standardized way to integrate AI agents with external data & workflows.
- **Analogy**: Think of MCP as a "USB-C port" for AI — one protocol unlocks many integrations.
- **Capabilities**:
  - Connect AI models to tools (e.g., search engines, calculators).
  - Access data sources (e.g., local files, cloud databases).
  - Enable workflows (e.g., calendars, project management apps).
- **Benefits**:
  - Reduces fragmented custom integrations.
  - Scales AI systems with reusable, secure connections.
  - Supports ecosystem growth with MCP servers & SDKs.

#### Example Use Cases
- AI assistant accessing Google Calendar & Notion.
- Enterprise chatbot querying multiple databases.
- AI code generator building apps directly from design files.

> MCP = A universal protocol that makes AI agents context‑aware, connected, and scalable.

   ## 5. Turning your code into a reusable “model module”

- Question you were exploring  
  - “I want to create a model package someone can download and plug into their JS environment, maybe via Transformers.js or something similar. That’s basically a distributable module, right?”

- Best answer  
  - Correct. You’re essentially building a small inference SDK:  
    - Internally: your model files (ONNX/TF.js/gguf/etc.) plus loader code.  
    - Externally: a clean JS API like `const client = createMyModelClient(opts); const out = await client.generate(input);`.  
  - Libraries such as Transformers.js or ONNX Runtime Web follow this pattern: standardized model formats + a thin JavaScript wrapper so others don’t care about low‑level tensor plumbing.

   ## 6. Local models vs API models (same “client” pattern)

- Question you were exploring  
  - “Whether it’s a local model or OpenAI’s API, I just set up a client and make requests, right?”

- Best answer  
  - Yes. For the agent, both look similar:  
    - API models → HTTP client (OpenAI, Anthropic, etc.).  
    - Local models → a local server or in‑process inference library with a function like `generate()` or `chat()`.  
  - If you abstract behind an internal interface (e.g., `llm.generate(prompt, options)`), you can swap providers (API vs local) without changing the rest of the agent logic.

   ## 7. Email in → model → email out: wiring the pipeline(ReAct but Manually not through System prompt)

- Question you were exploring  
  - “Can I have a JS script read my inbox, feed emails into the model for processing, then send a response email automatically?”

- Best answer  
  - Yes. A minimal loop is:  
    - Input connector: IMAP/Gmail API/Graph API fetches new emails, normalizes them to a text + metadata structure.  
    - Processing: your agent/LLM pipeline handles classification, reply drafting, routing, etc.  
    - Output connector: SMTP/Gmail/Graph sends the generated reply back, possibly with human‑in‑the‑loop approval for safety.  

   ## 8. What you already listed for a serious agent pipeline

- Question you were exploring  
  - “For a proper pipeline I’ll need: text‑generating model, embeddings, vector‑embedded data, RAG, multi‑step pipeline with a second model to rectify outputs, then final email. What else is missing?”

- Best answer (core building blocks, in a good reading/implementation order)  
  1. **Core LLM / text model**  
     - Your main generator for understanding emails, planning actions, and drafting replies.  
  2. **Embeddings + vector store (RAG)**  
     - An embedding model to convert docs/emails/FAQ into vectors and a vector DB or index (FAISS, Qdrant, etc.).  
     - Used to ground responses with real data and reduce hallucinations; RAG pipelines have been shown to significantly lower hallucination rates in real deployments.
  3. **Retrieval + ranking layer**  
     - Logic to: take the incoming email, build a query, retrieve top‑k docs, optionally re‑rank/hybrid‑retrieve for better context before sending to the LLM.
  4. **Agent / orchestrator**  
     - The “brain” that:  
       - Chooses which tools to call (RAG, external APIs, specialized sub‑agents).  
       - Maintains short‑term state, performs planning and reflection, and stitches everything together into one coherent flow.
  5. **Secondary model / validator (optional but powerful)**  
     - A “checker” LLM that verifies the primary model’s answers against retrieved evidence, flags hallucinations, or rewrites for tone, policy, and safety.
  6. **Connectors and IO**  
     - Email in/out, plus any other channels (Slack, CRM, ticketing), configured as tools the agent can call.  
  7. **Packaging and interoperability layer (optional but nice)**  
     - Model cards/metadata, MCP‑style connectors, or a small internal protocol so any agent host can discover: what tools exist, how to call them, and what models/configs they use.

# What is a model provider?
 A organization that runs Models on server and provides access through API(SDK).

    3 Important Questions before Project:
        - Model Provider?
        - Model?
        - Cost?

    Later, make a bucket & through tradeoffs select one.
    
    example, openai, @google/genai or @anthropic-ai/sdk
## Hardcoded Vs Softcoded
 Hardcoded means written directly into the code instead of .env file.
 Not good as, If a single config changes then thousands of changes must made manually,
 But when .env used instead of thousands we change once.
## DA API - organization requirements
 Destination(URL)
 AI Model
 API Key(Identity & Permission)
 ### AI URL(Destination)
    
    OpenAI API URL
    https://api.openai.com/v1

    GROQ API URL
    https://api.groq.com/openai/v1

    OpenRouter API URL
    https://openrouter.ai/api/v1
## @
 It syntax is @organization/inference
## Inference Vs Training
 A stage in training the model, where the model is ready to give outputs
## SDK
    An SDK (Software Development Kit) is a toolbox provided by a company or platform to help developers build applications more easily.

    Key Points:
    - Contents: Libraries, APIs, documentation, sample code, debuggers, sometimes compilers.
    - Purpose: Speeds up development with pre-built components and guidelines.
    - Platform-Specific: Designed for a particular OS, hardware, or service.
    Examples:
        • Android SDK → build Android apps
        • iOS SDK → build iPhone/iPad apps
        • Java Development Kit (JDK) → build Java applications
    - Extra Features: Some SDKs add analytics, ads, or push notifications.

    SDK vs API:
    | Aspect      | SDK                                      | API                                            |
    |-------------|------------------------------------------|------------------------------------------------|
    | Definition  | Full toolkit with libraries, docs, tools | Rules/interfaces to interact with software     |
    | Scope       | Broad – helps build apps from scratch    | Narrow – enables communication between systems |
    | Example     | Android SDK (emulator, debugger, libs)   | Google Maps API (embed maps in apps)           |

    In short: An SDK helps you *build* software, while an API helps your software *talk* to other software.
## How to access these model providers through code?
 In JS, we have libraries that are used to reduce redundancy(re-usable code) maintained by organization or opensource community.
 
 We can access these libraries through remote(CDN/URL) or installing through npm stored in node_modules.
## Recommended Models
 openai - gpt-5-nano
 Groq - qwen3-32b

# .env & dotenv
## 1️⃣ What is a `.env` file?
- A plain text file that stores **environment variables** in `KEY=VALUE` format.  
- Example `.env` file:
  ```
  PORT=3000
  DB_URL=mongodb://localhost:27017/mydb
  API_KEY=abc123xyz
  ```
- Purpose: Keeps secrets and configs **outside your code** so you don’t hard‑code them.

## 2️⃣ What is `dotenv`?
- A Node.js package that **loads variables from `.env` into `process.env`**.  
- Without it, Node won’t automatically read `.env` files.  
- Install it:
  ```bash
  npm install dotenv
  ```

## 3️⃣ Using `.env` with `dotenv` in JavaScript
Here’s a simple Node.js example:

**Step 1: Create `.env` file**
```
PORT=4000
DB_USER=myuser
DB_PASS=secret123
```

**Step 2: Load dotenv in your app**
```javascript
// index.js
import dotenv from "dotenv";

// Load .env file into process.env
dotenv.config();

// Access variables
const port = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

console.log(`Server running on port ${port}`);
console.log(`Connecting with user: ${dbUser}`);
```

---

## 4️⃣ Best Practices
- Add `.env` to **`.gitignore`** so secrets don’t leak to GitHub.  
- Use `.env.example` with placeholder values for teammates.  
- For production, prefer **secret managers** (Azure Key Vault, AWS Secrets Manager, etc.).


