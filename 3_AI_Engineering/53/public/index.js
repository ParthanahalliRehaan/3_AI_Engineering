  document.getElementById("generate-btn").addEventListener("click", async () => {
    const res = await fetch("/generate-image");

    if (!res.ok) {
      console.error("Failed to generate image");
      return;
    }

    const { b64_json } = await res.json();
    document.getElementById("new-image").src = `data:image/jpeg;base64,${b64_json}`;
    console.log("Image injected successfully!");
  });