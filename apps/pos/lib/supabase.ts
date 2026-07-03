import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:8000";

// Support both new (PUBLISHABLE_KEY) and old (ANON_KEY) naming conventions
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "dummy-key-for-local-dev";

export const supabase = createClient(supabaseUrl, supabaseKey);
