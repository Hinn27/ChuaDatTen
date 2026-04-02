// Service cho tìm kiếm ngữ nghĩa (ví dụ sử dụng pgvector hoặc embedding Supabase)
import { supabase } from '../config/supabase.js';

export async function semanticSearch(query) {
    // Giả sử có bảng 'foods' với cột 'embedding' (vector)
    // Gọi Supabase function hoặc RESTful API để tìm kiếm ngữ nghĩa
    const { data, error } = await supabase.rpc('semantic_search_foods', { p_query: query });
    if (error) throw new Error(error.message);
    return data;
}
