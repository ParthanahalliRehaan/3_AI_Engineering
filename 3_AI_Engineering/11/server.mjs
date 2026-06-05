import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
import express from "express";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
  baseURL: process.env.AI_URL,
});

app.post("/api/gift-genie", async (req, res) => {
  /*https://openai-api-worker.parthanahalli-rehaan.workers.dev/*/

  const { prompt } = req.body;

  const messages = [
    {
      role: "system",
      content: `You are the Gift Genie!
        Make your gift suggestions thoughtful and practical.
        The user will describe the gift's recipient. 
        Your response must be in structured Markdown.
        Each gift must: 
          - Have a clear heading
          - A short explanation of why it would work

        If the user mentions a location or a time constraint,
        add another section under each gift that gives the user 
        a step by step guide on where and how they can get the gift.

        Skip intros and conclusions. 
        Only output gift suggestions.
        
        End with a section with an H2 heading titled "Questions for you" 
        that contains follow-ups that would help improve the 
        gift suggestions`,
    },
    {
    role: "user",
    content: "dubai airport. last minute gifts for niece (arts & crafts) and nephew who loves football"
  },
  {
    role: "assistant",
    content: `
    ### Travel Art Kit for Niece (Compact & Portable)

    A small, kid-friendly arts & crafts item that's easy to pack and perfect for a quick creative distraction during travel.

    **How to get it:**
    1. Head to Dubai International Airport (DXB) and proceed to Terminal 3 Departures.
    2. Visit Dubai Duty Free or a nearby WHSmith that carries kids’ stationery.
    3. Ask for compact arts & crafts kits or a coloring book with pencils.
    4. Choose a lightweight option suitable for carry-on.
    5. Request gift wrapping if available.

    ---

    ### Mini Football Keychain for Nephew

    A light, inexpensive football-themed souvenir that’s easy to carry and perfect for an airport purchase.

    **How to get it:**
    1. Visit Dubai Duty Free or a souvenir shop near the gates.
    2. Ask for football-themed keychains or small sports souvenirs.
    3. Check toy or sports sections if needed.
    4. Purchase and pack securely.

    ---

    ## Questions for you
    1. What are the ages of your niece and nephew?
    2. Do you have a budget per gift?
    3. Are you departing from Terminal 3?
    4. Does your nephew support a specific team?
    `
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  try {

    const stream = await openai.chat.completions.create({
      model: process.env.AI_MODEL,
      messages,
      stream: true,
    });
    console.log(stream);
    for await (const chunk of stream) {

      const token = chunk.choices[0].delta.content || "";
      if (token) {
        res.write(token);
      }

    }

    res.end();

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }

});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});