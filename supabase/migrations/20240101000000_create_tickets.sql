CREATE TABLE public.tickets (
  id text PRIMARY KEY,
  order_type text NOT NULL,
  status text NOT NULL DEFAULT 'RECEIVED',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on realtime for tickets
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table public.tickets;
