import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  // Keep the warning visible in dev but never throw — the page should still render.
  console.warn('Supabase env vars missing. Idea submission will be disabled.');
}

export const supabase = createClient(url ?? '', anonKey ?? '', {
  auth: { persistSession: false },
});

export type IdeaSubmission = {
  id: string;
  name: string;
  email: string;
  title: string;
  category: string;
  description: string;
  status: string;
  created_at: string;
};