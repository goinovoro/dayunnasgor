-- Create the enum for order status
CREATE TYPE order_status AS ENUM ('RECEIVED', 'PREPPING', 'STAGED', 'READY');

-- Create the orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  "tableNumber" TEXT NOT NULL,
  status order_status DEFAULT 'RECEIVED' NOT NULL,
  items JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) but allow anonymous read/write for now
-- (In a real production app with users, you would restrict this)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access" 
ON orders FOR SELECT 
TO anon 
USING (true);

CREATE POLICY "Allow anonymous insert access" 
ON orders FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Allow anonymous update access" 
ON orders FOR UPDATE 
TO anon 
USING (true);

-- Enable Realtime for the orders table
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
