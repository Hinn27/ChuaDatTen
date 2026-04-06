// Service cho Chatbot trả lời dựa trên data món ăn
import { supabase } from '../config/supabase.js';
import { generateText } from './ai.service.js';

/**
 * Lay du lieu mon an lien quan tu semantic search.
 * @param {string} question
 * @returns {Promise<Array<{name?: string, description?: string, price?: number}>>}
 */
async function getSemanticFoods(question) {
    if (!supabase) {
        return [];
    }
    const { data, error } = await supabase.rpc('semantic_search_foods', { p_query: question });
    if (error) {
        return [];
    }
    return Array.isArray(data) ? data : [];
}

/**
 * Tao fallback markdown neu khong goi duoc AI.
 * @param {Array<{name?: string, description?: string, price?: number}>} foods
 * @returns {string}
 */
function createFallbackAnswer(foods) {
    if (!foods.length) {
        return [
            'Chào bạn. Mình đang sẵn sàng hỗ trợ tìm món cho bạn.',
            '',
            'Bạn có thể hỏi theo mẫu:',
            '- **Gợi ý món dưới 100k**',
            '- **Món ăn nhẹ buổi tối**',
            '- **Món cay, ít dầu mỡ**',
        ].join('\n');
    }

    const topFoods = foods.slice(0, 3);
    const lines = topFoods.map((food, index) => {
        const price = Number(food?.price || 0);
        const safePrice = Number.isFinite(price) && price > 0 ? ` - **${price.toLocaleString('vi-VN')}đ**` : '';
        return `${index + 1}. **${food?.name || 'Món ăn'}**${safePrice}\n   - ${food?.description || 'Món ăn đang được nhiều người quan tâm.'}`;
    });

    return `Mình gợi ý cho bạn một số món:\n\n${lines.join('\n')}`;
}

/**
 * Chuyen loi tu AI sang thong diep than thien cho nguoi dung.
 * @param {unknown} error
 * @returns {string}
 */
function formatAiErrorMessage(error) {
    const raw = String(error?.message || 'Unknown error').toLowerCase();

    if (raw.includes('429') || raw.includes('quota') || raw.includes('resource_exhausted')) {
        return 'AI đang tạm hết quota của key hiện tại. Bạn cần bật billing hoặc dùng key khác còn quota.';
    }

    if (raw.includes('401') || raw.includes('403') || raw.includes('api key')) {
        return 'AI key chưa hợp lệ hoặc bị giới hạn quyền truy cập. Vui lòng kiểm tra lại cấu hình key.';
    }

    if (raw.includes('404') || raw.includes('model')) {
        return 'Model AI hiện tại chưa khả dụng với key này. Đang dùng fallback để không gián đoạn trải nghiệm.';
    }

    return 'AI đang tạm thời gặp lỗi kết nối. Đang chuyển sang chế độ gợi ý fallback.';
}

export async function chatbotAnswer(question) {
    const safeQuestion = String(question || '').trim();
    if (!safeQuestion) {
        return 'Bạn hãy nhập câu hỏi cụ thể hơn, ví dụ: "Gợi ý món dưới 100k".';
    }

    const foods = await getSemanticFoods(safeQuestion);
    const contextFoods = foods.slice(0, 5);

    if (!process.env.GOOGLE_API_KEY) {
        return [
            'Hiện AI chưa được bật vì backend chưa có `GOOGLE_API_KEY`.',
            '',
            'Bạn thêm key vào env backend và khởi động lại server để dùng trả lời AI thực sự.',
            '',
            createFallbackAnswer(contextFoods),
        ].join('\n');
    }

    const foodContext = contextFoods.length
        ? contextFoods
            .map((food, index) => `- ${index + 1}. ${food?.name || 'Mon an'}: ${food?.description || 'Khong co mo ta'}; gia: ${food?.price || 'N/A'}`)
            .join('\n')
        : '- Khong co du lieu mon an lien quan tu CSDL.';

    const prompt = [
        'Ban la tro ly AI cho ung dung dat mon Refood.',
        'Tra loi bang tieng Viet co dau, than thien, ngan gon.',
        'Neu phu hop, su dung markdown voi danh sach hoac in dam.',
        `Cau hoi nguoi dung: ${safeQuestion}`,
        'Du lieu mon an tham khao tu he thong:',
        foodContext,
    ].join('\n\n');

    try {
        return await generateText(prompt);
    } catch (error) {
        return [
            formatAiErrorMessage(error),
            '',
            'Đang hiển thị gợi ý fallback:',
            '',
            createFallbackAnswer(contextFoods),
        ].join('\n');
    }
}
