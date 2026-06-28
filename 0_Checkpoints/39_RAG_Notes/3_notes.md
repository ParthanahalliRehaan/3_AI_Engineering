# Steps to use local model
## ⚙️ Local Setup Recap
1. **Install**  
   ```bash
   npm install @xenova/transformers
   ```
   This gives you Hugging Face models running directly in Node.js or the browser.

2. **Feature Extraction**  
   ```javascript
   import { pipeline } from '@xenova/transformers';

   // Load pipeline (downloads model on first run, caches locally)
   const extractor = await pipeline('feature-extraction', 'bert-base-uncased');

   const text = "The quick brown fox jumps over the lazy dog.";
   const features = await extractor(text);

   console.log(features[0].length); // embedding dimension per token
   ```

   - First run downloads weights into `~/.cache/transformers`.  
   - Subsequent runs load instantly from disk.  

---

## ⚙️ Pooling into Sentence Embeddings
Per‑token embeddings are detailed, but for **semantic search/clustering** you usually want a single vector per sentence. A simple **mean pooling** works well:

```javascript
function meanPool(features) {
  const numTokens = features.length;
  const dim = features[0].length;

  const pooled = new Array(dim).fill(0);

  for (let i = 0; i < numTokens; i++) {
    for (let j = 0; j < dim; j++) {
      pooled[j] += features[i][j];
    }
  }

  return pooled.map(v => v / numTokens);
}

const sentenceEmbedding = meanPool(features);
console.log(sentenceEmbedding.length); // single vector dimension
```

Now you’ve got one vector per sentence, ready for similarity scoring.

---

## ⚙️ Choosing Better Models
- `bert-base-uncased` → general embeddings, not tuned for semantic similarity.  
- Recommended for search:  
  - `sentence-transformers/all-MiniLM-L6-v2`  
  - `sentence-transformers/paraphrase-MiniLM-L3-v2`  

```javascript
const extractor = await pipeline('feature-extraction', 'sentence-transformers/all-MiniLM-L6-v2');
```

These are trained specifically for sentence embeddings.

---

## ⚙️ Performance Notes
- Runs on **CPU** by default.  
- In browsers, can leverage **WebAssembly/WebGPU**.  
- For large workloads, batch inputs for efficiency.  

---

👉 Since you’ve already mastered the API interface, you can now say:  
- *“I used Hugging Face’s hosted Inference API before, but now I’m running models locally with `transformers.js` for on‑device feature extraction.”*  

# Issues faced(While using local models)
## 🔎 The Issue
- You tried to load `bert-base-uncased` with `@xenova/transformers`.
- The library looks for a quantized ONNX file at:
  ```
  https://huggingface.co/bert-base-uncased/resolve/main/onnx/model_quantized.onnx
  ```
- That file **does not exist** in the Hugging Face repo for `bert-base-uncased`.
- Result: `Error: Could not locate file` → pipeline fails.

---

## ✅ The Solutions I Suggested
1. **Use Xenova-hosted models (recommended)**  
   These are already converted to ONNX/WASM and work directly in JavaScript:
   ```js
   import { pipeline } from '@xenova/transformers';

   const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

   const text = "The quick brown fox jumps over the lazy dog.";
   const features = await extractor(text);

   console.log(features[0]);        // First token embedding
   console.log(features[0].length); // Embedding dimension
   ```

2. **Load a local ONNX model**  
   If you really want `bert-base-uncased`, you need ONNX files.  
   - Convert/download them once.  
   - Place them in your project folder.  
   - Load with:
     ```js
     const extractor = await pipeline('feature-extraction', './models/bert-base-uncased');
     ```

3. **JS-only option**  
   Right now, the easiest JS-only path is to use Xenova’s pre-hosted models (like `Xenova/all-MiniLM-L6-v2`).  
   Full ONNX conversion in pure JS is experimental and not practical compared to Python tooling.

---

## 🎯 Bottom Line
- **The error happened because `bert-base-uncased` doesn’t have ONNX files hosted.**
- **The fix is to either use Xenova’s ready-to-go models (best option in JS)** or manually provide ONNX files locally.


# Supabase Installation steps
✨ **Think of Supabase like a super‑powered online spreadsheet.**  
It’s a tool that gives you a place to store information, organize it, and search through it quickly. The difference is that instead of just numbers or text, you can also store something called *embeddings* (which are basically smart “fingerprints” of data, like the meaning of a sentence or an image).  

Here’s the journey step by step:

1. **Sign up** → You go to [supabase.com](https://supabase.com) and log in (you can even use your GitHub account, which is just another way of signing in).  
   
2. **Create an organization** → Supabase asks you to make a “home base” for your projects. This could be under your name or a company name. Think of it like creating a folder to keep your work in.  

3. **Make a project** → Inside that organization, you create a project. This project comes with its own database (your smart spreadsheet) and an API (a doorway that lets your app talk to the database). You give it a name, set a password, and pick a location close to you so it runs faster.  

4. **Turn on PG Vector** → Normally, databases store text and numbers. PG Vector is like a special add‑on that lets the database understand and compare those “fingerprints” (embeddings). You just click to enable it—no coding wizardry needed.  

5. **Connect your app** → Supabase gives you two important keys:  
   - A **URL** (like the address of your database)  
   - An **API key** (like the password your app uses to get in)  

   You save these in your app’s settings so your app knows where to look and how to connect.  

## Step 1: Install Supabase client
If you’re using JavaScript/Node, install the Supabase library:

```bash
npm install @supabase/supabase-js
```

## Step 2: Connect to your Supabase project
Use the **URL** and **API key** you saved as environment variables (`SUPABASE_URL` and `SUPABASE_API_KEY`):

```javascript
import { createClient } from '@supabase/supabase-js'

// Load from environment variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_API_KEY

// Create a Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)
```

This is like unlocking the door to your database with the secret codes Supabase gave you.

---

## Step 3: Create a table for embeddings
You’ll need a table to store your vectors. Run this SQL in the Supabase SQL editor:

```sql
create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536) -- size depends on your model
);
```

Here:
- `content` is the text you want to store (like a sentence or paragraph).
- `embedding` is the “fingerprint” (vector) of that text.

---

## Step 4: Insert data
Suppose you already generated embeddings using OpenAI or another model. You can insert them like this:

```javascript
const content = "Supabase makes Postgres easy to use."
const embedding = [0.0123, -0.0456, 0.0789, ...] // your embedding array

const { data, error } = await supabase
  .from('documents')
  .insert([{ content, embedding }])

if (error) {
  console.error(error)
} else {
  console.log("Inserted:", data)
}
```

---

## Step 5: Search by similarity
To find the most similar text to a new query, you generate its embedding and run a similarity search:

```sql
-- Example query in SQL editor
select id, content
from documents
order by embedding <-> '[0.0123, -0.0456, 0.0789, ...]'
limit 5;
```

That `<->` operator is the “find closest match” tool. It compares your new embedding with all stored ones and returns the nearest results.

---

✅ With this setup:
- Supabase = your database
- PG Vector = the special feature that understands embeddings
- Code above = how you insert and search

# Supabase Integration(code)
```js
async function main(input) {
  const results = await Promise.all(
    input.map(async (textChunk) => {
      const embeddingResponse = await hf.featureExtraction({
        model: process.env.EMBED_MODEL, 
        inputs: textChunk,
      });

      // Convert to plain array
      const embedding = Array.from(embeddingResponse);

      // Insert into Supabase
      const { data, error } = await supabase
        .from("tablename-created-from https://supabase.com/dashboard/project/zvdgqyehjfxozxrzybtb/sql/new, Also for functions https://supabase.com/dashboard/project/zvdgqyehjfxozxrzybtb/functions/new")
        .insert([{ content: textChunk, embedding }])
        .select();

      if (error) {
        console.error("Insert error:", error);
      } else {
        console.log("Inserted:", data);
      }

      return { content: textChunk, embedding };
    })
  );
  console.log("All embeddings processed:");
}
```

# Supabase Keys(Anon vs service)

## 1. **Row Level Security (RLS)**
- Supabase automatically turns on **Row Level Security** for every new table.
- Think of RLS as a “gatekeeper” at the table level: even if you have the right database connection, you can’t insert, update, or read rows unless you’ve defined rules (policies).
- Without policies, the gatekeeper blocks everything, which is why you saw:
  ```
  new row violates row-level security policy for table "embeddings"
  ```

---

## 2. **Anon Key vs Service Role Key**
- **Anon key**:  
  - This is the “public” key meant for frontend apps (like a website or mobile app).  
  - It’s safe to expose but very limited. It only works if you’ve written policies that allow anonymous or authenticated users to do certain actions.
- **Service role key**:  
  - This is the “master” key meant for backend code (like your Node.js script).  
  - It bypasses RLS completely, so you can insert/update without writing policies.  
  - It must be kept secret — never put it in client-side code.

---

## 3. **Policies**
- Policies are SQL rules you write to tell Supabase who can do what.
- Example:  
  ```sql
  create policy "Allow insert for authenticated users"
  on embeddings
  for insert
  to authenticated
  using (true);
  ```
  This means: “If a user is logged in, let them insert rows into the `embeddings` table.”

- Without policies, anon users (or even authenticated users) can’t touch the table.

---

## 4. **Your Current Situation**
- You’re running a **backend ingestion script** (Node.js).  
- That script is trying to insert embeddings into Supabase.  
- Since you’re likely using the **anon key**, Supabase blocks the insert because no policy allows it.  
- That’s why every insert fails with code `42501`.

---

## 5. **How to Fix**
You have two paths:

- **Quick fix (backend only)**:  
  Use the **service role key** in your `.env` file:
  ```env
  SUPABASE_KEY=your-service-role-key
  ```
  Then your inserts will succeed because the service role bypasses RLS.

- **Secure fix (frontend + backend)**:  
  Keep RLS enabled and write policies that allow specific roles (like authenticated users) to insert into the `embeddings` table.  
  This way, you don’t expose the service role key to the frontend, but your backend can still manage data securely.

---

## 🔑 Analogy
Think of Supabase like a library:
- The **anon key** is like a visitor pass — you can walk in, but you can only read books if the librarian says so (policies).
- The **service role key** is like the librarian’s master key — you can unlock any shelf without asking.
- **RLS policies** are the rules posted on the wall: “Visitors can only read books in the children’s section,” or “Members can borrow up to 3 books.”

## Doubt(If publishable and Anon both are same, then why can user see two same purpose keys)
1. **The `sb_publishable_...` key**  
   - This is the **API key string** you copy into your client app.  
   - It identifies your project and lets the client talk to Supabase.  
   - Think of it as the “password” your app uses to connect.

2. **The anon JWT (the long `eyJhbGciOi...` token)**  
   - This is just the **decoded form of the same publishable key**.  
   - Supabase internally represents the anon key as a JWT (JSON Web Token).  
   - It contains claims like `role: anon`, `ref: <project-id>`, `iat` (issued at), and `exp` (expiry).  
   - When you use the `sb_publishable_...` key, Supabase is really just validating that JWT under the hood.

### ⚖️ Which one to use?
- In your **client code**, you’ll always use the `sb_publishable_...` key.  
- You don’t need to manually use the JWT — Supabase generates and validates it internally.  
- The JWT is just the underlying representation of the publishable key, not something you paste into your app.

👉 So: **they’re not two separate keys** — they’re two forms of the same thing.  
- Use the `sb_publishable_...` key in your frontend.  
- Ignore the raw JWT unless you’re debugging or inspecting claims.  
