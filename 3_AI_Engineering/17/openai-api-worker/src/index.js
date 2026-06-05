const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

import openai from "openai";

export default {
  async fetch(request, env, ctx) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const { prompt } = await request.json();

      const openAI = new openai({ apiKey: env.OPENAI_API_KEY });

      const messages = [
        {
          role: "system",
          content: `You are the Gift Genie!
            Make your gift suggestions thoughtful and practical.
            Your response must be under 100 words. 
            Skip intros and conclusions. 
            Only output gift suggestions.`,
        },
        { role: "user", content: prompt },
      ];

      const response = await openAI.chat.completions.create({
        model: env.OPENAI_AI_MODEL,
        messages,
      });

      return new Response(
        JSON.stringify({ reply: response.choices[0].message.content }),
        { headers: corsHeaders }
      );
    } catch (e) {
      return new Response(
        JSON.stringify({ error: e.message }),
        { headers: corsHeaders }
      );
    }
  },
};