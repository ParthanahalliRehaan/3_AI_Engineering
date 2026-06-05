const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS (for your frontend)
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });
    if (request.method !== 'POST') return new Response(JSON.stringify({ error: `${request.method} method not allowed.`}), { status: 405, headers: corsHeaders });

    try {
      const { prompt } = await request.json();

      // 2. Send request DIRECTLY to Gateway using standard fetch
      /* Earlier we did this 
              import OpenAI from "openai";

              const client = new OpenAI({
                apiKey: "{OPENAI_API_KEY}",
                baseURL:
                  "https://gateway.ai.cloudflare.com/v1/d7297e3e5152a44ac5c13eaea4026f3d/openai-api/compat",
              });

              const response = await client.chat.completions.create({
                model: "openai/gpt-5",
                messages: [{ role: "user", content: "Hello, world!" }],
              });*/

      /* But now this when we go to /api/gift end point the wrker get invoked n uses this gateway bcz -
      
                Great observation — this happens because of how Cloudflare Workers bind to routes.  

                When you first deployed your Worker to the root (`/`), Cloudflare set up a route mapping like:

                ```
                example.com/*  →  Worker
                ```

                That means **all paths under your domain** (including `/`, `/api`, `/foo/bar`) were being intercepted by the Worker.  

                Later, when you changed the route to a specific endpoint (say `/api/*`), Cloudflare updated the mapping to:

                ```
                example.com/api/*  →  Worker
                ```

                But here’s the catch:  
                - If you didn’t remove the original root route, it’s still active. So the Worker continues to run at `/`.  
                - Even if you removed it, Cloudflare caches and propagates route changes across their edge network. Sometimes the old route can linger until propagation finishes.  
                - Also, if you’re testing with a custom domain or multiple zones, you might have overlapping routes (e.g., one at the root, one at `/api/*`), so the Worker still responds.

                👉 In short: your Worker is “still working” because either the root route is still mapped, or Cloudflare hasn’t fully propagated the change yet.  

                If you want it **only** on `/api/*`, you’ll need to:
                1. Go to your Cloudflare dashboard → Workers → Routes.  
                2. Delete the root (`/*`) route.  
                3. Keep only the `/api/*` route.  
                4. Wait a few minutes for propagation, then test again.

                */
    
      const response = await fetch("https://gateway.ai.cloudflare.com/v1/d7297e3e5152a44ac5c13eaea4026f3d/openai-api/openai/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: env.OPENAI_AI_MODEL,
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();
      
      // 3. Send the AI's reply back to your frontend
      return new Response(JSON.stringify({ reply: data.choices[0].message.content }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (e) {
      return new Response(JSON.stringify({ error: e.message }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }
  }
};