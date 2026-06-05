// server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { InferenceClient } from "@huggingface/inference";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import express from "express";
import { huggingFaceFunction, textSummarization } from "./config/tool.mjs";

const app = express();

app.use(express.static(path.join(__dirname, "public")));


app.get("/chat", async (req, res) => {
  try {
    const text = await textSummarization();
    res.json({ text });
    console.log(text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "HF setup failed failed" });
  }
})

app.listen(3000, () => console.log("Server running on port 3000"));