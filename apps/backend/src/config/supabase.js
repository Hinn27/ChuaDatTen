import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Chìa khóa vạn năng, không bao giờ gửi xuống Frontend

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
