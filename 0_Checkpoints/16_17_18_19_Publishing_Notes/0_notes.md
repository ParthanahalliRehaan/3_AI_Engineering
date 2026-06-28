# CORS
**CORS (Cross-Origin Resource Sharing) is a browser security feature that controls which domains can access resources from your server. In Express.js, you configure it using the `cors` middleware to allow or restrict requests from specific origins.**  
## 🌐 What is CORS?
- **Same-Origin Policy**: Browsers block requests from one domain to another by default for security reasons.
- **CORS**: A mechanism that lets your server explicitly state which external domains are allowed to access its resources.
- **Use Case**: If your frontend runs on `http://localhost:3000` and backend on `http://localhost:5000`, you need CORS to let them communicate.

---

## ⚙️ Installing CORS in Express
```bash
npm install cors
```

---

## 🛠️ Basic Usage
Enable CORS for all routes:
```js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allows all origins

app.get('/', (req, res) => {
  res.send('CORS enabled for all origins!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

⚠️ **Warning**: `app.use(cors())` without options allows *any* domain. This is fine for testing but unsafe in production.

---

## 🎯 Restricting Access to Specific Origins
```js
const corsOptions = {
  origin: 'https://my-frontend.com', // Only allow this domain
  methods: ['GET', 'POST'],          // Restrict HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Restrict headers
  optionsSuccessStatus: 200          // Fix for legacy browsers
};

app.use(cors(corsOptions));
```

---

## 🔄 Enabling CORS for a Single Route
```js
app.get('/api/data', cors(corsOptions), (req, res) => {
  res.json({ message: 'Data with restricted CORS' });
});
```

---

## ⚡ Handling Dynamic Origins
You can allow origins dynamically (e.g., from a database):
```js
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  if (['https://trusted.com', 'https://partner.com'].includes(req.header('Origin'))) {
    corsOptions = { origin: true }; // Allow
  } else {
    corsOptions = { origin: false }; // Deny
  }
  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));
```

---

## 📝 Key Points to Remember
- **Browsers enforce CORS**: Tools like Postman or curl ignore it.
- **Preflight Requests**: For non-simple requests (like `PUT`, `DELETE`, or custom headers), browsers send an `OPTIONS` request first. The `cors` middleware handles this automatically.
- **Best Practice**: In production, always whitelist specific domains instead of using `*`.

# Query String(?) in URL(Also when we visit a worker through URL or any URL, always a GET request initialises)
When you see a URL like:

```
https://something.com/path?apiKey=12345
```

that little **`?`** is like saying:  
*"Hey website, I’m about to give you some extra info after this point."*

---

## Imagine it like this:
- The **main street address** is everything before the `?`.  
  Example: `https://something.com/path` → that’s where you’re going.

- The **stuff after the `?`** is like a note you hand to the person at the door.  
  Example: `apiKey=12345` → “Here’s my secret pass so you know it’s me.”

---

## Why it matters
- Websites often need extra details: maybe a password, a date range, or a filter.  
- The `?` starts that list of details.  
- Each detail looks like `name=value`.  
- If you have more than one, you connect them with `&`.  
  ```
  https://something.com/path?apiKey=12345&start=2024-01-01&end=2024-01-31
  ```

So in your case:

```
${polygonURL}?apiKey=${env.POLYGON_API_KEY}
```

means:  
- Go to the Polygon API address (`${polygonURL}`)  
- Then add a note saying: “My API key is whatever secret is stored in `env.POLYGON_API_KEY`.”

---

Think of the `?` as the **divider between the house address and the note you slip under the door**.  

# Node_env as .env variable(Production, test or local)

## 🔧 The Problem
- Helmet.js (a security middleware) works fine in production but breaks things in some of organization's dev setup.  
- Manually commenting/uncommenting code depending on environment is messy and error‑prone.

## 🌍 What `NODE_ENV` Is
- Just an **environment variable** — a string your app can read.  
- Common values:
  - `"development"` → local machine
  - `"production"` → deployed/live server
  - `"test"` → automated testing

## ✅ How It Fixes the Issue
Instead of editing code manually, you conditionally load Helmet:

```js
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}
```

- In **production**, Helmet runs.  
- In **development**, it’s skipped.  
- Same codebase, no manual toggling.

## 📦 The Bigger Picture
`NODE_ENV` is just one example of environment‑aware coding. Developers use it to:
- Switch between dev/prod databases
- Toggle logging verbosity
- Load different API keys
- Enable/disable features depending on context

---

**Concise Summary:**  
`NODE_ENV` is a simple environment variable that lets your app know whether it’s running in development, production, or testing. By checking it in code, you can automatically adjust behavior (like enabling Helmet only in production) without messy manual edits. It’s not magic — just a clean way to make your app smarter about its own context.  

# Sandboxed payment gateway
A **sandboxed payment gateway** is essentially a safe, simulated environment provided by payment gateway services (like Stripe, PayPal, Razorpay, etc.) where developers can test transactions without using real money. Think of it as a "practice mode" for payments.  

### 🔒 What “sandboxed” means
- **Sandbox = isolated test environment**  
  It mimics the real payment gateway but is completely separate from live financial systems.  
- **No real money involved**  
  Transactions in sandbox mode are fake, so you can experiment freely.  
- **Safe for debugging**  
  Developers can test integrations, error handling, and workflows without risking actual funds.

### ⚙️ Why it’s used
- **Integration testing**: Ensures your app or website correctly communicates with the payment gateway.  
- **Workflow validation**: You can simulate scenarios like successful payments, declined cards, refunds, chargebacks, etc.  
- **Developer training**: New engineers can practice without fear of breaking real transactions.  

### 📊 Example
Suppose you’re building an e-commerce site:
- In **sandbox mode**, you might “buy” a product using a test credit card number (like `4111 1111 1111 1111` for Visa).  
- The gateway responds with success/failure messages exactly as it would in production.  
- Once everything works, you switch to **live mode**, where real customer payments are processed.

👉 In short: sandboxed payment gateways are like flight simulators for online payments—realistic enough to prepare you, but risk-free because no actual money moves.  

# 🔍 Smoke Test Instructions

## 1. Purpose of a Smoke Test
- A **preliminary, high-level test** performed on a new build.
- Ensures **core functionalities work** and the app is **stable**.
- It’s **manual testing**, not a special framework—just you interacting with the site to confirm expected behavior.

---

## 2. First Task: Test the Error State
- **Goal:** Verify that if the AI service fails, the user sees the correct error message.
- **Steps:**
  1. Go to **Render’s environment variables**.
  2. Edit your **OpenAI API key**.
     - Change just **one character** (easy to revert later).
  3. Save → this triggers an **automatic redeploy**.
  4. Once redeployed, load the site.
  5. Input a dream (example given: *“I dreamt that the doctors looked inside my head and all they could find was ChatGPT”*).
  6. Click **Get Interpretation**.
  7. Confirm the error message appears:  
     **“AI service temporarily unavailable”**.
  8. Check **Render’s logs** at render.com.  
     - You should see an **OpenAI API error** explaining what went wrong.
     - Logs are the first place to look when debugging.

---

## 3. Fix the API Key
- Go back to **environment variables**.
- Restore the correct API key.
- Save → redeploy again.
- Confirm the site is back up and running.

---

## 4. Test Core Operations (CRUD)
- **Create:** Input a dream and get an AI interpretation.
- **Read:** Click **Read More** to ensure the dream and interpretation are visible.
- **Delete:** Delete the dream and confirm it returns to the initial state.
- If all three work, the smoke test is **passed**.

---

## 5. Extra Checks (for more sophisticated apps)
If the app had more features, you would also smoke test:
- **Sign-up and login flows**
- **Payment gateways**
- **Cancellation flows**
- **Responsiveness** (mobile/desktop)
- Any other **critical features** 

# Domain setup 
## 🏷️ Step 1: Buying a Domain
- You start by purchasing a domain name (like **dreamcatcher.com**) from a **registrar** (GoDaddy, Namecheap, Google Domains, etc.).
- This is just the “name” — it doesn’t yet know where your app lives.

---

## 🌐 Step 2: DNS (Domain Name System, its provided by the company from where you purchase the domain name)
DNS is like the **address book of the internet**. It tells browsers where to find your app when someone types your domain.

- **A Record** → Points your domain to an IPv4 address (like `123.45.67.89`).
- **AAAA Record** → Points to an IPv6 address (newer version of IP).
- **CNAME Record** → Points one domain to another (e.g., `www.dreamcatcher.com` → `dreamcatcher.com`).
- **TXT Record** → Used for verification, email security, or ownership checks.
- **NS Records** → Say who is in charge of DNS for your domain (your registrar or Cloudflare).

👉 You usually just **copy-paste** these values from your hosting platform (Render, Netlify, Vercel, etc.) into your registrar or DNS provider.

---

## 🖥️ Step 3: Connecting to Hosting
- Your hosting platform (Render in this case) needs to know which domain should serve your app.
- You tell Render: “This app should be available at **dreamcatcher.com** and **www.dreamcatcher.com**.”
- Render gives you DNS settings to paste into your registrar/DNS provider.

---

## ⏳ Step 4: DNS Propagation
- Changes don’t happen instantly. DNS servers around the world cache old values.
- It can take minutes to hours for your new domain to work everywhere.
- Tools like “DNS checker” let you see if propagation is complete.

---

## 🔒 Step 5: SSL (HTTPS)
- Once DNS is working, your host usually sets up an SSL certificate (often via **Let’s Encrypt**).
- This makes your site secure (`https://dreamcatcher.com` instead of `http://dreamcatcher.com`).

---

## ⚠️ Step 6: Canonical Domain & Redirects
Here’s the **big problem** your professor hinted at:  
You might end up with multiple valid URLs:
- `dreamcatcher.onrender.com` (Render’s free subdomain)
- `dreamcatcher.com`
- `www.dreamcatcher.com`

If all three are live:
- **Search engines get confused** → Google might split your ranking across them.
- **Analytics get messy** → Traffic is split between domains.

👉 The solution:
- Pick **one canonical domain** (usually the root: `dreamcatcher.com`).
- Redirect everything else (`www.dreamcatcher.com`, `dreamcatcher.onrender.com`) to that domain using **301 redirects**.
- Optionally, add a `<link rel="canonical" href="https://dreamcatcher.com">` tag in your HTML so search engines know which domain is the “official” one.

---

## 🧩 Mental Model Recap
1. **Buy a domain** → Registrar.
2. **Set DNS records** → Tell the internet where to find your app.
3. **Connect to hosting** → Render serves your app.
4. **Wait for propagation** → Internet updates.
5. **Enable SSL** → Secure HTTPS.
6. **Choose canonical domain** → Redirect others to avoid SEO/analytics issues.

---

💡 Think of it like setting up a new house:
- Buying the domain = choosing your house name.
- DNS = putting your house on the map.
- Hosting = the actual building where people visit.
- SSL = installing locks on the doors.
- Canonical domain = telling the post office “this is my official address, ignore the others.”

# Deployment
## ⚙️ What is Deployment?
- **Definition**: Deployment is the act of moving code from development/testing into production.
- **Includes**:
  - Packaging the application.
  - Configuring environments.
  - Running the application on servers/cloud.
  - Monitoring and updating after release.

---

## 🏗️ Deployment Types

### 1. **Monolithic Deployment**
- **Structure**: Entire application packaged and deployed as a single unit.
- **Pros**:
  - Simple to develop and deploy.
  - Easier debugging since everything is in one place.
- **Cons**:
  - Harder to scale specific parts.
  - Updates require redeploying the whole system.
- **Example Platforms**:
  - **Render** → supports monolithic apps.

---

### 2. **Microservices Deployment**
- **Structure**: Application broken into independent services, each deployed separately.
- **Pros**:
  - Scalability: scale only the needed service.
  - Flexibility: different services can use different tech stacks.
  - Faster updates: deploy only the changed service.
- **Cons**:
  - More complex infrastructure.
  - Requires strong monitoring and communication between services.
- **Example Platforms**:
  - **Render** → supports microservices.
  - **Cloudflare** → focuses on microservices (not monolith).

---

## 📊 Quick Comparison

| Aspect              | Monolith                          | Microservices                      |
|---------------------|-----------------------------------|------------------------------------|
| **Deployment Unit** | Single package                    | Multiple independent services      |
| **Scalability**     | Whole app must scale              | Scale specific services            |
| **Complexity**      | Simple setup                      | Complex orchestration              |
| **Flexibility**     | Limited                           | High (different tech per service)  |
| **Examples**        | Render (supports monolith)        | Render & Cloudflare (microservices)|

# Database issue(During redeployment, persistent disk is the solution but paid)

## 1. Redeployment Basics
- Fix code locally → push to GitHub → Render redeploys automatically.
- Simple workflow, but introduces a hidden problem with databases.

---

## 2. The Core Problem: Data Loss
- Render uses an **ephemeral file system** → resets on every redeploy.
- SQLite stores data in a local file (`database.sqlite`).
- Redeploy wipes the file → all user data disappears.

---

## 3. Solutions
- **Persistent Disk (paid)** → keeps data safe across redeploys.
- **Switch to PostgreSQL (chosen)** → external database unaffected by redeploy.

---

## 4. Why SQLite Struggles in Production
- **Write Locking** → one write locks the whole DB, blocking others.
- **No Clustering** → multiple servers = fragmented, inconsistent data.

---

## 5. Why PostgreSQL Works Better
- Handles **concurrent writes** smoothly.
- Supports **multiple servers** with one shared database.

---

## 6. When SQLite *is* Good
| Use Case     | Why It Works    |
|--------------|-----------------|
| Mobile apps  | Single user     |
| Desktop apps | One machine     |
| IoT devices  | Low concurrency |
| Simple blogs | Rare writes     |

**Rule of thumb:** *One machine, one user → SQLite is perfect.*

---

## 7. What’s Next
- Migration: SQLite → PostgreSQL.
- Introduction of **staging environments** (test changes safely before production).

---

✨ This lesson is essentially about **choosing the right database for the right context**. SQLite is lightweight and perfect for single-user apps, but PostgreSQL is the reliable choice for scalable, multi-user web applications.

# Staging(We use 2 deployments one for staging or testing, one for production with same database URL)

## The Problem
- Updating a live app directly risks breaking it for real users.

## Wrong Way ❌
- Push changes straight to `main` → untested code hits production immediately.

## Right Way ✅ — Staging
- **Staging = private copy of the app** that mirrors production.
- Test changes here before merging to `main`.

## Workflow Steps
1. Commit changes locally.
2. Create `staging` branch → push to GitHub.
3. Deploy a **staging server** on Render (points to `staging` branch).
4. Connect to PostgreSQL via environment variable (`DATABASE_URL`).
5. Test thoroughly on staging.
6. Fix issues, redeploy staging until stable.
7. Merge `staging` → `main` → Render redeploys production safely.

## Git Commands
```bash
git add .
git commit -m "switch to postgres"
git checkout -b staging
git push origin staging
```

Later, when ready:
```bash
git checkout main
git merge staging
git push origin main
```

## Render Setup
- Create PostgreSQL service → copy internal DB URL.
- Add `DATABASE_URL` env variable in both staging and production services.
- Deploy staging service (`dc-staging`) from `staging` branch.
- Production service (`dreamcatcher`) stays on `main`.

## Big Takeaway
- **Never push untested code to production.**
- `staging` branch = safe sandbox.
- `main` branch = live app for users.

---

This lesson is about **professional deployment discipline**: staging ensures reliability and protects users while you evolve your app.  

# 🛠 Logs, Rollbacks & Monitoring 

## 1. Logs
- Like `console.log` but on the server.
- Found in Render → Service → Logs tab.
- **Limitation**: wiped on redeploy, restart, or sleep.  
👉 Best for **short-term debugging**, not permanent tracking.

---

## 2. Rollbacks
- Instantly revert to a previous working deploy if new code breaks.
- Render → Service → Events tab → Rollback.  
👉 One click, no git commands needed.

---

## 3. Notifications
- **Email/Slack alerts** when:
  - Deploy fails (most critical)
  - Service goes down
  - Deploy succeeds
- Set globally or per service in Render dashboard.  
👉 Ensures you know problems right away.

---

## 4. Webhooks (Advanced)
- **Definition**: Event-driven HTTP callbacks → one system notifies another.
- Render sends JSON payloads on events (e.g., `deploy.failed`).
- Your server can automate responses (update status page, alert devs).  
👉 Powerful for CI/CD, monitoring, custom workflows.

---

## 5. Incident Management Tools
- **PagerDuty / Opsgenie** → professional-grade alert routing.
- Escalates issues, wakes on-call engineers at 3am if needed.  
👉 Overkill for solo projects, but standard in big teams.

---

## The Full Picture
```
Error in production
   ↓
Logs → see what happened
Rollback → revert instantly
Notifications → get alerted
Webhooks → automate response
PagerDuty → escalate to right person
```

---

## Minimum Setup for Your Projects
1. Enable **email notifications** for deploy failures.  
2. Know how to access **logs** for debugging.  
3. Remember **rollback** exists as a safety net.  

---

⚡ In short: **Logs help you see, rollbacks help you recover, notifications/webhooks help you react, and incident tools help teams respond fast.**

# 🌡 Health Endpoints

## What It Is
- A special URL (e.g. `/health`) that answers: *“Is the app working right now?”*
- Used by monitoring tools, load balancers, cloud platforms, and developers.

---

## How It Works
- Endpoint runs a minimal DB query (`SELECT 1`) to check connectivity.
- Returns JSON with:
  - `status` → ok/error
  - `database` → connected/disconnected
  - `uptime` → how long server has been running
- HTTP codes:
  - `200 OK` → all good
  - `503 Service Unavailable` → server up, DB down

---

## Example Responses
**Healthy:**
```json
{
  "status": "ok",
  "database": "connected",
  "uptime": 15.5
}
```

**Unhealthy:**
```json
{
  "status": "error",
  "database": "disconnected",
  "message": "connect ECONNREFUSED 127.0.0.1:5432",
  "uptime": 628.878
}
```

---

## Testing
- Locally: `curl http://localhost:3001/health`
- Production: `curl https://your-app.onrender.com/health`
- Pretty output: `| json_pp`

---

## Naming Conventions
| URL       | Style        | Common Use           |
|-----------|--------------|----------------------|
| `/health` | Balanced     | Most apps            |
| `/healthz`| Minimalist   | Google, Kubernetes   |
| `/status` | Rich info    | Large systems        |  
| `/ping`   | Bare minimum | Simple uptime checks |

---

## Bigger Picture
- Monitoring tools hit `/health` regularly.
- If DB fails → endpoint returns `503`.
- Alerts/webhooks trigger → engineers know instantly whether server or DB is the issue.

---

## For Your Projects
- Add a `/health` endpoint to Motrix / RAG app.
- Include DB check, uptime, and environment (`NODE_ENV`).
- Gives instant visibility into whether dependencies are alive.

---

⚡ **Takeaway:** A health endpoint is a lightweight but powerful diagnostic tool. It transforms vague “app down” alerts into precise, actionable insights.  

# ⚡ Process Exit Codes & Signals

## 1. Zombie Process Problem
- Crashes can leave **zombie processes** consuming resources.
- Use `process.exit(1)` on error to kill cleanly.

```js
process.exit(0)  // graceful shutdown
process.exit(1)  // error shutdown
```

---

## 2. Exit Codes
- **0** → normal exit ✅
- **1** → error exit ❌
- Hosting platforms (Render, Docker, Kubernetes) read these codes and restart/reschedule automatically.

---

## 3. Signals
Signals = messages sent to your process.

- **SIGTERM** → “Please shut down soon.”  
  - Sent by Render before redeploy, restart, or maintenance.  
  - Gives ~30s to clean up (close DB, finish requests).  
- **SIGKILL** → “Die now.”  
  - Instant kill, no cleanup possible.  
- **SIGINT** → triggered by `Ctrl+C` locally.  
  - Can be handled for graceful shutdown in dev.

---

## 4. Graceful Shutdown Pattern
```js
async function gracefulShutdown() {
  server.close()       // stop new requests
  await pool.end()     // close DB pool
  process.exit(0)      // exit cleanly
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
```

---

## 5. `/shutdown` Test Endpoint
- Special route to simulate SIGTERM manually:
```js
process.kill(process.pid, 'SIGTERM')
```
- Lets you test graceful shutdown without redeploying.

---

## 6. Logs Example
```
Manual shutdown triggered
SIGTERM received, shutting down gracefully
HTTP server closed
Database pool closed
```
Confirms the shutdown chain worked correctly.

---

## 7. Signal Flow
```
Redeploy/Maintenance → SIGTERM → graceful cleanup → exit(0)
If ignored → SIGKILL → instant death
Ctrl+C locally → SIGINT → optional graceful cleanup
```

---

## Why It Matters
- Without handling signals → corrupted sessions, broken DB connections, user errors.
- With graceful shutdown → requests finish, DB closes properly, zero user-facing errors during redeploy.

---

⚡ **Takeaway:** Exit codes tell the platform *why* your app stopped, signals tell your app *when* it’s about to stop. Handling them ensures clean, reliable shutdowns in production.
