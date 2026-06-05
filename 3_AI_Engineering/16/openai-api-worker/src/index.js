/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import openai from "openai";
export default {
	async fetch(request, env, ctx) {
		const openAI  = new openai({
			apiKey: env.OPENAI_API_KEY,
		});
		try{
			const messages = [
				{
					role: "system",
					content: `You are the Gift Genie!
						Make your gift suggestions thoughtful and practical.
						Your response must be under 100 words. 
						Skip intros and conclusions. 
						Only output gift suggestions.`,
				},
				{ role: "user", content: "I love music" },
    		];
			const response = await openAI.chat.completions.create({
			model: env.OPENAI_AI_MODEL,
			messages,
			});
			return new Response(JSON.stringify(response.choices[0].message.content));
		}catch(e){
			return new Response(e);
		}
	},
};
