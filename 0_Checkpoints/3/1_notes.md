# Status Codes(For more info about HTTP go to https://github.com/ParthanahalliRehaan/2_JS_Node/blob/main/1_Node_Docs/0_HTTPBasics_Routing_APIBasics.txt)
## 🌐 What status codes are
- They’re **3‑digit numbers** returned by a web server in response to a client request (like when your browser loads a page).
- They indicate whether the request was successful, redirected, failed, or encountered an error.

## 📊 Categories
| Code Range | Category      | Meaning                                                       |
|------------|---------------|---------------------------------------------------------------|
| **1xx**    | Informational | Request received, continuing process                          |
| **2xx**    | Success       | Request was successfully received and processed               |
| **3xx**    | Redirection   | Client must take additional action (e.g., follow another URL) |
| **4xx**    | Client Error  | Problem with the request (e.g., not found, unauthorized)      |
| **5xx**    | Server Error  | Server failed to fulfill a valid request                      |

# ES6 Modules(https://www.youtube.com/watch?v=fl-_6d18DN0) for understanding tool.mjs, JS Modules types

# APIs
**A RESTful API is a web service built on the principles of REST (Representational State Transfer), using HTTP methods like GET, POST, PUT, and DELETE to interact with resources. Not all APIs are RESTful—many claim to be but don’t follow the strict REST constraints.**
---

## 🔑 What is a RESTful API?
- **Definition**: A RESTful API is an API that adheres to REST principles—client-server separation, statelessness, cacheability, layered architecture, and a uniform interface.
- **Resources**: Everything is treated as a resource (e.g., `/users/123`).
- **HTTP Methods**:
  - **GET** → Retrieve data
  - **POST** → Create new data
  - **PUT/PATCH** → Update existing data
  - **DELETE** → Remove data
- **Responses**: Typically JSON, with standard HTTP status codes (200 OK, 404 Not Found, 201 Created, etc.).

---

## 🛠️ How to Build One
1. **Model resources as nouns**  
   Example: `/users`, `/users/123/orders` instead of `/getUserOrders`.
2. **Use correct HTTP methods**  
   - `GET /users` → list users  
   - `POST /users` → create user  
   - `PUT /users/123` → update user  
   - `DELETE /users/123` → delete user
3. **Stateless design**  
   Each request must contain all necessary info (no server-side session state).
4. **Versioning**  
   Add `/v1/` or `/v2/` in URLs to avoid breaking clients.
5. **Error handling**  
   Return consistent error formats with proper status codes.
6. **Security**  
   Use HTTPS, authentication (JWT, OAuth 2.0), and authorization checks.
7. **Performance**  
   Implement pagination, caching headers (`Cache-Control`, `ETag`), and filtering.

---

## 🌍 Making It Remote
- **Host on a server**: Deploy your API on a web server (e.g., Node.js with Express, Django REST Framework, Spring Boot).
- **Expose endpoints**: Make them accessible via the internet using a domain or IP.
- **Secure access**: Use HTTPS and authentication tokens.
- **Scalability**: Statelessness makes horizontal scaling easy (multiple servers can handle requests independently).

---

## ❓ Are All APIs RESTful?
- **No.**  
  - Many APIs are **HTTP-based but not RESTful** (e.g., they use verbs in URLs like `/getUser` instead of proper REST design).  
  - Other styles exist: **GraphQL**, **gRPC**, **SOAP**, etc.  
  - REST is the most common, but **“REST” ≠ “RESTful”**—only APIs that follow REST constraints truly qualify.  [GP](https://generalistprogrammer.com/tutorials/restful-api-design-complete-guide)  [Strapi](https://strapi.io/blog/restful-api-design-guide-principles-best-practices)  

---

## 📊 Quick Comparison

| API Style   | Key Features | Pros | Cons |
|-------------|--------------|------|------|
| **RESTful** | HTTP verbs, stateless, resource-based | Simple, widely adopted, scalable | Can be verbose, over-fetching data |
| **GraphQL** | Single endpoint, flexible queries | Efficient data fetching | More complex setup |
| **gRPC**    | Binary protocol, fast | High performance, streaming | Harder debugging, less human-readable |
| **SOAP**    | XML-based, strict standards | Strong contracts, enterprise use | Heavy, outdated for modern web |

## Coding example
```
// Step 1: Install dependencies
// npm init -y
// npm install express

const express = require('express');
const app = express();
app.use(express.json()); // middleware to parse JSON

// Fake in-memory "database"
let users = [
  { id: 1, name: "Rehaan" },
  { id: 2, name: "Arya" }
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// POST create a new user
app.post('/users', (req, res) => {
  const newUser = { id: users.length + 1, name: req.body.name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update a user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = req.body.name;
  res.json(user);
});

// DELETE remove a user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

// Start server
app.listen(3000, () => console.log("API running on http://localhost:3000"));
```



# AI response Decode(Look into script_unvail.js)
## AI Roles
 user(client),assistant(LLM),
 system:
  The invisible framework that sets the rules, context, and boundaries for how LLM interact with user. It ensures consistency, safety, and structure.
## API Endpoints(Chat completions And Responses, Look at https://github.com/ParthanahalliRehaan/2_JS_Node/blob/main/1_Node_Docs/0_HTTPBasics_Routing_APIBasics.txt)
  **Completions --> Chat completions --> Responses(Latest)**
  *Completions format:*
  ```
    const response = await openai_client.completions.create({
        model:Model_Name,
        prompt:"et al"
    });
  ```
## OPENAI Client Vs Model VS MP
Definitions:

    Model Provider:
    - The company or service that hosts and serves AI models.
    - Example: OpenAI, Anthropic, Microsoft Azure.

    Client:
    - The library, SDK, or wrapper used to send requests to the provider’s API.
    - Example: `openai` Python package, Node.js client.
    - Acts as the interface between your code and the provider.

    Model:
    - The actual AI system that generates responses.
    - Example: `gpt-4`, `gpt-4.1`, `dall-e-3`.

Distinction:
- Provider = Who owns/hosts the models.
- Client = How you connect to them.
- Model = The intelligence you’re actually using.

```js
import OpenAI from "openai";//Library or SDK 

// The client: handles authentication and requests
const client = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
  baseURL:process.env.OPENAI_URL, // your API key & Base URL here
});

async function runExample() {
  // The model: the actual AI system generating responses
  const response = await client.chat.completions.create({
    model: "gpt-4.1", // model provided by OpenAI (the Model provider,MP)
    messages: [
      { role: "user", content: "Hello, world!" } // user role message
    ],
  });

  console.log(response.choices[0].message.content);
}

runExample();
```
