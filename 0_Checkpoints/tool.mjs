export function checkEnvironment() {
  if (!process.env.OPENAI_URL) {
    throw new Error("Missing AI_URL. This tells us which AI provider you're using.");
  }

  if (!process.env.OPENAI_MODEL) {
    throw new Error("Missing AI_MODEL. The AI request needs a model name.");
  }

  if (!process.env.OPENAI_KEY) {
    throw new Error("Missing AI_KEY. Your API key is not being picked up.");
  }

  console.log("AI provider URL:", process.env.OPENAI_URL);
  console.log("AI model:", process.env.OPENAI_MODEL);
}
/*
we use .mjs which specifies this files type as module if dont want to, we could have change type in package.json as "module"
*/