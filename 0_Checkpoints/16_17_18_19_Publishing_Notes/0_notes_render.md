# How to deploy a Node project(Python project requires a requirements.txt, but here package.json)

## 1. Initialize Project
```bash
mkdir my-app && cd my-app
npm init -y
```

## 2. Install Dependencies
```bash
npm install express
```
👉 Express is a **runtime dependency** (needed in production).

## 3. Create Entry Point (`index.js`)
```js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Render + GitHub!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 4. Update `package.json` Scripts
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
- `start` → production entry point  
- `dev` → local development with Nodemon  

## 5. Create `.gitignore`
```bash
cat > .gitignore << 'EOF'
node_modules
.env
EOF
```

## 6. Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

---

## 🛠️ Build vs Start in Render

### Build Command
- Runs **once during deployment**.  
- Purpose: prepare the app for production.  
- Example:
  ```bash
  npm ci --omit=dev && npm run build
  ```
👉 **Build = baking the cake.**

### Start Command
- Runs **every time the service boots** (after build).  
- Purpose: launch the app using the already-built code.  
- Example:
  ```bash
  npm start
  ```
👉 **Start = serving the cake.**

---

## 📦 Why `npm ci --omit=dev`(If some thing not want to omit, shift to dependancies from devdependancies)

- **`npm ci`** → clean, reproducible install using `package-lock.json`.  
- **`--omit=dev`** → skips devDependencies (Nodemon, ESLint, Jest).  

⚠️ **Caution**: Build tools (Webpack, Vite, TypeScript compilers) may be in devDependencies but are required at build time. Don’t omit them if your app needs compilation.

---

## 🚀 Typical Render Workflow

1. **Build Command**  
   ```bash
   npm ci --omit=dev && npm run build
   ```
   - Installs only production dependencies.  
   - Compiles/transpiles the app for deployment.  

2. **Start Command**  
   ```bash
   npm start
   ```
   - Boots the server using the compiled code.  

---

## ✅ After Pushing Code: Render Setup

### 7. Configure Render
- Go to [Render Dashboard](https://render.com)  
- Click **New Web Service**  
- Connect your GitHub repo  
- Select branch: `main`  
- Build command:  
  ```bash
  npm ci --omit=dev
  ```
- Start command:  
  ```bash
  npm start
  ```

### 8. Add Environment Variables
In Render dashboard → **Environment** → Add variables:
```
OPENAI_API_KEY=sk-xxxx
DATABASE_URL=postgres://...
```
👉 Names must match exactly what your code expects (`process.env.OPENAI_API_KEY`).

### 9. Deploy
- Render automatically builds and deploys your app.  
- Every push to `main` triggers a redeploy.  

---

## ⚡ Quick Recap
- **index.js** → Express server  
- **package.json** → `start` script for Render  
- **.gitignore** → keeps secrets & node_modules out of GitHub  
- **Build vs Start** → bake once, serve many times  
- **Render** → handles build, env vars, hosting  
- **Best practice** → `npm ci --omit=dev` for clean, production‑ready installs  

# How to deploy a database in render(later how to use it in any projects, in RAG project can see implementation)
## 🗄️ Deploying a Database on Render

### 1. Create a Database
- Go to [Render Dashboard](https://render.com)
- Click **New + → PostgreSQL**
- Fill in:
  - **Name**: e.g., `my-app-db`
  - **Region**: same as your web service for low latency
  - **Plan**: Free or paid depending on usage

Render will provision a managed PostgreSQL instance.

---

### 2. Get Connection Details
Once created, Render gives you:
- **Database URL** (looks like `postgres://user:password@host:port/dbname`)
- **Host, Port, User, Password, Database name**

You’ll use these in your app’s environment variables.

---

### 3. Add Environment Variables
In your **Web Service → Environment**:
```bash
DATABASE_URL=postgres://user:password@host:port/dbname
```

This way your Node.js app can connect securely without hardcoding secrets.

---

### 4. Install PostgreSQL Client in Node.js
```bash
npm install pg
```

---

### 5. Connect in Your Code
Example `index.js`:
```js
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Create a pool using DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // required for Render
});

app.get('/', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.send(`Hello! DB time is: ${result.rows[0].now}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## 🔗 Using the Database in Projects
- **CRUD Apps**: Store users, posts, etc. with SQL queries.
- **RAG (Retrieval-Augmented Generation)**:
  - Store embeddings in a table (e.g., `documents` with `id`, `text`, `embedding`).
  - Use a vector search library (like `pgvector` extension in PostgreSQL).
  - Query relevant chunks from DB → feed into your AI model.

Example table for RAG:
```sql
CREATE EXTENSION IF NOT EXISTS vector;
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  content TEXT,
  embedding vector(1536) -- dimension depends on your model
);
```

Then in Node.js:
```js
const result = await pool.query(
  'SELECT content FROM documents ORDER BY embedding <-> $1 LIMIT 5',
  [userEmbedding]
);
```

---

## ⚡ Quick Recap
- **Render PostgreSQL** → managed DB service  
- **DATABASE_URL** → connect via env vars  
- **pg library** → Node.js client  
- **pgvector** → enables semantic search for RAG projects  

