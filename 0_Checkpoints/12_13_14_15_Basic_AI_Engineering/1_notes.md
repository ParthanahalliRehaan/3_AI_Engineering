# AI Engineering  
## 🔑 Key Concepts

### 1. Few-Shot Prompting
- **Definition**: Provide the model with a few examples of input-output pairs in the prompt.  
- **Use case**: Teaching the model how to answer without fine-tuning.  
- **Example**: Sentiment classification, structured outputs, or formatting tasks.

---

### 2. Temperature
- **Definition**: Controls randomness in the output.  
- **Range**: 0 → deterministic, 1 → creative/random.  
- **Tip**: Lower values for factual tasks, higher values for brainstorming.

---

### 3. Top‑p (Nucleus Sampling)
- **Definition**: Model considers only the most probable words whose cumulative probability ≤ *p*.  
- **Range**: 0–1.  
- **Tip**: Use either `temperature` or `top_p` (not both at high values).

---

### 4. Top‑k (Alternative Sampling)
- **Definition**: Instead of cumulative probability, the model picks from the **top k most likely tokens**.  
- **Range**: Integer (e.g., `k=50` → only top 50 tokens considered).  
- **Tip**: Smaller `k` → more deterministic, larger `k` → more diverse.

---

### 5. Max Tokens
- **Definition**: Maximum number of tokens the model can generate in the response.  
- **Tip**: Balance between cost and completeness. Too low → truncated answers, too high → wasted tokens.

---

### 6. Web Search (Retrieval-Augmented Generation)
- **Definition**: Combine model reasoning with **fresh web data**.  
- **Use case**: When you need up-to-date facts, news, or external knowledge.  
- **Tip**: Always cite sources when using web search.

---

## 📝 Example: `script.js`

Here’s a **Node.js script** showing multiple parameters:

```javascript
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function runPrompt() {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that classifies movie reviews.",
      },
      // Few-shot examples
      { role: "user", content: "The acting was brilliant and the story was touching." },
      { role: "assistant", content: "Positive" },
      { role: "user", content: "This was the worst movie I’ve ever seen." },
      { role: "assistant", content: "Negative" },
      { role: "user", content: "The film was okay, not great but not terrible." },
      { role: "assistant", content: "Neutral" },
      // New input
      { role: "user", content: "The visuals were stunning but the plot was weak." },
    ],
    temperature: 0.3,   // controls randomness
    top_p: 0.9,         // nucleus sampling
    max_tokens: 100,    // limit response length
    // top_k: 50,       // if supported, restricts to top 50 tokens
    // web_search: true // hypothetical flag for retrieval-augmented generation
  });

  console.log(response.choices[0].message.content);
}

runPrompt();
```

---

## ⚡ How this works
- **Few-shot prompting**: Multiple examples guide the model’s classification style.  
- **Temperature (0.3)**: Keeps answers consistent.  
- **Top‑p (0.9)**: Focuses on the most probable words.  
- **Max tokens (100)**: Ensures concise output.  
- **Top‑k (50)**: Restricts randomness further (if supported).  
- **Web search**: Can be combined for real-time knowledge.  

# Schemas(How to modify the output with schema, Responses API)
```js
//Chat Completions API(This API endpoint can't handle schema)

/*
export const giftSchema = {
  type: "json_schema",
  json_schema: {
    name: "gift_suggestions",
    schema: {
      type: "object",
      properties: {
        gifts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              price_range: { type: "string" },
              why_its_good: { type: "string" },
            },
            required: ["name", "price_range", "why_its_good"],
          },
        },
      },
      required: ["gifts"],
    },
  },
};
*/

//Response API Schema

export const giftSchemaResponses = {
  type: "json_schema",
  name: "gift_suggestions",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      gifts: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            name: { type: "string" },
            price_range: { type: "string" },
            why_its_good: { type: "string" },
          },
          required: ["name", "price_range", "why_its_good"],
        },
      },
    },
    required: ["gifts"],
  },
};
```
```text(Responses API, not modified with Schema but the one which is in script.js)
{
  id: 'resp_0b4fc270c1df24d40069b0149401c881978b05b29a3c05f490',
  object: 'response',
  created_at: 1773147284,
  status: 'completed',
  background: false,
  billing: { payer: 'developer' },
  completed_at: 1773147311,
  error: null,
  frequency_penalty: 0,
  incomplete_details: null,
  instructions: null,
  max_output_tokens: null,
  max_tool_calls: null,
  model: 'gpt-5-nano-2025-08-07',
  output: [
    {
      id: 'rs_0b4fc270c1df24d40069b014947028819783c59368009f366e',
      type: 'reasoning',
      summary: []
    },
    {
      id: 'msg_0b4fc270c1df24d40069b014a5d0488197b9f3b3befebdb455',
      type: 'message',
      status: 'completed',
      content: [Array],
      role: 'assistant'
    }
  ],
  parallel_tool_calls: true,
  presence_penalty: 0,
  previous_response_id: null,
  prompt_cache_key: null,
  prompt_cache_retention: null,
  reasoning: { effort: 'medium', summary: null },
  safety_identifier: null,
  service_tier: 'default',
  store: true,
  temperature: 1,
  text: { format: { type: 'text' }, verbosity: 'medium' },
  tool_choice: 'auto',
  tools: [],
  top_logprobs: 0,
  top_p: 1,
  truncation: 'disabled',
  usage: {
    input_tokens: 14,
    input_tokens_details: { cached_tokens: 0 },
    output_tokens: 3888,
    output_tokens_details: { reasoning_tokens: 2432 },
    total_tokens: 3902
  },
  user: null,
  metadata: {},
  output_text: 'Shogatsu: The Japanese New Year and Its Quiet Renewal\n' +
    '\n' +
    'In Japan, Shogatsu—often called Oshogatsu by locals—is more than a calendar occasion. It is a season of quiet retreat and bright rituals, a time when the bustle of daily lif
e softens and the year becomes legible again through family bonds, food, and small acts of remembrance. Rooted in Shinto ideas of purification and blessing, and shaped over centu
ries by Buddhist influence and evolving social practices, the New Year in Japan is less about fireworks and grand spectacles than about renewal, gratitude, and the careful cultiv
ation of good spirits for the months ahead.\n' +
    '\n' +
    'The preparation for Shogatsu begins long before January 1. In late December, many households undertake a thorough cleaning, a ritual called osoji, to sweep away the dust of 
the old year and welcome a fresh start. Shops fill with ingredients for the year’s signature dishes, and homes are adorned with symbols meant to invite luck. We see kadomatsu—arr
angements of pine, bamboo, and sometimes plum blossoms—resting at doorways to invite prosperity and endurance. A traditional round of beaming mochi sits atop stacked layers in ka
gami mochi, a pair of mochi cakes crowned by a small citrus fruit, a gentle reminder of continuity and hope. These decorations, along with shimenawa ropes and shide paper, create
 a threshold between the old year and the new, a boundary that is both protective and inviting.\n' +
    '\n' +
    'Come January, the days of Shogatsu unfold with a rhythm that blends family time, ritual, and the enjoyment of special foods. The first dawn of the year is symbolic for many 
families, and greetings of “Akemashite omedetōgozaimasu” float through homes and neighborhoods. It is common for relatives to come together, sometimes traveling long distances to
 reconnect and share a sense of belonging. The days are not a time for urgent work but a quiet breathing-space in which conversations drift toward gratitude for health, safety, a
nd opportunities to grow in the year ahead. For many, the days are a mix of rest and purposeful activity—visiting local shrines or temples for Hatsumōde, the first Shinto or Budd
hist prayer of the year, to seek blessings for family, fortune, and well-being.\n' +
    '\n' +
    'Food is perhaps the most enduring thread of Shogatsu. Osechi-ryori, the elegant assortment of foods packed in lacquered boxes, is both a culinary celebration and a map of go
od wishes. Each dish carries symbolic meaning: kuromame (sweet black beans) for health; kazunoko (herring roe) for fertility and rich family futures; tazukuri (small dried sardin
es) for a bountiful harvest; datemaki (sweet rolled omelette) for knowledge and prowess; and ebi (shrimp) for a long life. The array is designed to be eaten over the first days o
f the year, letting families share in a familiarity that tastes like home and safety. In some regions, ozōni—hearty soup with mochi and seasonal ingredients—takes center stage, o
ffering warmth and comfort as January’s chill settles in. The foods are not merely flavors; they are language—the edible archive of hopes that the year may unfold with health, re
silience, and good fortune.\n' +
    '\n' +
    'Food is complemented by family rituals that mark a turning of the page. People often replace worn-out items, hang new decorative charms, and exchange small gifts—yet many of
 these customs are about shared memory as much as they are about luck. Children may receive otoshidama, envelopes of money that symbolize the passing of time and the trust placed
 in the younger generation. Post offices buzz with the tradition of nengajo, New Year’s cards sent to friends and family with a promise of connection in the year to come. Even as
 digital communication grows, nengajo remains a tangible ritual—a card that carries a message and a moment of anticipation when it is opened at the start of the year.\n' +       
    '\n' +
    'Hatsumōde, the first shrine or temple visit of the year, remains a central ritual, even in the era of rapid modernization. Some people spend New Year’s Eve and the early mor
nings in quiet contemplation, while others seek the buzz of crowds at major shrines like Meiji Jingu in Tokyo or Fushimi Inari in Kyoto. The act of entering a sacred space—lightl
y bowing, offering a coin, praying for health and happiness—re-centers personal ambitions within the larger cycle of life. It is an act of humility and hope, a moment to acknowle
dge both the fragility of human plans and the stubborn certainty that each year carries the chance to begin anew.\n' +
    '\n' +
    'Yet Shogatsu is not a relic of tradition alone. It is a living tableau that morphs with urban life, family dynamics, and global influences. Some households keep the older, m
ore formal tones of the season—carefully prepared osechi boxes, formal attire on New Year’s Day, and reverence toward ancestral ties. Others blend the old with the new: virtual g
reetings, contemporary interpretations of old foods, or travel plans that take families beyond their home towns. In this sense, Shogatsu acts as both a reminder of where we come 
from and a flexible canvas for where we hope to go. The tension between preservation and change is not a conflict in Japanese culture but a sign of its vitality—a culture that re
spects ritual while inviting personal meaning to shape it.\n' +
    '\n' +
    'In literature, film, and memory, Shogatsu is often portrayed as a time when the ordinary world pauses to listen to the longer, quieter music of life. The emphasis on renewal
, repair, and gratitude resonates across generations, offering a shared language for describing fears, hopes, and resolutions. It is a season that invites reflection on what trul
y matters—family, health, and the stubborn beauty of continuity in the face of change. The rituals provide structure, but the deeper purpose lies in cultivating a spirit of gener
osity toward others and a patient, hopeful outlook for the future.\n' +
    '\n' +
    'As Japan continues to evolve, Shogatsu remains a compass for many people. It teaches that renewal is not a single moment on January 1, but a continuum—an ongoing practice of
 tidying, forgiving, and renewing relationships and plans. It is a season that asks us to slow down just enough to notice what we have and to imagine how to nurture it in the day
s ahead. In that slow and deliberate pace, Shogatsu offers a yearly chance to reset expectations, renew commitments to family and community, and enter the new year with a sense o
f gratitude, purpose, and gentle optimism.\n' +
    '\n' +
    'If you would like, I can tailor this essay to a specific length, audience, or language—Japanese or English. I can also adjust the tone to be more scholarly, lyrical, or pers
onal, or add regional variations and more detailed descriptions of particular foods or customs.'
}
```

# How to write a Schema.mjs and read any schema
## 🛠 How to Write a Custom Schema
Schemas are basically **rules that define the shape of your JSON data**. You’re telling the API: “Responses must look like this.”

Here’s the process:

1. **Decide the structure of your data**  
   Example: You want a list of gifts, each with a name, price range, and reason.

2. **Define the schema type**  
   Usually `"type": "object"` at the root, because responses are objects.

3. **Add properties**  
   Each property has:
   - `type`: string, number, boolean, object, array
   - `properties`: if it’s an object
   - `items`: if it’s an array

4. **Mark required fields**  
   Use `"required": ["field1", "field2"]` to enforce mandatory fields.

---

### Example: Custom Schema for a Book List
```js
export const bookSchema = {
  type: "json_schema",
  name: "book_collection",
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      books: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            title: { type: "string" },
            author: { type: "string" },
            year: { type: "integer" },
          },
          required: ["title", "author"],
        },
      },
    },
    required: ["books"],
  },
};
```

This enforces that every response must have a `books` array, and each book must have at least a `title` and `author`.

---

## 📖 How to Read and Understand Schema Responses
When you see a schema response:

- **Look at the root type**: Is it an object, array, or primitive?  
- **Check `properties`**: These are the allowed keys.  
- **Check `items`**: Defines what each element in an array looks like.  
- **Check `required`**: These are mandatory fields.  
- **Check `additionalProperties`**: If `false`, no extra fields are allowed.

---

### Example: Reading Your Gift Schema
```js
{
  "gifts": [
    {
      "name": "Wireless Headphones",
      "price_range": "$50-$100",
      "why_its_good": "Great for music lovers and commuting."
    }
  ]
}
```

- Root is an **object** with one required property: `gifts`.  
- `gifts` is an **array**.  
- Each item in the array is an **object** with three required fields: `name`, `price_range`, `why_its_good`.  
- No extra fields allowed because of `additionalProperties: false`.

---

## 🚀 Quick Tips
- Start by sketching the JSON you want → then convert it into schema rules.  
- Use `"string"`, `"integer"`, `"boolean"`, `"array"`, `"object"` as building blocks.  
- Always define `required` fields to avoid incomplete responses.  
- Use `additionalProperties: false` to keep responses clean and predictable.
