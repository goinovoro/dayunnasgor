import { createClient } from "@supabase/supabase-js";

// Use standard local Supabase ports for the Dockerized instance
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:8000";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key-for-local-dev";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
