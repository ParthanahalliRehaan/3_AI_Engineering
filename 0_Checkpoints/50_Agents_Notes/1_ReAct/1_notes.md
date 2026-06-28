# AI Agents(Intro)
## 🌐 Big Picture
- Human history is full of inventions aimed at **simplifying life**.
- Technology has shifted us from **manual, imperative tasks** (we tell machines exactly what to do step by step) to **automated, declarative systems** (we state goals, and machines figure out the steps).
- Now we’re entering the era of **AI agents**, which represent a new abstraction layer in AI development.

## 🤖 What Are AI Agents?
- Large language models (like ChatGPT) can **converse and provide information**.
- AI agents go further: they can **perceive their environment, make decisions, and take actions** toward goals.
- Analogy: They’re like **project managers** coordinating tasks between different teams.

## 🚗 Examples in Everyday Life
- **Adaptive cruise control** and **lane keep assist** in cars: small-scale AI agents that perceive surroundings and act to improve safety.
- **Fully autonomous vehicles**: advanced agents that process millions of data points to drive from point A to point B without human input.

## 📖 Working Definition
> An agent is a computer program or system designed to **perceive its environment, make decisions, and take actions to achieve specific goals**.

This definition is central to the course.

## 🛠️ Course Roadmap
- **Prompt engineering** and **chain-of-thought prompting** (how to guide AI reasoning).
- Introduction to **agents, tools, and functions**.
- Hands-on building:
  1. Start with **React prompting strategy** (Reason + Act).
  2. Refactor using **OpenAI functions**.
  3. Explore **automatic function calling** (a beta feature that lets models decide when to call functions without manual setup).

## 🎯 Goal of the Course
By the end, you’ll be able to build your own AI agents in **JavaScript with OpenAI**, not autonomous cars, but systems that can:
- Perceive context,
- Make decisions,
- Take actions automatically.
# Zoom Out
## 🌐 Big Picture of AI
- **AI is broader than LLMs**: Large language models (like GPT‑3.5, GPT‑4, Mistral, Llama 2) are just one tool in the AI toolkit.
- **Other AI models**:
  - Text‑to‑speech and speech‑to‑text (convert between spoken and written language).
  - Computer vision (analyze images).
  - Image generation (create new images, e.g., Midjourney, DALL·E).
  - Sensor data processors (handle input from devices like cameras, lidar, etc.).

## 🤖 What is an Agent?
- **Definition**: An agent is a system that can pull together multiple tools and iterate on tasks until completion.
- **Simple example**: Use an LLM to gather real‑time info, loop over tasks, and solve problems step by step.
- **Complex example**: Autonomous vehicles — breaking down the task of safe driving into millions of micro‑decisions using sensors and models.

## 🌀 Perspective Diagram
- **Artificial Intelligence (AI)**: The full circle.
- **AI Agents**: A subset within AI.
- **Tools agents can access**:
  - LLMs (GPT‑3.5, GPT‑4, Mistral, Llama 2).
  - Other models (speech, vision, image generation).
- Agents orchestrate these tools to achieve goals.

## 🛠️ Core Takeaway
- Agents = **orchestrators of multiple AI tools**.
- They can range from simple reasoning loops with LLMs to highly complex autonomous systems.
- Building agents from scratch helps you understand the mechanics, but modern tooling makes it much easier today.
# RedGreen Refactor
Red-Green-Refactor is the core cycle of Test-Driven Development (TDD) 
where developers write a failing test (Red), make it pass with minimum code (Green), 
and then improve the code's structure (Refactor). This approach ensures code is well-tested, functional, and clean, typically repeating in rapid, 
short cycles.

# ReAct(Intro, Groq APIs used)
Resource:
https://cobusgreyling.medium.com/react-synergy-between-reasoning-acting-in-llms-36fc050ae8c7

## 1. The Problem with Hardcoding
- If you write your program so it *always* fetches location and weather before asking GPT for ideas, then your agent can only ever solve that one type of problem.  
- If later you want to ask about yesterday’s world events, or only care about location but not weather, your agent won’t adapt — it’s locked into the chain you coded.

## 2. The Goal of Agents
- Instead of treating the LLM as just a text generator, you want it to **reason about the task**: “What do I need to know to answer this question?”  
- That way, the agent can decide dynamically whether it needs location, weather, or something else entirely.

## 3. The “ReAct” Strategy
He introduces the **ReAct prompting framework** (Reason + Act + Observe):
- **Reasoning phase**: The LLM thinks through the problem and decides what information or steps are needed.  
- **Acting phase**: The LLM suggests an action (like “call the weather API” or “search yesterday’s news”). The code executes that action.  
- **Observing phase**: The LLM sees the result of the action, evaluates it, and decides whether it’s enough to answer or if more steps are needed.  

This loop continues until the agent has enough context to give the final answer.

## 4. Why This Matters
- It makes your agent **general‑purpose** instead of single‑purpose.  
- You don’t have to predetermine every possible chain of steps.  
- The LLM itself can flexibly decide what data it needs, call the right functions, and adapt to new goals.

# PLAN:
    1. Design a well-written ReAct prompt
    2. Build a loop for my agent to run in.
    3. Parse any actions that the LLM determines are necessary
    4. End condition - final Answer is given
# System prompt

You cycle through Thought, Action, PAUSE, Observation. At the end of the loop you output a final Answer. Your final answer should be highly specific to the observations you have from running
the actions.
1. Thought: Describe your thoughts about the question you have been asked.
2. Action: run one of the actions available to you - then return PAUSE.
3. PAUSE
4. Observation: will be the result of running those actions.

Available actions:
- getCurrentWeather: 
    E.g. getCurrentWeather: Salt Lake City
    Returns the current weather of the location specified.
- getLocation:
    E.g. getLocation: null
    Returns user's location details. No arguments needed.

Example session:
Question: Please give me some ideas for activities to do this afternoon.
Thought: I should look up the user's location so I can give location-specific activity ideas.
Action: getLocation: null
PAUSE

You will be called again with something like this:
Observation: "New York City, NY"

Then you loop again:
Thought: To get even more specific activity ideas, I should get the current weather at the user's location.
Action: getCurrentWeather: New York City
PAUSE

You'll then be called again with something like this:
Observation: { location: "New York City, NY", forecast: ["sunny"] }

You then output:
Answer: <Suggested activities based on sunny weather that are highly specific to New York City and surrounding areas.>
# Agent Loop
## 1. **LLM as a Stateless API**
- Every call to the LLM (like `chat.completions.create`) is independent.
- It doesn’t remember past calls — instead, you send the **entire conversation history** each time.
- That’s why the messages array includes:
  - The **system prompt** (rules/context).
  - The **user’s query**.
  - Any **observations** or results from actions taken.

---

## 2. **The "Awake / Asleep" Analogy**
- When you call the LLM, it’s “awake” — it looks at the full conversation history and produces a response.
- Once it responds, it “goes to sleep” — meaning it doesn’t persist memory.
- Next time you call it, it wakes up again, reviews the entire history, and continues reasoning.

---

## 3. **Thought → Action → Observation Cycle**
- **Thought**: The LLM decides what it needs (e.g., “I need the user’s location”).
- **Action**: It outputs an instruction (e.g., “Get user location”).
- **Observation**: Your code executes that action, then feeds the result back into the conversation (e.g., “User is in New York City”).
- The LLM sees this new observation next time it’s called and continues reasoning.

---

## 4. **Example Walkthrough**
1. **First call**:  
   - System prompt + user query.  
   - LLM responds: “I need the user’s location” → Action: `getUserLocation`.
2. **Second call**:  
   - Now the messages include the observation: “User is in New York City.”  
   - LLM responds: “I need the weather in New York City” → Action: `getWeather`.
3. **Third call**:  
   - Messages now include the weather observation.  
   - LLM responds with the **final answer**: “It’s sunny in NYC, here are some activities…”

---

## 5. **Why This Matters**
- The agent loop is essentially:
  1. LLM does reasoning (thoughts + actions).
  2. Your code executes actions and feeds results back.
  3. LLM continues reasoning until it can produce a final answer.
- This separation of **reasoning (LLM)** and **execution (your code)** is what makes agentic systems work.
# Doubt 0
## 🔄 The Core Idea
- The speaker is describing how to build a **loop** around GPT’s responses.
- The loop continues running **as long as GPT outputs an “action:” line**.
- If GPT outputs an **action**, that means GPT wants you to call a function (like retrieving data, running a calculation, etc.).
- After you call the function, you give GPT the **observation** (the result of that function call), and then loop again so GPT can decide what to do next.
- If GPT does **not** output an action, that means it has finished and given you the final answer.

---

## 📜 Detecting the Action
- GPT’s response is structured into different parts: **thought**, **action**, **pause**, etc.
- These parts are separated by **new line characters** (`\n`).
- Example:
  ```
  Thought: I should look up the weather
  Action: get_weather(location=Paris)
  Pause: waiting for result
  ```
- The **new line character** is invisible but acts as a separator between lines.
- The speaker points out that GPT uses `\n` because in the prompt they showed GPT examples separated by new lines. GPT learned to mimic that formatting.

---

## 🛠️ Parsing Strategy (The Plan)
The speaker lays out a **step-by-step plan** for handling GPT’s output:

1. **Split the response string** on the newline character (`\n`).
   - This gives you an **array of strings**, each representing one line of GPT’s output.
   - Example: `["Thought: ...", "Action: get_weather(...)", "Pause: ..."]`

2. **Search through the array** for the line that contains `"Action:"`.
   - This tells you if GPT wants you to do something.

3. **Parse the action line**:
   - Extract the **function name** (e.g., `get_weather`).
   - Extract any **parameters** (e.g., `location=Paris`).

4. **Call the function** with those parameters.

5. **Add an observation line**:
   - After calling the function, you create a new message like:
     ```
     Observation: The weather in Paris is 18°C and sunny
     ```
   - This observation is then fed back into GPT so it can continue reasoning.

6. **Loop again**:
   - If GPT outputs another `"Action:"`, repeat the process.
   - If GPT does not output an `"Action:"`, stop the loop and return GPT’s final answer.

---

## ⚠️ Important Notes
- You must **check if an action line exists** at all.
  - If there’s no action, it means GPT is done and you can safely return the answer.
- The **presence of “Action:”** is the signal that you need to loop again.
- The **absence of “Action:”** is the signal to stop looping.

---

## 🧩 Why Newlines Matter
- GPT is using newline characters (`\n`) to separate sections.
- This is because the prompt examples used newlines as separators.
- You could use other delimiters (like `####`), but in testing, newlines worked fine.
- So the plan is to rely on newlines for parsing.

---

## 🧾 Summary of the Plan
Here’s the plan in one clean list:

1. Split GPT’s response by `\n`.
2. Look for a line containing `"Action:"`.
3. If found:
   - Extract function name + parameters.
   - Call the function.
   - Add an observation message with the result.
   - Loop again with GPT.
4. If not found:
   - Stop looping.
   - Return GPT’s final answer.

---

👉 In short: The speaker is teaching how to **parse GPT’s structured output**, detect when it wants you to run a function, execute that function, feed the result back, and keep looping until GPT gives a final answer. The key trigger is the `"Action:"` line, and the parsing relies on splitting by newline characters.
# Regex 1 Vs 2
## Regex 1
```js
const actionRegex = /^Action: (\w+): (.*)$/;
```

### Breaking it down piece by piece

1. **`^`**
   - This means “start of the line.”
   - Ensures the match only works if the line begins with `Action:`.

2. **`Action:`**
   - Literal text. The regex expects the line to start with exactly `Action:`.

3. **`(\w+)`**
   - Parentheses `()` → define a **capture group** (something you want to extract).
   - `\w` → matches any “word character” (letters, digits, underscore).
   - `+` → means “one or more.”
   - So `(\w+)` will capture the function name, e.g. `getWeather`.

4. **`:`**
   - Literal colon. This separates the function name from its parameter.

5. **`(.*)`**
   - Another capture group.
   - `.` → matches any character except newline.
   - `*` → means “zero or more.”
   - So `(.*)` captures everything after the colon — the parameter string, e.g. `Tokyo`.

6. **`$`**
   - End of line anchor.
   - Ensures the regex only matches if the line ends right after the parameter.

---

### Example in action

Line:  
```
Action: getWeather: Tokyo
```

Regex captures:  
- `match[0]` → `"Action: getWeather: Tokyo"` (the whole match)  
- `match[1]` → `"getWeather"` (function name)  
- `match[2]` → `"Tokyo"` (parameter)

---

### Why this structure works
- Anchors (`^` and `$`) make sure you’re matching the whole line, not just part of it.  
- Capture groups let you extract the **function name** and **parameter** separately.  
- The colon `:` is used as a delimiter between function and parameter.

## Regex 2
```js
const responseText = response.choices[0].message.content
const responseLines = responseText.split("\n")

const actionRegex = /^Action: (\w+): (.*)$/
const foundActionStr = responseLines.find(str => actionRegex.test(str))
const actions = actionRegex.exec(foundActionStr)
console.log(actions)
```

### Step by step

1. **Extract the text from the LLM response**
   ```js
   const responseText = response.choices[0].message.content
   ```
   - This assumes you’re using an API like OpenAI’s, where the model’s reply is inside `response.choices[0].message.content`.

2. **Split into lines**
   ```js
   const responseLines = responseText.split("\n")
   ```
   - Breaks the multi-line string into an array of lines.
   - Example:  
     ```
     [
       "Thought: I should look up the weather.",
       "Action: getWeather: Tokyo"
     ]
     ```

3. **Define the regex**
   ```js
   const actionRegex = /^Action: (\w+): (.*)$/
   ```
   - Anchored to the start (`^`) and end (`$`) of the line.
   - `Action:` → literal text.
   - `(\w+)` → captures the function name (letters, digits, underscore).
   - `: (.*)` → captures everything after the colon and space (the parameter).

4. **Find the line that matches**
   ```js
   const foundActionStr = responseLines.find(str => actionRegex.test(str))
   ```
   - Loops through each line and returns the first one that matches the regex.
   - In this case, it finds `"Action: getWeather: Tokyo"`.

5. **Extract the captured groups**
   ```js
   const actions = actionRegex.exec(foundActionStr)
   ```
   - `exec` runs the regex and returns an array:
     - `actions[0]` → the full match (`"Action: getWeather: Tokyo"`)
     - `actions[1]` → the function name (`"getWeather"`)
     - `actions[2]` → the parameter (`"Tokyo"`)

6. **Log the result**
   ```js
   console.log(actions)
   ```
   - Prints the array so you can see exactly what was captured.

---

### Example output

For the line:
```
Action: getWeather: Tokyo
```

`console.log(actions)` will give:

```js
[
  "Action: getWeather: Tokyo",
  "getWeather",
  "Tokyo"
]
```

---

### Why this works well
- `split("\n")` ensures you can handle multi-line outputs cleanly.
- `find(...)` isolates the `Action:` line without worrying about `Thought:` or `Final Answer`.
- `exec(...)` gives you structured access to the function name and parameter.

# ReAct Core problem
---

## 🧩 Core Problem
When you let an agent call APIs inside a loop, you risk:
- **Infinite loops** (e.g., `while(true)`).
- **Excessive API calls** (costing real money).
- **Hard-to-debug behavior**.

So the solution is to **cap the number of iterations** and add clear logging.

---

## 🔑 Key Concepts in the Script

### 1. **Max Iterations**
```js
const MAX_ITERATIONS = 5;
```
- Prevents runaway loops.
- Ensures the agent won’t call the API more than 5 times.

---

### 2. **C-Style For Loop**
```js
for (let i = 0; i < MAX_ITERATIONS; i++) {
   // agent logic here
}
```
- Iterates up to 5 times.
- Each iteration represents one "step" the agent takes.

---

### 3. **Regex Setup**
- The script uses regex to detect whether the LLM output contains an **action**.
- If no action is found → assume the agent is ready to give the **final answer**.

---

### 4. **Early Exit**
```js
if (!foundAction) {
   return responseText;
}
```
- Ends the loop early if the agent signals it’s done.
- Prevents wasting iterations.

---

### 5. **Transparency with Console Logs**
The professor added **lots of `console.log` statements** for debugging:
- Iteration number (`Iteration #1`, `Iteration #2`, etc.).
- The raw response text.
- Which function is being called and with what arguments.
- Final message: `"Agent finished with task"`.

This makes the agent’s reasoning **visible** while testing.

---

### 6. **Async/Await**
```js
await agent();
```
- Since API calls are asynchronous, you must `await` them.
- Otherwise, you’ll just see unresolved promises in the console.

---

### 7. **Example Run**
- **Input:** "What is the current weather in New York City?"
- **Iteration 1:** Agent decides → `getCurrentWeather("New York City")`.
- **Iteration 2:** Agent uses the observation → returns `"Sunny, 72°F"`.

- **Input:** "What is the current weather in my location?"
- **Iteration 1:** Agent decides → `getLocation()`.
- **Iteration 2:** Uses location → `getCurrentWeather("New York City")`.

- **Input:** "What are some activity ideas this afternoon?"
- Agent chains multiple steps:
  1. Get location.
  2. Get weather.
  3. Suggest activities based on both.

---

## 🚀 Why This Matters
You’ve basically built a **mini-agent framework**:
- It **perceives** (reads input).
- It **acts** (calls functions).
- It **reflects** (uses results in the next iteration).
- It **decides when to stop** (final answer).

This is the foundation of **iterative agents** like AutoGPT, but simplified.

---

## 📌 Next Step (Professor’s Hint)
Instead of manually parsing strings with regex, you can use **OpenAI’s function calling**:
- Define functions (`getWeather`, `getLocation`).
- Let the model decide when to call them.
- No need for regex hacks — the model outputs structured JSON.
