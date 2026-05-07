/* import dotenv from 'dotenv';
import { Pool } from "pg";

dotenv.config({ path: "../.env" });

const pool = new Pool({
    connectionString: process.env.DB_P,
    ssl: {
        rejectUnauthorized: false
    }
});

export default pool;
 */
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_PUBLISHABLE_KEY! // Use Service Role for backend checks
);