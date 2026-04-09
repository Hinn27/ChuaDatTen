import { callGemini } from './gemini.service.js'
import { semanticSearch } from './semantic.service.js'
import { supabase } from '../config/supabase.js'

/**
 * Gửi tin nhắn chat với RAG
 * @param {string} userId - ID người dùng
 * @param {string} message - Nội dung tin nhắn
 * @returns {Promise<object>} { response, relatedProducts }
 */
export async function sendChatMessage(userId, message) {
  try {
    // Bước 1: Tìm kiếm sản phẩm liên quan
    const relatedProducts = await semanticSearch(message, 5, 0.3)

    // Bước 2: Xây dựng context từ sản phẩm
    let productContext = ''
    if (relatedProducts && relatedProducts.length > 0) {
      productContext = '\n\nSản phẩm liên quan:\n'
      relatedProducts.forEach((product, index) => {
        productContext += `${index + 1}. ${product.name} - ${product.price.toLocaleString('vi-VN')}đ\n`
        productContext += `   Mô tả: ${product.description}\n`
      })
    }

    // Bước 3: Gọi Gemini với system prompt
    const systemPrompt = `Bạn là trợ lý bán hàng thân thiện của cửa hàng Refood. 
Hãy giúp khách hàng tìm kiếm, so sánh sản phẩm và trả lời câu hỏi về sản phẩm.
${productContext}
Hãy trả lời bằng tiếng Việt, thân thiện và hữu ích.`

    const response = await callGemini(
      `${systemPrompt}\n\nKhách hàng: ${message}`,
      { model: 'gemini-1.5-flash-latest' }
    )

    // Bước 4: Lưu tin nhắn vào lịch sử
    const { error: insertError } = await supabase.from('chat_history').insert({
      user_id: userId,
      message: message,
      response: response,
      related_products: relatedProducts.map((p) => ({ id: p.id, name: p.name })),
      created_at: new Date(),
    })

    if (insertError) {
      console.error('Error saving chat history:', insertError)
    }

    return {
      response,
      relatedProducts: relatedProducts || [],
    }
  } catch (error) {
    console.error('Chat service error:', error)
    throw error
  }
}

/**
 * Lấy lịch sử chat
 * @param {string} userId - ID người dùng
 * @param {number} page - Trang
 * @param {number} limit - Số lượng
 */
export async function getChatHistory(userId, page = 1, limit = 10) {
  try {
    const offset = (page - 1) * limit

    const { data, error, count } = await supabase
      .from('chat_history')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (error) throw error

    return {
      data: data || [],
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit),
      },
    }
  } catch (error) {
    console.error('Error fetching chat history:', error)
    throw error
  }
}

/**
 * Xóa lịch sử chat
 * @param {string} userId - ID người dùng
 */
export async function clearChatHistory(userId) {
  try {
    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', userId)

    if (error) throw error
  } catch (error) {
    console.error('Error clearing chat history:', error)
    throw error
  }
}

/**
 * Lấy các câu hỏi gợi ý
 */
export async function getSuggestedQuestions() {
  return [
    'Có sản phẩm nào giảm giá không?',
    'Tôi muốn mua đồ ăn vegan, có gợi ý không?',
    'Sản phẩm nào bán chạy nhất?',
    'Giao hàng mất bao lâu?',
    'Có chương trình khuyến mãi nào không?',
  ]
}
