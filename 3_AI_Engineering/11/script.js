import { autoResizeTextarea, setLoading } from "./tool.mjs";

document.addEventListener("DOMContentLoaded", function () {

  const giftForm = document.getElementById("gift-form");
  const userInput = document.getElementById("user-input");
  const outputContent = document.getElementById("output-content");

  function start() {
    userInput.addEventListener("input", () => autoResizeTextarea(userInput));
    giftForm.addEventListener("submit", handleGiftRequest);
  }

  async function handleGiftRequest(e) {
    e.preventDefault();

    const userPrompt = userInput.value.trim();
    if (!userPrompt) return;

    setLoading(true);
    outputContent.innerHTML = "";

    try {

      const res = await fetch("/api/gift-genie", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let result = "";

      while (true) {

        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        result += chunk;

        outputContent.innerHTML =
          DOMPurify.sanitize(marked.parse(result));
      }
      console.log(result);

    } catch (error) {

      console.error(error);
      outputContent.textContent = "Error - check console";

    } finally {

      setLoading(false);

    }
  }

  start();
});