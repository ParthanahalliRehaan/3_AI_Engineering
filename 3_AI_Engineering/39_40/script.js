import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { hf, supabase, openAI, splitter } from "./config.mjs";
import { query } from "./query.mjs";
import { embedIt } from "./content.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname,"../.env")});

// -------------------- Convert and Store Embedding --------------------
async function convertAndStoreEmbedding(input){
    const result = await Promise.all(
        input.map(async textChunk => {
            try{
                // HuggingFace returns embedding array directly
                const embeddingResponse = await hf.featureExtraction({
                    model: process.env.EMBED_MODEL,
                    inputs: textChunk,
                });
                const embedding = Array.from(embeddingResponse);

                // ✅ Insert into movies table
                const { data, error } = await supabase
                    .from("movies")
                    .insert({ content:textChunk, embedding })
                    .select();
                
                if(error){
                    console.error(error);
                }else{
                    console.log(data);
                }
                return { content:textChunk, embedding };
            }catch(e){
                console.error(e);
                console.log("Creating And Storing embedding failed!");
            }
        })
    );
    console.log("Converting And Storing at Supabase text as embedding Completed.");
}

// -------------------- Semantic Search --------------------
async function semanticSearch(queries){
    const results = await Promise.all(
        queries.map(async query => {
            try{
                const embeddingResponse = await hf.featureExtraction({
                    model: process.env.EMBED_MODEL,
                    inputs: query,
                });
                const embedding = Array.from(embeddingResponse);

                // ✅ Call match_movies function
                const { data, error } = await supabase.rpc("match_movies", {
                    query_embedding: embedding,
                    match_threshold: 0.50,
                    match_count: 1
                });

                if(error){
                    console.error(error);
                    throw error;
                }else{
                    console.log(data);
                }
                return { query , SimilarQuery : data[0].content };
            }catch(e){
                console.error(e);
                console.log("Semantic search operation failed");
                throw e;
            }
        })
    );
    return results;
}

// -------------------- Dynamic Response --------------------
async function dynamicResponse(queries){
    try{
        const contents = await semanticSearch(queries);
        const result = await Promise.all(
            contents.map(async content => {
                const messages = [
                    {
                        role:"system",
                        content:`You are an enthusiastic podcast expert who loves recommending podcasts to people.
                        You will be given two pieces of information - some context about podcasts episodes and a question. 
                        Your main job is to formulate a short answer to the question using the provided context. 
                        If you are unsure and cannot find the answer in the context, say, "Sorry, I don't know the answer." Please do not make up the answer.`
                    },
                    {
                        role:"user",
                        content:`context:${content.SimilarQuery},query:${content.query}`
                    }
                ];

                const response = await openAI.chat.completions.create({
                    model:process.env.AI_MODEL,
                    messages,
                });

                return response.choices[0].message.content;
            })
        ); 
        console.log(JSON.stringify(result,null,2));
    }catch(e){
        console.error(e);
    }
}

// -------------------- LangChain Text Splitter --------------------
async function splitDocument() {
  const filePath = path.resolve(__dirname, "movies.txt");
  const text = await fs.readFile(filePath, "utf-8");

  // Split into chunks
  const output = await splitter.createDocuments([text]);

  // Extract just the text content from each chunk
  const chunks = output.map(doc => doc.pageContent);

  // Insert into Supabase with embeddings
  await convertAndStoreEmbedding(chunks);

  console.log("✅ Split text inserted into Supabase movies table.");
}
splitDocument();