# Vercel AI SDK(Intro)
🎓 **Welcome to the course on building a customer support AI agent with Vercel AI SDK and OpenAI.**

Over the past couple of years, AI has transformed how we work. One of the most exciting developments is the rise of **AI agents**. Unlike static chatbots, these agents can trigger actions, call APIs, interact with databases, and make autonomous decisions. That means they don’t just *answer* — they *do*. And that’s where productivity skyrockets.

---

💡 **Why customer support?**

Customer support is the heartbeat of every company. It’s where complaints, bugs, and issues surface. Solving them well keeps customers loyal and happy. AI agents can:

- Escalate and resolve issues quickly.  
- Automate responses to basic queries, freeing humans for complex cases.  
- Personalize support by retrieving past conversations or user profiles.  
- Analyze interactions to uncover trends, problems, and even new product ideas.  

This is why customer support is one of the most powerful real-world use cases for AI agents.

---

🛠️ **What you’ll learn in this course:**

1. **Query classification & routing** — teaching the LLM to understand intent and route queries intelligently.  
2. **Real-time retrieval** — not just *when* to fetch info, but *how*.  
3. **Vercel AI SDK basics** — simplifying workflows and speeding up development.  
4. **Retrieval Augmented Generation (RAG)** — grounding answers in real data to reduce hallucinations.  
5. **Function calling & API integration** — enabling the agent to take meaningful actions.  
6. **Express services** — building API routes to support your agent.  

By the end, you’ll have a **production-ready customer support AI agent** that can handle real-world tasks, not just toy examples.

---

📖 **Example in action:**

- User asks: *“How do I join the Scrimba Discord?”*  
- The agent checks Scrimba’s help docs. If the answer is there, it shows the sources.  
- If not, the agent autonomously decides to perform a **web search** and retrieves the info.  

That’s the leap from chatbot → agent.

---

⚠️ **Prerequisites you should already know:**

- How to use the OpenAI API (create account, retrieve API key, make calls).  
- Basic prompt crafting (even just ChatGPT experience is fine).  
- Concept of RAG (retrieval augmented generation).  
- Function calling basics.  
- Creating simple Express services for API routes.  

Don’t worry if you’re not an expert — I’ll walk you through essentials step by step.

---

🔥 **Final note before we dive in:**

This course is **advanced**. The code will challenge you. At the end of each lesson, take time to play with the code, break it, fix it, and really understand it before moving on. That’s how you’ll grow from beginner → builder.

---

👩🏽‍🏫 *My name is Mayowa Oshin. I’m an AI engineering educator and coauthor of **Learning LangChain** (O’Reilly). If you want my thoughts on tech, AI, and entrepreneurship, you can follow me at Mayowa Oshin.*  

# Why Vercel AI SDK
Its a open source library that provides unified API for interacting with various LLM providers and build agents.

# Complete Agents Revision
## 📚 Complete Lesson Recap

### 1. **Structured Outputs**
- Normally, AI gives free‑form text.  
- With structured outputs, you force the model to return JSON following a schema.  
- Example:
  ```json
  { "location": "New York", "temperature": 72 }
  ```
- This makes it easy to pass data into functions.

---

### 2. **Tools (Functions)**
- Tools = actions the model can call.  
- They are just functions you define in code.  
- Each tool has:
  - `name` → identifier.  
  - `description` → what it does.  
  - `parameters` → schema (JSON structure).  
  - `execute` → the function logic.  

**Code Example: Weather Tool**
```js
const weatherTool = {
  name: "weather",
  description: "Get the weather for a location",
  parameters: {
    type: "object",
    properties: { location: { type: "string" } },
    required: ["location"]
  },
  execute: async ({ location }) => {
    const temperature = Math.floor(Math.random() * (90 - 50) + 50);
    return { location, temperature };
  }
};
```

---

### 3. **Tool Calling**
- Flow:
  1. User asks a question.  
  2. Model generates structured output (tool call).  
  3. You execute the tool.  
  4. Tool returns result.  
  5. You feed result back to the model.  
  6. Model summarizes into final answer.  

**Tool Call vs Tool Result**
- Tool Call = AI’s request:
  ```json
  { "name": "weather", "arguments": { "location": "New York" } }
  ```
- Tool Result = your function’s output:
  ```json
  { "location": "New York", "temperature": 72 }
  ```

---

### 4. **OpenAI Raw Function Calling**
- You define functions with schemas.  
- Model can call **one function per response**.  
- You must write a **loop** (`while`) to keep checking until no more function calls.  

**Code Skeleton:**
```js
while (true) {
  const response = await client.chat.completions.create({ ... });
  const message = response.choices[0].message;

  if (message.function_call) {
    const result = await executeTool(message.function_call.name, JSON.parse(message.function_call.arguments));
    messages.push(message);
    messages.push({ role: "function", name: message.function_call.name, content: JSON.stringify(result) });
  } else {
    console.log("Final Answer:", message.content);
    break;
  }
}
```

---

### 5. **OpenAI Functions**
- Same as raw function calling, but officially packaged.  
- You pass `functions: [...]` in the API call.  
- Still only one function per response.  
- You handle execution + looping.

---

### 6. **OpenAI Automated Function Calling**
- Improvement: API can chain calls internally.  
- Less manual orchestration.  
- But still lower‑level than SDKs — you often need logic for complex workflows.

---

### 7. **Vercel AI SDK**
- Built on top of OpenAI function calling.  
- Automates the loop internally.  
- You just set `stopWhen` to control how many steps.  

**Code Skeleton:**
```js
import { generateText } from "ai";

const result = await generateText({
  model: "gpt-4o-mini",
  tools: [weatherTool, attractionsTool],
  prompt: "Weather + attractions in New York",
  stopWhen: 3 // 1: tool call, 2: tool result, 3: final summary
});

console.log("Final Answer:", result.text);
console.log("Tool Calls:", result.toolCalls);
console.log("Tool Results:", result.toolResults);
```

---

### 8. **StopWhen**
- Controls how many steps the SDK runs.  
- Example:  
  - `stopWhen: 2` → tool call + tool result.  
  - `stopWhen: 3` → tool call + tool result + final summary.  
- This replaces the manual `while` loop.

---

### 9. **Multiple Tools Example**
- You can define multiple tools (e.g., weather + attractions).  
- Model decides which to call based on prompt.  

**Code Skeleton:**
```js
const attractionsTool = {
  name: "cityAttractions",
  description: "Get tourist attractions for a city",
  parameters: {
    type: "object",
    properties: { city: { type: "string" } },
    required: ["city"]
  },
  execute: async ({ city }) => {
    return { city, attractions: ["Statue of Liberty", "Central Park", "Times Square"] };
  }
};

const result = await generateText({
  model: "gpt-4o-mini",
  tools: [weatherTool, attractionsTool],
  prompt: "What is the weather in New York and what are the best attractions?",
  stopWhen: 3
});
```

---

## ⚡ Key Takeaways
- **Structured outputs** → force JSON.  
- **Tools** → functions with schemas + execute logic.  
- **Tool calling** → AI generates structured input, you run function, feed result back.  
- **Raw OpenAI API** → manual loop needed.  
- **OpenAI Functions** → official packaging, still manual loop.  
- **Automated function calling** → less manual, but still lower‑level.  
- **Vercel AI SDK** → automates loop with `stopWhen`.  
- **StopWhen** → replaces `while` loop, controls steps.  
- **Multiple tools** → model can chain calls, SDK handles orchestration.

---

## 📂 File Naming for Future Reference
Save this recap + code as:  
**`agent-function-calling-complete.js`**

This name makes it clear it’s your **complete cheat sheet** for function calling, tools, raw API, automated calling, and Vercel SDK.

# Agentic RAG vs RAG
## 🧩 Key Concepts

### 1. Traditional Retrieval (RAG)
- You embed documents (convert them into vectors).
- When a user asks a question, you embed the query.
- You search for similar documents in the vector database.
- You pass those docs as context to the model → model answers based on them.

This is a **one-directional pipeline**.

---

### 2. Agent Routing (Binary Classification)
Instead of always retrieving:
- **Step 1:** Classify the query → Does it need retrieval or not?
- **Step 2:**  
  - If **retrieval needed** → do RAG (embed query, fetch docs, answer).  
  - If **general question** → answer directly using the model’s training.

This introduces **agency**: the model decides how to handle the query.

---

### 3. Why Vercel AI SDK?
- Replaces primitive OpenAI functions.
- Provides structured interfaces (`embed`, `generateText`, etc.).
- Easier integration with Supabase (vector DB).

---

### 4. Knowledge Base
- Scraped Scrimba help docs → converted to Markdown.
- Embedded and stored in Supabase.
- Used for retrieval when queries are about Scrimba.

---

## 💻 Code Walkthrough

### Step 1: Ingest Documents
```js
import { embed } from "ai"; // from Vercel AI SDK
import fs from "fs";
import path from "path";
import { supabase } from "./config.js"; // Supabase client

async function ingestDocuments() {
  const docsDir = "./docs"; // folder with Scrimba help docs
  const files = fs.readdirSync(docsDir);

  for (const file of files) {
    const content = fs.readFileSync(path.join(docsDir, file), "utf-8");

    // Create embeddings
    const embedding = await embed({
      model: "text-embedding-3-small",
      value: content,
    });

    // Insert into Supabase
    await supabase.from("documents").insert({
      text: content,
      embedding: embedding,
      metadata: { source: file },
    });
  }

  console.log("✅ Documents ingested successfully!");
}
```

**Explanation:**
- Loop through each Markdown file.
- Embed content using Vercel AI SDK.
- Store text + embedding + metadata in Supabase.

---

### Step 2: Basic Retrieval
```js
import { generateText, embed } from "ai";

async function basicRetrieval(query) {
  // Embed the query
  const queryEmbedding = await embed({
    model: "text-embedding-3-small",
    value: query,
  });

  // Call Supabase RPC to match docs
  const { data: matches } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: 0.4, // optional threshold
    match_count: 3,       // top 3 docs
  });

  // Combine docs
  const context = matches.map(doc => doc.text).join("\n");

  // Generate answer
  const response = await generateText({
    model: "gpt-4o-mini",
    prompt: `Context:\n${context}\n\nQuestion: ${query}\nAnswer:`,
  });

  console.log("Answer:", response.text);
}
```

**Explanation:**
- Embed the query.
- Retrieve similar docs from Supabase.
- Combine docs into context.
- Ask the model to answer based on context.

---

### Step 3: Classification + Routing
```js
async function classifyRetrieve(query) {
  // Step 1: Classification
  const classification = await generateText({
    model: "gpt-4o-mini",
    prompt: `
      Scrimba is an online platform for learning to code.
      Classify the question as either "retrieval" or "general".
      Question: ${query}
      Classification:`,
    maxOutputTokens: 20,
    temperature: 0, // deterministic
  });

  const decision = classification.text.trim().toLowerCase();

  // Step 2: Routing
  if (decision === "retrieval") {
    console.log("🔎 Classified as retrieval");
    return await basicRetrieval(query);
  } else {
    console.log("💡 Classified as general");
    const response = await generateText({
      model: "gpt-4o-mini",
      prompt: `Answer concisely: ${query}`,
    });
    console.log("Answer:", response.text);
  }
}
```

**Explanation:**
- Ask the model to classify the query.
- If "retrieval" → run RAG pipeline.
- If "general" → answer directly.
- Temperature = 0 ensures no creativity (just retrieval/general).

---

### Step 4: Fallbacks
- If retrieval returns **no docs**, fallback to general answer.
- Ensures the user always gets a response.

---

## 🧠 Example Run

```js
await classifyRetrieve("How do I access Scrimba Discord?");
// → Classified as retrieval → fetch docs → answer with Discord link

await classifyRetrieve("What is the capital of France?");
// → Classified as general → answer directly: "Paris"
```

---

## 🚀 Why This Matters
- Moves from **static retrieval** → **agentic routing**.
- Model decides whether to use knowledge base or its own training.
- Foundation for building a **customer support AI agent**.
