# Why functions?
## 🧩 Core Idea
OpenAI now has a **built-in way** for its models to call external tools/functions.  
Instead of us writing long, complicated instructions (system prompts) or manually parsing strings, the model itself can decide:  
➡️ “I need more info, so I’ll call this function.”

---

## ❓ Guiding Questions
- Why do we need functions at all?  
  → Because the model doesn’t know everything. Sometimes it needs to fetch data (like weather, stock prices, or your calendar).  

- What’s the old way vs. the new way?  
  → Old way: We wrote long prompts teaching the model how to interact with tools, then parsed its text output.  
  → New way: OpenAI gives the model a **structured function-calling system**. No messy parsing, less error-prone.

- What’s the benefit?  
  → Cleaner, simpler, more reliable. Like upgrading from handwritten notes to a proper app.

---

## 🔍 Analogies
- **Restaurant Analogy**:  
  Old way → You tell the waiter (the model) “If I ask for water, go to the kitchen, find the fridge, pour it, bring it back.”  
  New way → The waiter already knows the kitchen layout. You just say “Water please,” and they handle the rest.

- **Smartphone Analogy**:  
  Old way → You had to install separate apps and manually connect them.  
  New way → It’s like iOS/Android giving you built-in APIs so apps can talk to each other seamlessly.

- **School Analogy**:  
  Old way → Teacher gives students a huge manual on how to use the library.  
  New way → Students just raise their hand and say “I need a book,” and the librarian fetches it.

---

## 📝 Example Flow
Imagine you’re building a chatbot that can check the weather:

**Old way:**
- You write a long system prompt: “If user asks about weather, output `weather(city=...)`.”
- Then you parse that string yourself.

**New way (OpenAI functions):**
- You define a function `get_weather(city)`.
- The model directly says: “Call `get_weather` with city=London.”
- No parsing, no hacks.

---

## ⚡ Why Your Teacher Said “Gut Everything”
Because the new system is so much cleaner, it’s better to **start fresh** instead of patching the old messy code. Think of it like:
- Rebuilding a house with modern wiring instead of trying to fix the old tangled wires.

---

## 🎯 Quick Recap
- Old way = long prompts + string parsing.  
- New way = built-in function calling.  
- Benefit = less error, cleaner design, easier to maintain.  
- Analogy = waiter who already knows the kitchen, you just order.  
# Enums
## 🧩 What is an Enum?
- **Enum** stands for **enumeration**.  
- It’s a special data type that lets you define a set of **named values**.  
- Think of it as a list of **labels** for fixed options.

---

## ❓ Why do we need enums?
Imagine you’re coding a game and you want to represent the player’s direction:
- Without enums: you might use strings like `"north"`, `"south"`, `"east"`, `"west"`.  
- Problem: Someone could accidentally type `"nort"` or `"Southh"`.  

With enums:
- You define a fixed set of directions.  
- The compiler enforces that only those values are allowed.

---

## 🔍 Analogies
- **School Subjects Analogy**:  
  Instead of letting students write any random subject name, the school gives a fixed list: `Math, Science, History`. That’s an enum — a controlled set of choices.

- **Traffic Light Analogy**:  
  A traffic light can only be `RED`, `YELLOW`, or `GREEN`.  
  You wouldn’t want someone to type `"PURPLE"` by mistake. An enum locks it down.

---

## 📝 Example in Code
### TypeScript
```typescript
enum Direction {
  North,
  South,
  East,
  West
}

let playerDirection: Direction = Direction.North;
```

## 🎯 Why Enums Are Useful
- Prevents invalid values (no typos like `"nort"`).  
- Makes code more readable (`Direction.NORTH` is clearer than `"north"`).  
- Helps with consistency across large projects.  

---

👉 Think of enums as **drop-down menus in code**: you can only pick from the predefined options, nothing else.

# Tool Calling