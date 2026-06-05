import { pipeline } from '@xenova/transformers';

/* Load pipeline (downloads model on first run, caches locally)
const extractor = await pipeline('feature-extraction', 'bert-base-uncased');

But gives error that file couldn't be downloaded reason - 
                Yes — when you call `pipeline('feature-extraction', 'bert-base-uncased')`, the library will **attempt to download the model files on the first run** and then cache them locally (usually under `~/.cache/huggingface/transformers` or a similar directory).  

                The problem in your case is that `bert-base-uncased` does **not** have the ONNX files that `@xenova/transformers` expects. So instead of successfully downloading, it fails with the *“Could not locate file”* error. That’s why you saw the crash.

                ---

                ### What should happen
                - ✅ If the model exists in ONNX/WASM format (like `Xenova/all-MiniLM-L6-v2`), the pipeline downloads it once, caches it, and reuses it in future runs.  
                - ❌ If the model doesn’t have ONNX files (like `bert-base-uncased`), the download step fails, and you get the error you saw.

                ---

                ### How to fix
                Use a model that Xenova has already exported for JS/WASM:
                ```js
                import { pipeline } from '@xenova/transformers';

                // This one downloads automatically on first run and caches locally
                const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

                const text = "The quick brown fox jumps over the lazy dog.";
                const features = await extractor(text);

                console.log(features[0]);        // First token embedding
                console.log(features[0].length); // Embedding dimension
                ```

                ---

                👉 So to answer your question directly: **Yes, the pipeline will download the model first run — but only if the model has ONNX files available.**  
                For `bert-base-uncased`, those files don’t exist, so you need to switch to a Xenova-hosted model or provide ONNX files yourself.  

                Do you want me to show you exactly where the cache is stored on Windows so you can verify whether the model was downloaded?

*/
const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

const text = "The quick brown fox jumps over the lazy dog.";
const features = await extractor(text);

// Log the full features array (all tokens, all embeddings)
console.log(features);

// Log the first token’s embedding vector
console.log(features[0]);

// Log the embedding dimension for the first token
console.log(features[0].length);
