// Service cho Chatbot trả lời dựa trên data món ăn
import { supabase } from '../config/supabase.js';

export async function chatbotAnswer(question) {
    // Gọi semantic search để lấy các món ăn liên quan
    const { data, error } = await supabase.rpc('semantic_search_foods', { p_query: question });
    if (error) throw new Error(error.message);
    // Giả sử lấy top 1 món ăn phù hợp nhất để trả lời
    if (!data || data.length === 0) return 'Xin lỗi, tôi chưa có thông tin phù hợp.';
    const food = data[0];
    // Tạo câu trả lời dựa trên thông tin món ăn
    return `Món ăn phù hợp: ${food.name}. Mô tả: ${food.description}`;
}
