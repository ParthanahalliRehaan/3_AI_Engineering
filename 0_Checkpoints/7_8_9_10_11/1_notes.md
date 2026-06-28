# CDN
## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CDN Example</title>
</head>
<body>
  <!-- <script src="script.js https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script> -->
    <!-- <script> tag doesn't allow 2 src's-->
  <!-- Load the CDN library first -->
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

  <!-- Then load your own script -->
  <script type="module" src="script.js"></script>

</body>
</html>
```

---

## script.js 

```javascript
// No import for marked — it's global from CDN

document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Example markdown string
  const markdownText = "# Hello World\n\nThis is **bold** text.";

  // Use the global variable exposed by CDN
  output.innerHTML = marked.parse(markdownText);
});
```

---

## 📌 Why This Works
- **CDN loads first** → exposes `marked` as a global variable.  
- **Your script runs after** → can safely call `marked.parse()`.  
- **No npm import** → browsers can’t resolve `node_modules` without a bundler.  

---

## 📊 Quick Comparison

| Approach   | How it Works                                         | Example                                                 |
|------------|------------------------------------------------------|---------------------------------------------------------|
| **CDN**    | Loads library from internet, exposes global variable | `<script src="cdn-url"></script>` then `marked.parse()` |
| **Local**  | File stored in your project                          | `<script src="/js/marked.js"></script>`                 |
| **Bundler**| npm install + Webpack/Vite compiles for browser      | `import { marked } from "marked";`                      |

---

## 🔑
1. Browsers cannot read `node_modules`.  
2. CDN provides browser‑ready libraries.   
3. CDN libraries expose global variables.    
4. Script loading order is critical.  
5. Also, Bundlers convert npm packages for browser use.

# Bundlers(Vite)
## 1. What is a Bundler
A bundler is a tool that takes multiple JavaScript files and dependencies, resolves imports, and produces optimized browser-ready code.  
Browsers cannot directly understand npm imports like:
```js
import { marked } from "marked"
```
Bundlers handle this and output usable JavaScript.

---

## 2. Why Bundlers Exist
Modern apps use many files and npm packages. Without bundlers, browsers fail to resolve modules (e.g., `Failed to resolve module specifier "marked"`).  
Bundlers solve this by combining files and preparing them for the browser.

---

## 3. Main Purpose
Bundlers:
1. Resolve dependencies  
2. Combine files  
3. Optimize code  
4. Produce browser-ready output  

**Flow:** Source → Analyze imports → Resolve deps → Merge → Optimize → Bundle → Browser loads

---

## 4. Example Import
Your code:
```js
import { marked } from "marked"
```
Bundler internally resolves to something like:
```js
import { marked } from "/node_modules/marked/lib/marked.js"
```
Then merges into the final bundle.

---

## 5. Common Bundlers
- **Webpack** – older, widely used  
- **Vite** – modern, fast (recommended)  
- **Parcel** – zero-config  
- **Rollup** – great for libraries  

---

## 6. Bundler vs CDN
- **CDN:** Load libraries via `<script src="cdn-link"></script>`  
- **Bundler:** Install locally (`npm install marked`) and bundle for browser use.

---

## 7. Bundler: Advantages vs Disadvantages

| Advantages                                   | Disadvantages                      |
|----------------------------------------------|------------------------------------|
| Works with npm packages                      | Requires build step                |
| Automatic dependency resolution              | Needs configuration                |
| Code optimization (minify, tree-shake, etc)  | Adds tooling complexity            |
| Faster loading in browsers                   | Extra step in development process  |
| Supports modern JavaScript features          | Learning curve for beginners       |


## 8. Analogy
Without bundler → ship items separately  
With bundler → pack everything into one box for delivery

---

## 9. Bundler Flow
Source → Analyze imports → Dependency graph → Merge & optimize → Output bundle → Browser loads

# Vite with node(Deleted the project, so refer from the new project)

### 🛠️ 1. Install Vite
First, make sure you have Node.js (v18+ recommended) installed. Then in your project folder:

```bash
npm create vite@latest
```

- It will ask for a project name → type something like `my-app`.
- Choose a framework (React, Vue, Svelte, etc.).
- Choose a variant (TypeScript or JavaScript).

Then:

```bash
cd my-app
npm install
```

---

### 🚀 2. Run the Dev(frontend with npm packages bundled) Server
Start Vite’s dev server:

```bash
npm run dev
```

This will serve your frontend at `http://localhost:5173`.

---

### 🔧 3. Configure Proxy (if you have a backend)
If your frontend needs to talk to a backend API, edit `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000' // backend server
    }
  }
})
```

Now, any request to `/api/...` from your frontend will be forwarded to your backend running on port 3000.

---

### ⚡ 4. Run Backend Separately
If you have a backend (like Express):

```js
// server.js
import express from 'express'
const app = express()

app.get('/api/gift-genie', (req, res) => {
  res.json({ message: 'Hello from backend!' })
})

app.listen(3000, () => console.log('Backend running on http://localhost:3000'))
```

Run it with:

```bash
node server.js
```

---

### 🔄 5. Run Both Together
To avoid running two commands separately, install `concurrently`:

```bash
npm install concurrently --save-dev
```

Update `package.json`:

```json
"scripts": {
  "frontend": "vite",
  "backend": "node server.js",
  "dev": "concurrently \"npm run frontend\" \"npm run backend\""
}
```

Now just run:

```bash
npm run dev
```

Both frontend and backend will start together.

---

## 📂 Project Structure
```
project
│
├── client
│   ├── index.html
│   ├── script.js
│   ├── tool.mjs
│   ├── css
│   │   └── style.css
│   └── assets/*
│      
│
├── server
│   └── server.js
│
├── vite.config.js
└── package.json
```

---

## ⚠️ Problems & Fixes

### Problem 1: Marked Library Failed with CDN
- **Reason:** CDN exposes globals, but code used npm-style imports.
- **Wrong:**
  ```js
  import { marked } from "marked"
  ```
- **Fix:** Install locally and bundle.
  ```bash
  npm install marked
  ```
  ```js
  import { marked } from "marked"
  ```

---

### Problem 2: Browser Cannot Resolve npm Packages
- **Error:** `Failed to resolve module specifier "marked"`
- **Reason:** Browsers don’t understand `node_modules`.
- **Fix:** Use **Vite bundler** to convert npm deps → browser-ready JS.

---

### Problem 3: API Requests Failed (404)
vite runs frontend as it doesn't run server(backend).So, must run server manually(Seperately) And then must config for port mismatch.
- **Error:** `POST http://localhost:5173/api/gift-genie 404`
- **Reason:** Frontend (5173) vs Backend (3000) port mismatch 
- **Fix:** Add proxy in `vite.config.js`.

```js
import { defineConfig } from "vite"

export default defineConfig({
  root: "client",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
})
```

---

### Problem 4: Proxy Ignored
- **Reason:** Script used `"vite client"`, overriding config(package.json).
- **Fix:** Change script to `"vite"` so config is respected.

---

## ✅ Final Workflow

1. **Start backend server**
   ```bash
   node server/server.js
   ```
   → Node server on `http://localhost:3000`

2. **Start frontend server**
   ```bash
   npm run dev
   ```
   → Vite on `http://localhost:5173`

3. **User opens frontend**
   → `http://localhost:5173`

4. **Form submission**
   → `fetch("/api/gift-genie")`

5. **Request flow**
   - Browser → Vite (5173) → Proxy → Node (3000) → OpenAI API
   - Response travels back same path

6. **Frontend renders**
   ```js
   const data = await res.json()
   outputContent.innerHTML = marked.parse(data.reply)
   ```

---

## 🌐 Network Flow Diagram

Browser (5173)  
   ↓  
Vite Dev Server  
   ↓  
Proxy Rule (/api)  
   ↓  
Node Server (3000)  
   ↓  
OpenAI API  
   ↓  
Response JSON  
   ↓  
Vite → Browser  
   ↓  
Marked → HTML → Page Updates  

---

## 🔑 Key Concepts (The 20%)
1. Browsers cannot resolve npm modules.  
2. Bundlers (Vite) convert npm deps → browser code.  
3. Vite runs frontend dev server.  
4. Node runs backend API server.  
5. Different ports require proxy.  
6. Vite proxy forwards `/api` → Node.  
7. Response flows back same path.  
8. Frontend receives JSON → renders with `marked`.

---

## 🏗️ Final Architecture

**Frontend Server**  
- Vite → `http://localhost:5173`

**Backend Server**  
- Node → `http://localhost:3000`

**Communication Flow**  
Browser → Vite → Proxy → Node → OpenAI API → Response → Browser UI Updated

# DOMPurify(Used in new project)
## ⚠️ Core Idea
If you take AI output and directly insert it into the DOM after converting Markdown → HTML, malicious scripts can run.  
This vulnerability is called **Cross‑Site Scripting (XSS)**.  
**Solution:** Always sanitize HTML before inserting it.

---

## 🛠️ Unsafe vs Safe Pipeline

**Unsafe:**
```
Markdown → HTML → DOM → Browser executes scripts
```

**Safe:**
```
Markdown → HTML → SANITIZE (remove <script>) → DOM
```

---

## 🍴 Analogy — Restaurant Kitchen
- Customer ingredients → AI Markdown output  
- Cooking → Markdown → HTML conversion  
- Serving food → Insert HTML into DOM  
- Poison → `<script>` tag  
- Food inspection → Sanitization  

**Rule:** Never serve food without inspection.  
**Mapping:** Never insert unsanitized HTML into the DOM.

---

## 🔍 Why Browsers Execute HTML
- `<b>Hello</b>` → renders bold text  
- `<script>alert("Hacked")</script>` → executes JavaScript  

So raw HTML is treated as instructions, not just text.

---

## 📚 Common Sanitization Libraries
- **DOMPurify**  
- **sanitize‑html**  
- `marked` + sanitizer combo  

---

## ❓ Key Doubts Answered
1. **Is Markdown safe?** → No, it can contain raw HTML.  
2. **Why would AI output scripts?** → User prompts can inject them.  
3. **Why sanitize HTML instead of Markdown?** → Browser executes HTML, not Markdown.  
4. **What’s the vulnerability called?** → **XSS (Cross‑Site Scripting)**, a top OWASP risk.

## Coding example
### index.html
```html
<script src="https://cdn.jsdelivr.net/npm/dompurify/dist/purify.min.js"></script>
```
### script.js
```js
outputContent.innerHTML = DOMPurify.sanitize(marked.parse(data.reply)) || DOMPurify.sanitize("No response");
```

# UI/UX
## 🌐 What is UX?
- **UX** = **User Experience**
- Focuses on how a person *feels* when interacting with a product, website, or app.
- Covers:
  - Ease of use
  - Accessibility
  - Efficiency
  - Emotional impact

👉 Example: A food delivery app that’s smooth, clear, and reliable = good UX.  
Buggy, slow, or confusing = poor UX.

---

## 🎨 What is UI/UX?
- **UI** = **User Interface** → visuals & interactive elements (buttons, menus, layouts, colors).
- **UX** = **User Experience** → overall journey & usability.

They work together:
- UI = what you *see and click*.
- UX = how you *feel and succeed*.

---

## 🛠️ Is UI/UX just HTML, CSS, JS?
No — those are **tools**, but UI/UX is broader.

### UI/UX involves:
- Design principles (layout, color theory, typography)
- Prototyping tools (Figma, Sketch, Adobe XD)
- Research & testing (user interviews, A/B testing)
- Front-end implementation (HTML, CSS, JS)
- Accessibility standards (ARIA roles, contrast ratios)
- Information architecture (structuring content clearly)

👉 Analogy:  
HTML/CSS/JS = *bricks and mortar*.  
UI/UX = *blueprint and interior design*.

---

## ⚡ Quick Analogy
- **UI**: Steering wheel, dashboard, buttons in a car.  
- **UX**: How smooth the ride feels, how easy parking is, and whether the journey is enjoyable.

## Chunks Streaming(Look at projects code)
