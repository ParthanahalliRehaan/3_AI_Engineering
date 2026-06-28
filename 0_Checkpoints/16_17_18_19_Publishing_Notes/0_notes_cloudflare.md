https://developers.cloudflare.com/workers/wrangler/
Cloudflare Workers are lightweight serverless functions
that run on Cloudflare's edge network. They let you deploy
JavaScript (or TypeScript) without managing servers.

Wrangler(Manually, there is another way i.e, UI from cloudflares website) is Cloudflare's CLI tool used to:
  - Generate new Worker projects
  - Configure deployment settings
  - Publish Workers to Cloudflare's global network

Directory structure -
 /src/index.js(here lives your code)
 /test/index.spec.js
 .editorconfig
 .gitignore
 .prettierrc
 vitest.config.js
 wrangler.jsonc

# Cloudflare workers(Creating through wrangler, a CLI tool)
## 🛠️ Prerequisites
1. Install Node.js (latest LTS recommended)
Needed for npm/npx commands.
https://nodejs.org/

2. Install Wrangler CLI (Cloudflare’s Worker tool)
npm install -g wrangler
OR (macOS/Linux users)
brew install cloudflare/wrangler/wrangler

3. Verify installation
wrangler --version
Should print the Wrangler version number.


## 🚀 Step 1: Scaffold a new Worker project
```
npm create cloudflare@latest my-worker
```
During setup, choose:
- "Worker only" template (simplest)
- Language: JavaScript (or TypeScript if you prefer)
- Project name: my-worker (or any name you like)
- Optionally add AGENTS.md (helps AI coding tools understand Cloudflare APIs)

Move into the project directory
```
cd my-worker
```


## 🚀 Step 2: Authenticate Wrangler with your Cloudflare account
```
wrangler login
```
Opens a browser window to log in and link Wrangler to your Cloudflare account.


## 🚀 Step 3: Run the Worker locally for testing
```
wrangler dev
```
Spins up a local dev server that mimics Cloudflare’s edge runtime.


## 🚀 Step 4: Deploy the Worker globally
```
wrangler publish
```
Deploys your Worker to Cloudflare’s edge network.
After deployment, you’ll get a URL like:
https://<worker-name>.<account>.workers.dev


## 🚀 Step 5: Check account info
```
wrangler whoami
```
Shows which Cloudflare account Wrangler is linked to.


## 🚀 Step 6: Manage environment variables (secrets)
Add a secret (e.g., your OpenAI API key)
```
wrangler secret put OPENAI_API_KEY
```
List all secrets set for this Worker
```
wrangler secret list
```
Delete a secret
```
wrangler secret delete OPENAI_API_KEY
```

Secrets are injected into your Worker as env variables (e.g., env.OPENAI_API_KEY).


## 🚀 Step 7: Update Wrangler configuration
wrangler config - Updates Wrangler settings interactively.
You can also edit wrangler.toml directly to set:
- Worker name
- Routes
- Environments (dev vs production)


## 📄 Example Worker (Hello World)
Save this in index.js
```js
export default {
    async fetch(request, env, ctx) {
    return new Response("Hello World", { status: 200 });
}
};
```



# Example(Remember we can also create workers through UI, just not use wrangler and go to cloudflare website)
    C:\Users\rehaa\aienback\AI_Engineering\16>npm create cloudflare@latest

    > ai_engineering@1.0.0 npx
    > create-cloudflare


    ──────────────────────────────────────────────────────────────────────────────────────────────────────────
    👋 Welcome to create-cloudflare v2.64.7!
    🧡 Let's get started.
    📊 Cloudflare collects telemetry about your usage of Create-Cloudflare.

    Learn more at: https://github.com/cloudflare/workers-sdk/blob/main/packages/create-cloudflare/telemetry.md
    ──────────────────────────────────────────────────────────────────────────────────────────────────────────

    ╭ Create an application with Cloudflare Step 1 of 3
    │
    ├ In which directory do you want to create your application?
    │ dir ./openai-api-worker
    │
    ├ What would you like to start with?
    │ category Hello World example
    │
    ├ Which template would you like to use?
    │ type Worker only
    │
    ├ Which language do you want to use?
    │ lang JavaScript
    │
    ├ Copying template files
    │ files copied to project directory
    │
    ├ Updating name in `package.json`
    │ updated `package.json`
    │
    ├ Installing dependencies
    │ installed via `npm install`
    │
    ├ Do you want to add an AGENTS.md file to help AI coding tools understand Cloudflare APIs?
    │ yes agents
    │
    ╰ Application created

    ╭ Configuring your application for Cloudflare Step 2 of 3
    │
    ├ Installing wrangler A command line tool for building Cloudflare Workers
    │ installed via `npm install wrangler --save-dev`
    │
    ├ Retrieving current workerd compatibility date
    │ compatibility date 2026-03-10
    │
    ├ You're in an existing git repository. Do you want to use git for version control?
    │ yes git
    │
    ╰ Application configured

    ╭ Deploy with Cloudflare Step 3 of 3
    │
    ├ Do you want to deploy your application?
    │ yes deploy via `npm run deploy`
    │
    ├ Logging into Cloudflare checking authentication status
    │ logged in
    │
    ├ Selecting Cloudflare account retrieving accounts
    │ account Parthanahalli.rehaan@gmail.com's Account
    │

    > openai-api-worker@0.0.0 deploy
    > wrangler deploy


    ⛅️ wrangler 4.73.0
    ───────────────────
    Total Upload: 6.83 KiB / gzip: 1.85 KiB
    Worker Startup Time: 5 ms
    Uploaded openai-api-worker (9.11 sec)
    Deployed openai-api-worker triggers (9.74 sec)
    https://openai-api-worker.parthanahalli-rehaan.workers.dev
    Current Version ID: bfc0c663-dc3f-4fc6-a161-831f9cc680c0
    ├ Waiting for DNS to propagate. This might take a few minutes.
    │ DNS propagation complete.
    │
    ├ Waiting for deployment to become available
    │ deployment is ready at: https://openai-api-worker.parthanahalli-rehaan.workers.dev
    │
    ├ Opening browser
    │
    ╰ Done

    ──────────────────────────────────────────────────────────────────────────────────────────────────
    🎉  SUCCESS  Application deployed successfully!

    🔍 View Project
    Visit: https://openai-api-worker.parthanahalli-rehaan.workers.dev
    Dash: https://dash.cloudflare.com/?to=/:account/workers/services/view/openai-api-worker/production

    💻 Continue Developing
    Change directories: cd openai-api-worker
    Deploy again: npm run deploy

    📖 Explore Documentation
    https://developers.cloudflare.com/workers

    🐛 Report an Issue
    https://github.com/cloudflare/workers-sdk/issues/new/choose

    💬 Join our Community
    https://discord.cloudflare.com
    ──────────────────────────────────────────────────────────────────────────────────────────────────

# facts
## 🛠️ Why you don’t see a .env file
Cloudflare Workers don’t use local .env files.
Secrets are stored securely in Cloudflare’s infrastructure
and injected at runtime into your Worker as `env`.

In Node.js/Express:
- You’d have a .env file
- Use dotenv to load variables

In Cloudflare Workers:
- Use Wrangler to manage secrets
- No .env file is created locally
- Secrets are accessed via `env` objec

## Why cloudflare syntax is bit different then normal Node/Express:
- Local development (server.js with Express)
    - You used app.post("/route", handler) because Express runs a Node.js server that listens on a port and manages routes.
    - Express abstracts HTTP handling, so you define routes directly.
- Cloudflare Workers (index.js)
    - Workers don’t run a server; they’re event-driven functions at Cloudflare’s edge.
    - The entry point is export default { async fetch(request, env, ctx) { … } }.
    - You check request.method and request.url manually instead of using app.post.
    - Environment variables (like OPENAI_API_KEY) are accessed via env.
- Framework difference
    - Express is a Node.js framework for building servers.
    - Cloudflare Workers use their own runtime API — no external framework. The fetch handler is Cloudflare’s convention.
- Key takeaway
    - In Express: you spin up and manage a server.
    - In Workers: Cloudflare already has the server; you just provide the handler function (fetch) that runs when a request comes in.

## In workers, we cant access endpoints directly(If a AI Gateway is used, so we have to use fetch not chat completions as any gateway acts as a strict bouncer but if custom cors is defined no problem with chat completions)
```js
// Define CORS headers so your frontend (running in the browser) 
// can call this Worker without being blocked by cross-origin rules.
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allow requests from any origin
  'Access-Control-Allow-Methods': 'POST, OPTIONS', // Only POST and preflight OPTIONS
  'Access-Control-Allow-Headers': 'Content-Type' // Allow sending JSON
};

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS preflight requests
    // Browsers send an OPTIONS request before POST to check if it's allowed.
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // 2. Reject any non-POST requests
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: `${request.method} method not allowed.` }),
        { status: 405, headers: corsHeaders }
      );
    }

    try {
      // 3. Parse the incoming JSON body from the frontend
      const { prompt } = await request.json();

      // 4. Forward the request to Cloudflare’s AI Gateway
      // Instead of using the OpenAI SDK, we call the Gateway directly with fetch.
      // This ensures the Worker runs at the edge and doesn’t need extra libraries.
      const response = await fetch(
        "https://gateway.ai.cloudflare.com/v1/d7297e3e5152a44ac5c13eaea4026f3d/openai-api/openai/chat/completions",
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.OPENAI_API_KEY}`, // Securely stored in Worker env
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: env.OPENAI_AI_MODEL, // Model name stored in Worker env
            messages: [{ role: "user", content: prompt }]
          })
        }
      );

      // 5. Parse the AI response
      const data = await response.json();

      // 6. Send the AI’s reply back to the frontend
      // Include CORS headers so the browser accepts the response.
      return new Response(
        JSON.stringify({ reply: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (e) {
      // 7. Handle errors gracefully
      return new Response(
        JSON.stringify({ error: e.message }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
```

---

### Why the earlier approach didn’t work
- When you used the **OpenAI SDK** (`import OpenAI from "openai";`), it expected a Node.js environment. Cloudflare Workers run on a lightweight runtime (similar to Service Workers) that doesn’t support all Node libraries.  
- By switching to **direct `fetch` calls**, you avoid SDK compatibility issues and keep everything edge‑native.  
- Adding **CORS headers** ensures your frontend can call the Worker without being blocked by the browser’s same‑origin policy. Without them, you’d see errors like *“CORS policy: No ‘Access-Control-Allow-Origin’ header present”*.  

## Gateway Basics

### 1. What is a Gateway?
- A **gateway** is like a checkpoint or doorway between two systems.
- It controls how information flows, checks rules, and directs traffic.
- Analogy: A **security guard at a building entrance**:
  - Checks who can enter (authentication).
  - Decides where they should go (routing).
  - Ensures no one breaks the rules (rate limits, policies).

---

### 2. API Gateway
- An **API Gateway** manages communication between your app and backend services.
- Responsibilities:
  - Authentication (who can access).
  - Rate limiting (how many requests per second).
  - Routing (which service gets the request).
  - Monitoring (logs, analytics).
- Analogy: A **waiter in a restaurant** who takes orders and delivers them to the right chef.

---

### 3. AI Gateway
- An **AI Gateway** is a specialized gateway for AI models.
- Responsibilities:
  - **Model Routing**: Chooses the right AI model (GPT for text, Stable Diffusion for images).
  - **Prompt Management**: Standardizes how prompts are sent to different models.
  - **Governance**: Ensures compliance with privacy and company rules.
  - **Scaling**: Balances workloads across multiple AI services.
  - **Monitoring**: Tracks usage, costs, and performance.
- Analogy: A **head waiter** who knows which chef is best for each dish, ensures hygiene rules, and tracks popularity.

---

### 4. Why It Matters
- If you’re only using **one AI model (like OpenAI GPT)** → You don’t need an AI Gateway yet.
- If you want to **combine multiple models** (text, images, speech, custom ML) → An AI Gateway makes life easier.
- Enterprises use AI Gateways for **security, compliance, and efficiency** in large deployments.

---

### ✅ Summary
- **Gateway** = checkpoint/traffic controller between systems.
- **API Gateway** = manages general APIs.
- **AI Gateway** = manages AI models, prompts, and governance.

## Why Gateway bounces(openai endpoints)
### Fixing the "Bad Format" Error (Code 2019)

The error happened because the **OpenAI SDK** (`import OpenAI from "openai"`) automatically adds extra hidden headers and metadata that **Cloudflare’s AI Gateway** doesn’t accept.  
The Gateway is strict—it only wants clean JSON requests. Anything extra triggers the "Bad Format" error.

---

### ✅ The Solution: Use `fetch` Instead

By switching to `fetch`, we bypass the SDK entirely and send a **minimal, clean request** that the Gateway accepts.

#### Fixed Worker Code

```javascript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  async fetch(request, env) {
    // 1. Handle CORS (for your frontend)
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

    try {
      const { prompt } = await request.json();

      // 2. Send request DIRECTLY to Gateway using standard fetch
      const response = await fetch("https://gateway.ai.cloudflare.com/v1/d7297e3e5152a44ac5c13eaea4026f3d/openai-api/openai/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-5-nano",
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      
      // 3. Send the AI's reply back to your frontend
      return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }
  }
};
```

---

### 🔑 Why This Works
- **Total Control**: No SDK, no hidden headers—just your API key, model, and prompt.  
- **Direct Path**: Calls the `/chat/completions` endpoint exactly as required.  
- **No Errors**: The Gateway accepts the clean JSON immediately.  

## 🔑 Cloudflare AI Gateway — Stored Key BYOK

### What It Means
- **Bring Your Own Key (BYOK)** lets you securely store provider API keys in Cloudflare’s **Secrets Store**.
- Keys are referenced by name in your AI Gateway config, not exposed in plain text.
- Enables **rate limits, budget limits, and routing policies** tied to specific keys.

---

### ⚙️ How It Works
1. Log in to **Cloudflare Dashboard** → Navigate to **AI > AI Gateway**.
2. Create or select a **Gateway**.
3. Add provider API keys → Stored securely in **Secrets Store**.
4. Reference keys in your Gateway configuration.
5. Deploy → Requests automatically use stored keys.

---

### 📊 Benefits vs. Inline Keys

| Feature                  | Inline Keys (Traditional) | Stored Key BYOK |
|---------------------------|---------------------------|-----------------|
| Security                  | Keys exposed in requests  | Hidden in Secrets Store |
| Rotation                  | Manual code changes       | Centralized updates |
| Rate/Budget Limits        | Harder to enforce         | Configurable in Gateway |
| Operational Overhead      | High (per request)        | Low (configure once) |
| Scalability               | Risky with multiple apps  | Safe, centralized |

---

### 🚨 Risks & Considerations
- Requires **permissions** to manage secrets.
- Misconfiguration can affect all dependent services.
- You must **audit usage** and enforce policies.

---

### ✅ Key Takeaway
Stored key BYOK = **secure, centralized API key management**.  
No raw keys in requests, easier rotation, safer scaling.


# How to create Workers through web UI(Cloudflare website),
 1. Go to https://dash.cloudflare.com/d7297e3e5152a44ac5c13eaea4026f3d/workers-and-pages?skipOnboarding=true
 2. then click on **create application**
 3. Link Github Repository(better choice) or give local files(you can also edit the index.js from web UI)
 4. create and deploy
## for editing index.js from the website 
 1. go to https://dash.cloudflare.com/d7297e3e5152a44ac5c13eaea4026f3d/workers/services/view/your-worker/production or just click on your worker
 2. click on **edit code**
