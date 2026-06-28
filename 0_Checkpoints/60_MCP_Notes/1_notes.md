# MCP(Intro)
## 🌐 Model Context Protocol (MCP)

### 🔑 What It Is
- **MCP = Model Context Protocol**  
- An **open standard** that defines how apps provide **context** (extra info) to large language models (LLMs).

### ⚡ Why It Matters
- **LLMs lack recent knowledge** → training data is outdated.  
- **Context is costly** → feeding huge datasets burns tokens.  
- **MCP fixes this** → delivers *just the right data, at the right time*.

### 🔌 Analogy
- Like **USB-C for AI**: one standard way to plug in tools & data sources (APIs, files, search, calendars).

---

## 🏗️ How MCP Works
- **Client–Server architecture**:
  - **MCP Client** → inside your app (IDE, chat, etc.).  
  - **MCP Servers** → connect to external sources (weather API, Google search, local files).  
- Servers fetch, package, and send **context** back to the model.  
- Multiple servers can run at once:
  - Weather server  
  - Local files server  
  - Search server  

---

## 🧩 Recap
- **MCP = Model Context Protocol**  
- **Purpose** → Give LLMs live tools & data.  
- **Solves** → Outdated knowledge + expensive context windows.  
- **How** → Client-server setup.  
- **Benefit** → Efficient, modular, plug-and-play access to external data.  

---

## 🔄 Single Client, Multiple Servers
- You only need **one MCP client** in your app.  
- That client can connect to **many MCP servers** simultaneously.  
- Each server specializes in a data source, but the client unifies them for the LLM.  
- Result → The model gets a **coherent, fresh context stream** without bloating its token window.

# Code(Zod, node-fetch And @modelcontextprotocol/sdk)
## 🧩 What is Zod?
- **Definition** → Zod is a **TypeScript-first schema validation library**.  
- **Purpose** → Define the *shape* of your data and validate inputs automatically.  
- **Why in MCP** → AI models may send unpredictable inputs. Zod ensures tools only accept valid, expected data.

### Example
```ts
import { z } from "zod";

const citySchema = z.string().describe("City name (New York or London)");

citySchema.parse("London"); // ✅ valid
citySchema.parse(123);      // ❌ error
```

👉 Zod acts as a **gatekeeper**: only valid inputs pass through.

---

## 🏗️ MCP Server Basics
Think of an MCP server as a **toolbox**:
- **Server instance** → the toolbox itself.  
- **Tools** → individual functions inside (e.g., “get weather data”).  
- **Resources & Prompts** → extra features you can add later.  

---

## ⚙️ Step-by-Step: Tool
```ts
// server.ts
import { MCPServer } from "@modelcontextprotocol/sdk";
import { z } from "zod";
import fetch from "node-fetch"; // for remote API calls

// 1. Create the server instance
const server = new MCPServer({
  name: "multi-source-tool",
  version: "1.0.0",
});

// 2. Local helper function
async function getLocalData() {
  return { source: "local", message: "This is local mock data" };
}

// 3. Remote helper function
async function getRemoteData(endpoint: string) {
  const res = await fetch(endpoint);
  const json = await res.json();
  return { source: "remote", data: json };
}

// 4. Register a single tool that can do both
server.tool(
  {
    name: "multiConnectorTool",
    description: "Fetch data either from local or remote source",
    inputSchema: z.object({
      mode: z.enum(["local", "remote"]).describe("Choose data source"),
      endpoint: z.string().optional().describe("Remote API endpoint if mode=remote"),
    }),
  },
  async ({ mode, endpoint }) => {
    try {
      let result;
      if (mode === "local") {
        result = await getLocalData();
      } else {
        if (!endpoint) throw new Error("Endpoint required for remote mode");
        result = await getRemoteData(endpoint);
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (err: any) {
      return {
        content: [
          {
            type: "text",
            text: `Error: ${err.message}`,
          },
        ],
      };
    }
  }
);

```

---

## 🔍 Breaking It Down
- **`MCPServer`** → starts the toolbox.  
- **`server.tool(...)`** → registers a tool inside.  
- **`z.object({ city: z.string() })`** → schema: tool expects a string field `city`.  
- **Handler function** → runs when tool is called, fetches weather, returns JSON.  
- **Error handling** → invalid city returns a clear error message.  

---

## 🧠 Why This Matters
- Without Zod → invalid inputs (`city: 123`) would break your tool.  
- With Zod → inputs are validated, errors are caught early.  
- Result → MCP server becomes **robust, predictable, and safe**.  

---

👉 In short:  
**Zod = input gatekeeper**  
**MCP Server = toolbox of tools**  
**Transport layer = doorway for clients** 

# MCP Server VS Client
## 🏗️ The Three Players in MCP
Think of MCP as a triangle with three sides:

1. **MCP Server (your weather fetcher)**  
   - This is where the *tools* live.  
   - Example: You built a tool called `getWeatherDataByCityName`.  
   - Servers expose tools, resources, and prompts that can be called.

2. **MCP Client (the connector)**  
   - This is the piece of software that knows how to talk to MCP servers.  
   - It loads servers, understands their tools, and makes them available.  
   - Example: An IDE (like VS Code) or a notebook environment could act as the client.  

3. **AI Model (the brain)**  
   - This is the reasoning engine (like Copilot, GPT, Claude, etc.).  
   - It doesn’t directly know about your weather tool. Instead, it asks the client:  
     *“Hey, do you have a tool that can fetch weather data?”*  
   - The client then calls the MCP server’s tool and returns the result back to the AI.

---

## 🔄 How They Work Together
- **AI**: “I need weather info for London.”  
- **Client (hosted in IDE, app, etc.)**: “Okay, I’ll call the MCP server tool `getWeatherDataByCityName` with input `London`.”  
- **Server**: Runs the tool, validates input with Zod, returns JSON weather data.  
- **Client**: Passes the result back to the AI.  
- **AI**: Uses the result in its reasoning and replies to the user.

So:  
- **Server = toolbox**  
- **Client = connector/dispatcher**  
- **AI = brain that decides when to use which tool**

---

## 🖼️ Analogy
Imagine you’re in an IDE (like VS Code):  
- The IDE is the **host** (MCP client).  
- Your weather server is a **plugin** (MCP server).  
- Copilot (AI) is the **assistant** that says: “I’ll use that plugin to answer your question.”

---

## ⚡ Why This Separation Matters
- **Security**: The AI doesn’t directly run arbitrary code; the client controls what servers/tools are available.  
- **Flexibility**: You can plug the same MCP server into different hosts (IDE, notebook, CLI).  
- **Scalability**: Multiple servers can be registered, and the AI can pick the right one at runtime.

# Other
## 🌐 What is a **URI** in MCP resources?
- **URI (Uniform Resource Identifier)** is like a unique address or name for the resource.  
- In your example:  
  ```js
  'flights://airports'
  ```
  This tells the MCP server: *“Here’s a resource called `airports` under the `flights` namespace.”*  
- Think of it like a file path or API endpoint — it’s how the AI or client knows which resource to request.

---

## 📄 What is a **static resource**?
- A **static resource** is data that doesn’t change dynamically — it’s predefined and returned as-is.  
- In your snippet, the resource always returns the same list of airports (`JFK`, `LHR`, `SFO`).  
- Static resources are useful for constants, reference lists, or configuration data.

---

## 🧾 What is **MIME type**?
- **MIME type** describes the format of the data being returned.  
- Example:  
  - `text/plain` → plain text  
  - `application/json` → JSON data  
  - `image/png` → PNG image  
- This helps the client (AI or app) understand how to parse the response.

---

## ⚙️ How do **tools** work in MCP?
- **Tools** are like functions or actions the AI can call on the MCP server.  
- Each tool is backed by a resource or an endpoint.  
- Workflow:
  1. The **AI host** (like Copilot) sends a request to the MCP server.  
  2. The server looks at the **URI** to figure out which resource/tool to use.  
  3. The resource executes its function (static data, dynamic query, etc.).  
  4. The result is sent back to the AI.  

So in your example:
- The AI asks: *“Give me supported airports.”*  
- MCP server sees the request is for `flights://airports`.  
- It runs the resource function, returns the airport list as `text/plain`.  
- The AI then uses that data in its response.

---

✅ **In short:**  
- **URI** = unique identifier (like an address).  
- **Static resource** = fixed data returned by the server.  
- **MIME type** = format of the response.  
- **Tools in MCP** = actions/resources the AI can call, resolved by the server using the URI.
##Great question, Rehaan — let’s break this down step by step so you get a clear mental model of **what an MCP server is, how to create one, and what the main building blocks are**.

---

## 🌐 What is an MCP Server?(Proper detailed explanation)
An **MCP server** is basically a **toolbox** that sits outside the LLM.  
- It exposes **tools, resources, and prompts** that the LLM can call.  
- It connects to the LLM via a **transport layer** (like STDIO, HTTP, or WebSocket).  
- The server doesn’t generate answers itself — it provides **context/data** that the LLM uses to answer better.

Think of it like this:  
- **LLM** = the brain.  
- **MCP server** = the hands and eyes (fetching data, running tools).  
- **Transport** = the nerves that connect them.

---

### 🧰 Core Building Blocks of an MCP Server

#### 1. **Tools**
- Functions the LLM can call.  
- Example: `getWeatherDataByCityName`.  
- Tools always have:
  - **Name** → identifier.  
  - **Description** → what it does.  
  - **Input schema** → validated by **Zod**.  
  - **Handler function** → the actual logic.

👉 Tools = “actions” the AI can perform.

---

#### 2. **Resources**
- Think of resources as **data endpoints** the server exposes.  
- Example: `weather://cities` → a resource listing supported cities.  
- Resources are like **static or dynamic datasets** that the LLM can query.  
- They’re useful when you want the model to know “what’s available” without calling a tool first.

👉 Resources = “data shelves” the AI can browse.

---

#### 3. **Prompts**
- Predefined **prompt templates** the server can provide.  
- Example: A “summarize weather report” prompt.  
- Prompts help standardize how the LLM asks questions or formats answers.

👉 Prompts = “ready-made instructions” the AI can reuse.

---

#### 4. **Transport**
- The **communication channel** between the server and the client.  
- Common transport: **STDIO** (standard input/output).  
- Others: HTTP, WebSocket.  
- Without transport, your server is just sitting idle — transport is the “doorway” that lets clients connect.

👉 Transport = “the wiring” that connects toolbox to the brain.

---

### 🛠 How to Create an MCP Server (Simplified Steps)

1. **Install SDK**  
   ```bash
   npm install @modelcontextprotocol/sdk zod tsx
   ```

2. **Create `server.ts`**  
   - Import `Server` and `StdioServerTransport`.  
   - Define your server instance.  
   - Register tools/resources.  
   - Connect via transport.

3. **Add Scripts in `package.json`**  
   ```json
   "scripts": {
     "start": "tsx server.ts"
   }
   ```

4. **Run the Server**  
   ```bash
   npx tsx server.ts
   ```

5. **Connect a Client**  
   - The MCP client (like an IDE or chat app) connects to your server.  
   - Now the LLM can call your tools/resources.

---

### 🧩 Recap
- **MCP Server** = toolbox for the LLM.  
- **Tools** = actions (functions).  
- **Resources** = data shelves.  
- **Prompts** = reusable instructions.  
- **Transport** = wiring that connects server ↔ client.  

---

👉 So when you build your **weather MCP server**, you’re basically saying:  
- “Here’s a toolbox with a weather-fetcher tool.”  
- “Here’s a resource listing supported cities.”  
- “Here’s a transport so clients can connect.”  

# How to setup a MCP Server(SDIO)
## 🛠 Step 1: Update `server.ts`
At the top of your file, import the transport:

```ts
import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/transport/stdio";
```

---

## 🛠 Step 2: Define the async init function
Inside `server.ts`, add:

```ts
async function init() {
  // Create the server instance
  const server = new Server({
    name: "weather-mcp-server",
    version: "1.0.0",
  });

  // Define the transport
  const transport = new StdioServerTransport();

  // Connect the server to the transport
  await server.connect(transport);

  // Print helpful status messages
  console.error("✅ Weather MCP Server is running...");
  console.error("🛠 Tools registered: weather tool");
  console.error("📦 Resource URI: weather://cities");
  console.error("🌍 Supported cities: London, Paris, New York");
  console.error("🚀 Server ready to accept requests!");
}

// Run init and catch errors
init().catch(console.error);
```

👉 Notice we use `console.error` instead of `console.log` so we don’t interfere with the STDIO protocol messages.

---

## 🛠 Step 3: Update `package.json`
Add `"type": "module"` at the top level, and in the `"scripts"` section include:

```json
"scripts": {
  "start": "tsx server.ts"
}
```

---

## 🛠 Step 4: Install dependencies
Run these commands in your terminal:

```bash
npm install
```

---

## 🛠 Step 5: Run the server
Now start your MCP server:

```bash
npx tsx server.ts
```

If everything is correct, you’ll see your status messages confirming the server is live and connected via STDIO.

# SDIO
## 🔌 What is STDIO transport?
- **STDIO** stands for **Standard Input/Output**.  
- It’s the simplest way for two programs to talk: one writes text to *stdout* (standard output), the other reads it; one writes to *stdin* (standard input), the other reads it.  
- MCP servers use STDIO as a transport layer so they can communicate with clients (like Copilot or other tools) without needing sockets, HTTP, or extra networking setup.  
- Think of it as a “pipe” between your server and the client — messages flow back and forth in JSON format.

---

## 🖥️ Why `console.error` instead of `console.log`?
- The **protocol messages** (the JSON data exchanged between server and client) go through **stdout**.  
- If you print human-readable logs with `console.log`, you’d pollute that stream and break the protocol.  
- By using `console.error`, you send logs to **stderr**, which is separate and safe for debugging.

---

## ⚙️ What the `init` function does
1. **Creates the server** → `new Server({ name, version })`  
   This registers your MCP server with metadata (name, version).
2. **Defines the transport** → `new StdioServerTransport()`  
   This tells the server to use STDIO pipes for communication.  
3. **Connects server to transport** → `await server.connect(transport)`  
   This is where the handshake happens — the server is now “listening” for requests.  
4. **Prints status messages** → helpful logs so you know it’s alive.

---

## 📦 Why `"type": "module"` in `package.json`?
- Node.js defaults to CommonJS (`require` syntax).  
- MCP SDK uses **ES Modules** (`import` syntax).  
- Adding `"type": "module"` tells Node to interpret your code as ES Modules, so `import { Server } ...` works.

---

## 🚀 Running the server
When you run:
```bash
npx tsx server.ts
```
- `tsx` compiles and runs your TypeScript file directly (no need for `tsc` + `node`).  
- Your server starts, connects via STDIO, and waits for a client to send requests.  
- The logs you see (`✅ Weather MCP Server is running...`) confirm it’s ready.

---

✨ In short:  
- **STDIO transport** = the communication channel.  
- **console.error** = safe logging.  
- **init function** = setup + connect.  
- **package.json type** = ES module compatibility.  
- **tsx** = easy TypeScript runner.

# MCP Inspector(Also others)
## 🧩 Key Jargon Explained
- **MCP (Model Context Protocol):** A standard way for AI apps (like Claude, Cursor, VS Code, etc.) to connect to external tools or data sources.
- **MCP Server:** Think of this as your toolbox. It contains tools (functions) and resources (data) that the AI can call.
- **MCP Client (or Agent):** The helper inside the AI app that knows how to talk to your MCP server safely and predictably.
- **MCP Inspector:** A special testing client with a web UI. It lets you connect to your MCP server, see what tools/resources are available, send test requests, and debug responses — all without involving an AI model.
- **Transport Type / Command / Arguments:** These are the settings that tell the client how to run and connect to your server. For example, using `npx tsx server.ts` to run a TypeScript server.

---

## ⚙️ Step-by-Step Setup Guide

### 1. Run Your MCP Server
- Make sure your **Weather MCP server** is running.
- Example command (inside your project folder):
  ```bash
  npx tsx server.ts
  ```

### 2. Launch MCP Inspector
- In a new terminal window, run:
  ```bash
  npx @model-context-protocol/inspector@latest
  ```
- This opens a local web UI in your browser.

### 3. Connect Inspector to Your Server
- In the Inspector UI:
  - Choose **transport type** (usually `npx`).
  - Set the **command** (`npx`).
  - Add **arguments** (`tsx server.ts` with the full path to your project).
- Once connected, you’ll see your tools/resources listed.
- Try calling your tool manually:
  - Example: Ask for weather in London → should return the mock data you coded.

### 4. Debugging
- On the left panel, you’ll see which tool is being called (e.g., `getWeatherDataByCityName`).
- This helps confirm your server works correctly before involving an AI.

### 5. Connect to Claude Desktop
- Open **Claude Desktop → Settings → Developer tab**.
- Edit `config.json` and register your server:
  ```json
  {
    "mcpServers": {
      "weatherMCP": {
        "command": "npx",
        "args": ["tsx", "/full/path/to/server.ts"]
      }
    }
  }
  ```
- Save and restart Claude Desktop.

### 6. Test in Claude
- In chat, ask:
  ```
  What's the weather in London?
  ```
- Claude will use the MCP client to call your server’s tool and return the result.

---

## 🌟 Important Notes
- **Inspector first, then host app:** Always debug with Inspector before connecting to Claude or Cursor.
- **Other AI apps:** The same server can be connected to Cursor AI, VS Code, Windsurf, ChatGPT, etc.
- **Example servers:** MCP docs provide ready-made servers (GitHub, Slack, etc.) so you don’t always need to build your own.
