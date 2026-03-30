import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

/**
 * Supabase client instance
 * Dùng cho Auth, Database, Storage
 * @see https://supabase.com/docs/reference/javascript
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
