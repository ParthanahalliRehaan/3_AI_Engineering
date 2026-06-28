# LLM Deep dive(Token)
## 🔹 Tokens: Breaking Language into Pieces
- **Definition**: A token is the smallest unit of text the model processes. It could be a word, part of a word, or even punctuation.
- **Example**:  
  Sentence: *“AI is powerful.”*  
  Tokens: `[AI] [is] [powerful] [.]`
- Why? Because computers don’t “see” words — they need everything broken down into consistent, countable chunks.

---

## 🔹 Embeddings: Turning Tokens into Numbers
- **Definition**: An embedding is a vector (a list of numbers) that represents a token in a multi‑dimensional space.
- **Analogy**: Imagine a giant map where every word has coordinates. Words with similar meanings are close together.
- **Example**:  
  - “king” → `[0.21, -0.57, 0.88, …]`  
  - “queen” → `[0.19, -0.55, 0.91, …]`  
  - “banana” → `[0.92, 0.11, -0.33, …]`  
  Notice how “king” and “queen” are numerically closer than “banana.”

---

## 🔹 Why Embeddings Matter
- They capture **semantic meaning**: “happy” and “joyful” end up near each other.
- They allow math operations on meaning:  
  - `king - man + woman ≈ queen`  
- They’re the foundation for search, recommendations, and understanding context.

---

## 🔹 How It All Connects
1. **Text → Tokens** (split into chunks).  
2. **Tokens → Embeddings** (mapped into vectors).  
3. **Embeddings → Neural Networks** (processed layer by layer).  
4. **Output → Predictions** (next word, classification, etc.).

# Token deep dive(For prompt engineering go to ../../1_notes.md)
## 🧩 Tricks for Managing Token Limits

### 1. **Chunking Information**
- Break long inputs into smaller, digestible pieces.
- Example: Instead of pasting a 20‑page document, feed it section by section and ask for summaries, then combine.

### 2. **Summarization Inside Prompts**
- Use the model itself to compress text before re‑feeding it.
- Example:  
  - Step 1: “Summarize this article in 200 words.”  
  - Step 2: “Now analyze the summary for key themes.”  
  This way you don’t waste tokens on raw text.

### 3. **External Memory (RAG)**
- Retrieval‑Augmented Generation: store big context outside the model (like in a database or notes) and only inject the relevant chunk into the prompt.
- Trick: “Given this query, fetch only the top 3 relevant paragraphs” → keeps prompts lean.

### 4. **Instruction Compression**
- Instead of verbose instructions, use shorthand.  
  - Bad: “Please write me a detailed explanation in simple words with examples and keep it under 500 words.”  
  - Good: “Explain simply, with examples, ≤500 words.”

### 5. **Role + Context Early**
- Put the most important instructions at the **start** of the prompt. If the model runs out of tokens, the tail gets cut first.

### 6. **Token Budget Awareness(Each model has token limit, go to ./script.js)**
- Roughly: 1 token ≈ 4 characters in English.  
  - 1,000 tokens ≈ 750 words.  
  - If your model has 4k tokens, that’s ~3,000 words max.  
  Knowing this helps you plan.

---

## 🛠 Advanced Prompt Engineering Tricks
- **Chain of Thought Compression**: Ask the model to “think step‑by‑step internally, then give only the final answer.” Saves tokens by not printing reasoning unless needed.
- **Context Anchoring**: Repeat key facts in short form at the start of each chunk so the model doesn’t lose track.
- **Instruction Reuse**: Instead of re‑explaining rules every time, say “Use the same format as before.”

# Messages Array(Look into the code from ./script.js)
 Can be used to store the Context of the conversation(But each model has a limit, can be overcome by context engineering)
## System Prompt
Its governs behavior, ensures safety, and aligns responses with the intended purpose of the response from LLM.

# Models are stateless(i.e, the context isn't stored, just like a req to server is stateless unlike websocket. for more info go to,https://github.com/ParthanahalliRehaan/2_JS_Node/blob/main/1_Node_Docs/1_HTTP_WebSockets_Containers_and_Bundlers.txt)

## Models snapshot(Saved version of models, these models training on data will be stopped)

# Context Window (Context Engineering, Apply in all upcoming projects)
Context window is the total context the LLMs remembers(Only the one present in the window)

As we already know that LLMs stateless but through messages array we can give them entire context but each model has token limit
which makes it difficult to give full context. 

Remember we have to leave some space open for input from the user.
So, to solve this issue context Engineering comes in with techniques such as context trimming, context trimming etc
## System prompt design(Can learn Prompt engineering from ../../1_notes.md,AIMV CoTO)
We can specify response format, assign a role to model or so on.

## Context Trimming Vs Context Summarization
Context Engineering
├── Context Trimming
│   ├── Definition: Removing less relevant or redundant parts
│   ├── Goal: Reduce token usage by cutting raw content
│   ├── Method: Drop sections, sentences, or examples
│   ├── Risk: Important details may be lost
│   ├── Efficiency: Quick and straightforward
│   ├── Use Case: Clear redundancy (logs, transcripts)
│   └── Example: Remove older chat history beyond last 10 turns
│
└── Summarization
    ├── Definition: Condensing context into shorter version
    ├── Goal: Reduce token usage by rephrasing/compressing
    ├── Method: Rewrite or paraphrase into concise summaries
    ├── Risk: Meaning may be distorted if inaccurate
    ├── Efficiency: Requires processing effort
    ├── Use Case: Dense but important content (papers, conversations)
    └── Example: Summarize 10 turns into 3‑sentence recap
### Context Trimming And summarization techniques
Context Management
├── Trimming
│   ├── Definition: Removing less relevant or redundant context
│   ├── Techniques:
│   │   ├── Slicing: Keeping only a fixed window (e.g., last N turns)
│   │   ├── Filtering: Dropping low‑priority or repetitive info
│   │   └── Pruning: Removing entire sections not needed
│   └── Goal: Reduce token load by cutting away clutter
│
└── Summarization
    ├── Definition: Rewriting context into a compressed form
    ├── Techniques:
    │   ├── Abstractive: Paraphrasing into shorter text
    │   └── Extractive: Picking key sentences/phrases
    └── Goal: Preserve meaning while shrinking size
### Coding eg(For each technique, message based context management)
```js
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Example conversation history
const conversationHistory = [
  "User: Hi, can you help me?",
  "AI: Sure, what do you need?",
  "User: Explain trimming vs summarization.",
  "AI: Trimming removes redundant context...",
  "User: And slicing?",
  "AI: Slicing keeps only last N turns...",
  "User: Show me code example."
];

// --- Technique 1: Slicing (under Trimming)
const slicedContext = conversationHistory.slice(-3); // keep last 3 turns

// --- Technique 2: Pruning (drop old topic)
const prunedContext = conversationHistory.filter(msg => !msg.includes("Hi")); // remove greetings

// --- Technique 3: Filtering (drop filler)
const filteredContext = conversationHistory.filter(msg => !msg.includes("Sure")); // remove low-value replies

// --- Technique 4: Summarization
async function summarizeContext(history) {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "Summarize the following conversation in 3 sentences." },
      { role: "user", content: history.join("\n") }
    ]
  });

  return response.choices[0].message.content;
}

(async () => {
  console.log("Sliced Context:", slicedContext);
  console.log("Pruned Context:", prunedContext);
  console.log("Filtered Context:", filteredContext);

  const summary = await summarizeContext(conversationHistory);
  console.log("Summarized Context:", summary);
})();
```

# Vercel AI SDK Library(For simplicity, also to avoid RAW HTTP request also can be used for openrouter)
```js
import { AIClient } from "ai-sdk";
import { xyz } from "ai";

const client = new AIClient({ apiKey: process.env.AI_API_KEY });

async function generateImage() {
  const response = await client.generateImage({
    model: "dall-e-3",
    prompt: "A knight fighting a dragon in anime style"
  });

  console.log(response.url); // link to generated image
}

generateImage();
```


# Context Custom Trimming And Summarization(Combined strategy, also here we explore token based context management)
## ✂️ Trimming (Reducing Context Size)

Trimming ensures that the **prompt stays within the model’s token limit**. A common strategy is to keep the most recent messages (recency bias) or only the most relevant ones.

### Example: Token-based Trimming with OpenRouter
```javascript
import OpenAI from "openai";

// Initialize OpenRouter client
const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

// Simple tokenizer approximation (real apps use tiktoken or similar)
function roughTokenCount(text) {
  return text.split(/\s+/).length; // crude word-based count
}

function trimContext(messages, maxTokens = 512) {
  let totalTokens = 0;
  const trimmed = [];

  // Traverse from the end (most recent messages)
  for (let i = messages.length - 1; i >= 0; i--) {
    const msgTokens = roughTokenCount(messages[i].content);
    if (totalTokens + msgTokens <= maxTokens) {
      trimmed.unshift(messages[i]);
      totalTokens += msgTokens;
    } else {
      break;
    }
  }
  return trimmed;
}

// Example usage
const conversation = [
  { role: "user", content: "Explain transformers in AI." },
  { role: "assistant", content: "Transformers use attention..." },
  { role: "user", content: "Now explain trimming in context engineering." }
];

const trimmedConversation = trimContext(conversation, 50);
console.log(trimmedConversation);
```

👉 This keeps only the most recent messages that fit within the `maxTokens` budget.

---

## ⚙️ Combined Strategy (Trim + Summarize)

In practice, engineers often **combine both**:
1. **Summarize older history** into a compact note.
2. **Trim recent messages** to fit within the token budget.

```javascript
async function prepareContext(conversation, maxTokens = 512) {
  // Step 1: Summarize older part
  const summary = await summarizeConversation(conversation.slice(0, -2));

  // Step 2: Keep last few messages trimmed
  const recent = trimContext(conversation.slice(-2), maxTokens);

  // Final context = summary + recent
  return [
    { role: "system", content: `Summary of past conversation: ${summary}` },
    ...recent
  ];
}
```

---

## 🚀 Why This Matters in AI Engineering
- **Efficiency:** Keeps prompts within token limits.
- **Relevance:** Ensures the model focuses on the most important context.
- **Scalability:** Enables long-running conversations without losing coherence.

# Context Management workflow
Messages A ─┐
            │
Messages B ─┼──► [ AI Context Window ]
Messages C ─┘

New Message D arrives
        │
        ▼
Do we need to summarize?
        │
   ┌────┴────────────────────┐
   │                         │
  YES                        NO
   │                         │
   ▼                         ▼
[ Make AI Call ]     [ Add D directly ]
 Summarize A+B
        │
        ▼
Summary A+B + C + D
        │
        ▼
[ AI Context Window Updated ]
Now enough space for Message D

# More Context Management information
## 🧩 The Four Techniques

### 1. Context Trimming
- **What it is:** Cutting off old or irrelevant conversation chunks.
- **Use case:** When past details are no longer needed.
- **Risk:** Important info might get lost if trimming is too aggressive.

### 2. Context Summarization
- **What it is:** Replacing long histories with short summaries.
- **Use case:** Keeps the “storyline” intact while saving tokens.
- **Risk:** Summaries may miss fine-grained details.

### 3. Context Compression
- **What it is:** Condensing history into a **structured, compact representation**.
- **How it differs from summarization:** Instead of just shortening text, compression preserves **critical facts, reasoning steps, and artifacts** in a tighter format.
- **Example:**  
  Raw log:  
  *“We tried fixing Redis by editing redis.conf, failed, then switched to Docker restart which worked.”*  
  Compressed:  
  *“Redis fixed via Docker restart after config attempt failed.”*

### 4. Context Compensation
- **What it is:** Adding safeguards to ensure compressed context doesn’t lose essential meaning.
- **Techniques:**
  - **Verification probes:** Ask the model questions after compression (e.g., “Which file did we edit?”).
  - **Artifact tracking:** Keep structured records outside the compressed text (like a list of files touched).
  - **Mini-summaries per thread:** Maintain separate summaries for different tasks so switching doesn’t erase memory.

### 5. Context Compaction
- **What it is:** A more aggressive form of compression — shrinking context by removing redundancy and collapsing repeated patterns.
- **Difference from compression:**  
  - **Compression** = rewrite into a smaller but still descriptive form.  
  - **Compaction** = strip down to bare essentials, often in bullet points or key-value pairs.  
- **Example:**  
  Raw: *“We discussed login bug, tried patch A, failed, tried patch B, succeeded.”*  
  Compacted: *“Login bug → patch B fixed.”*

---

## 📊 Side-by-Side Comparison

| Technique        | Approach                | Strengths            | Weaknesses                |
|------------------|-------------------------|----------------------|---------------------------|
| **Trimming**     | Delete old context      | Simple, fast         | Can lose important info   |
| **Summarization**| Short narrative         | Preserves storyline  | May miss details          |
| **Compression**  | Structured condensation | Efficient, scalable  | Risk of over-compression  |
| **Compaction**   | Extreme shrinking       | Very token-efficient | Can feel too “bare bones” |
| **Compensation** | Safeguards + checks     | Prevents info loss   | Adds complexity           |

---

## 🎯 Why OpenAI Talks About These
- **Token limits are finite**: Even with huge contexts, models can’t carry everything forever.  
- **Compression + Compaction**: Shrink history efficiently.  
- **Compensation**: Make sure shrinking doesn’t break continuity.  
- **Together**: They allow agents to handle long, multi-turn workflows (debugging, research, PR reviews) without “forgetting” what they did.
