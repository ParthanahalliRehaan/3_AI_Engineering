# 🎯 Jibun — Refined Proposal
## 📛 Project Name
**Jibun** (Japanese: 自分 — "self")  
- **Why?** It centers on *personal agency*. Unlike generic "study buddy" apps, Jibun positions the user as the protagonist of their own learning journey. The agent doesn't teach you — it *unlocks* you. Short, distinctive, and globally pronounceable.

---

## 🛠️ Tech Stack (Chosen)

| Layer                    | Technology                          |
|--------------------------|-------------------------------------|
| **Orchestration**        | **LangGraph**                       | 
| **Frontend**             | **Vercel AI SDK + Next.js**         | 
| **Database**             | **Supabase (Postgres + pgvector)**  | 
| **Backend / Scheduling** | **Cloudflare Workers**              |
| **LLM Inference**        | **Groq API**                        | 
| **Embeddings**           | **BAAI/bge-large-en-v1.5**          |
---

## 🧠 Why This Stack Wins

| Competitor Approach | Jibun's Edge |
|---------------------|--------------|
| Simple cron + static UI | LangGraph agents *remember* your last error and follow up: "Still stuck on that React hydration bug?" |
| Generic LLM chat | RAG over your *actual* project files + study history = hyper-personalized fixes |
| Desktop-only (Tauri/Electron) | Web-first = instant access across devices, no install friction, still PWA-installable |

---

## 🔄 Architecture Flow

1. **Study Session Starts** → User opens Next.js dashboard.
2. **File Monitor Agent** (LangGraph node) watches project folder via Cloudflare Worker → detects new errors.
3. **Error Context Retrieval** → Embeddings of user's codebase queried from Supabase pgvector → relevant files fetched.
4. **Groq Fix Generation** → LLM parses error + context → streaming fix suggestion via Vercel AI SDK.
5. **Motivation Agent** (LangGraph node) checks study streak in Supabase → injects personalized nudge if burnout pattern detected.
6. **Reminder Agent** (LangGraph node) → Cloudflare cron pushes scheduled review prompt.

---

## ⚙️ Configurable Parameters
- `reminder_frequency`: How aggressive the nudges are.
- `error_sensitivity`: File-monitor trigger threshold (file size delta, error keyword match).
- `motivation_style`: Roasting / Encouraging / Zen.
- `context_depth`: How many past errors/study sessions to include in LLM prompt.

---

## 📊 Example Use Case

- **Input**: User coding a Next.js project, hits a hydration error.
- **File Monitor**: Detects `error.log` change.
- **Retrieval**: Embeddings fetch `page.tsx`, `layout.tsx`, `next.config.js` from Supabase.
- **Groq**: Generates fix: *"Wrap your client component with `<Suspense>` and move the data fetch to a Server Component."*
- **Motivation**: *"3rd hydration bug this week — you're mastering this pattern. One more and you unlock the 'Hydration Hero' badge."*
- **Reminder**: Cron schedules a "review hydration patterns" flashcard for tomorrow 9 AM.

---

## 🚀 Suggested Roadmap

| Phase       | Deliverable                       | Stack Focus                                                      |
|-------------|-----------------------------------|------------------------------------------------------------------|
| **Phase 1** | Smart Reminders + Streak Tracker  | Cloudflare cron + Supabase real-time + Next.js dashboard         |
| **Phase 2** | File Monitor + Error Spotting     | LangGraph agent + Groq + Supabase pgvector embeddings            |
| **Phase 3** | Motivational Agent + Gamification | LangGraph multi-agent orchestration + Vercel AI SDK streaming UI |
