import { createOpenAI } from '@ai-sdk/openai';
import { createClient } from '@supabase/supabase-js'

if (!process.env.OPENAI_KEY) {
  throw new Error('Missing OPENAI_KEY environment variable');
}

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_KEY,
});

const supabasePrivateKey = process.env.SUPABASE_KEY;
if (!supabasePrivateKey) throw new Error(`SUPABASE_KEY is missing or invalid`);
const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`SUPABASE_URL is missing or invalid`);
export const supabase = createClient(url, supabasePrivateKey );