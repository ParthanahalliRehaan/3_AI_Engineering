import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { hf, supabase, openAI } from "./config.mjs";
import { query } from "./query.mjs";
import { embedIt } from "./content.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname,"../.env")});

async function convertAndStoreEmbedding(input){
    const result = await Promise.all(
        input.map(async textChunk => {
            const embeddingResponse = await hf.featureExtraction({
                model: process.env.EMBED_MODEL,
                inputs: textChunk,
            });
            const embedding = Array.from(embeddingResponse);
            const { data, error } = await supabase
                .from("embeddings")
                .insert({content:textChunk,embedding})
                .select();
            
            if(error){
                console.error(error);
            }else{
                console.log(data);
            }
            return { content:textChunk, embedding };
        })
    );
    console.log("Converting And Storing at Supabase text as embedding Completed.");
}
async function semanticSearch(queries){
    const results = await Promise.all(
        queries.map(async query => {
            const embeddingResponse = await hf.featureExtraction({
                model: process.env.EMBED_MODEL,
                inputs: textChunk,
            });
            const embedding = Array.from(embeddingResponse);
            const { data } = await supabase.rpc("match_embeddings",{
                query_embedding: embedding,
                match_threshold: 0.50,
                match_count: 1
            });
            return { query ,SimilarQuery : data[0].content};
        })
    );
    return results;
}
async function dynamicResponse(queries){
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
            ]
            const response = await openAI.chat.completions.create({
                model:process.env.AI_MODEL,
                messages,
            });
            return response.choices[0].message.content;
            })
    ); 
    console.log(JSON.stringify(result,null,2));
}
dynamicResponse(query);