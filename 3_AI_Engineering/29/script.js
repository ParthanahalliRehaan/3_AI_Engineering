import { hf } from "./config.mjs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { supabase } from "./config.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const embedIt = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
];

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
        .from("embeddings")
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

main(embedIt);
/* Why Inserted: Null;
Two separate things going on here — let me break them down clearly.

---

## 1. Why `Inserted: null`?

Supabase's `.insert()` by default **does not return the inserted rows** — it just performs the insert silently. So `data` comes back as `null` even though the rows were actually added. This is expected behavior! If you want to see what was inserted, you chain `.select()` like this:

```javascript
const { data, error } = await supabase
  .from("embeddings")
  .insert([{ content: textChunk, embedding }])
  .select(); // ← add this
```

Now `data` will contain the actual inserted rows.

---

## 2. Why did IDs start from 6 or 7 instead of 1?

Yes, exactly your guess — it's because of the earlier failed attempts. The `id` column uses `bigserial`, which is an **auto-incrementing counter**. Here's the thing: that counter **advances even when an insert fails or is rolled back**. So if you tried inserting 5 rows that errored out, the counter already moved to 6 — and your successful run picked up from there.

This is completely normal and not a bug. IDs are just meant to be **unique**, not necessarily gapless. You'll see this in basically every real-world database.

---

## 3. The three Supabase roles — Postgres, anon, authenticated

Think of roles like **user accounts for your database**, each with different levels of trust and access.

**`postgres`** is the superuser — the owner of everything. It can create tables, delete data, change permissions, anything. You use this role when working in the Supabase dashboard directly (like writing SQL in the editor). You'd **never expose this to your app or frontend**.

**`anon`** (anonymous) is for requests that come in with **no login**. When a visitor lands on your site and hasn't signed in, Supabase treats them as `anon`. By default this role has very limited access — you decide what it's allowed to see or do.

**`authenticated`** is for users who have **logged in** via Supabase Auth. Once someone signs in, their requests automatically use this role, which you can grant more permissions to.

---

## 4. What are RLS Policies?

RLS stands for **Row Level Security**. It's a way of saying *"this user can only see/edit their own rows"* — enforced at the database level, not just in your app code.

Imagine a notes app. Without RLS, if two users (Alice and Bob) both store notes in the same table, a bug in your code could accidentally show Alice's notes to Bob. With RLS, you write a policy like:

> *"A user can only SELECT rows where `user_id` matches their own ID"*

And the database itself enforces that rule — no matter what your app does.

In Supabase, **RLS is disabled by default** on new tables, which means all roles can read/write everything (as long as the API key allows it). When you're learning and testing locally, that's fine — but before you go live with real users, you'd enable RLS and write policies to protect rows.

---

For your current embeddings project (no user auth, just inserting text), you don't need to worry about RLS yet. But it's great that you're asking — it's one of those things that separates a hobby project from a production-safe one.*/
