import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Chìa khóa vạn năng, không bao giờ gửi xuống Frontend

export const supabase = supabaseUrl && supabaseServiceKey
	? createClient(supabaseUrl, supabaseServiceKey)
	: null;
