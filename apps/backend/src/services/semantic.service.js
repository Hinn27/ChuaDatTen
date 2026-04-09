import { supabase } from '../config/supabase.js'

/**
 * Tìm kiếm ngữ nghĩa sản phẩm
 * @param {string} query - Truy vấn từ người dùng
 * @param {number} limit - Số lượng kết quả
 * @param {number} threshold - Ngưỡng độ tương đồng (0-1)
 */
export async function semanticSearch(query, limit = 10, threshold = 0.3) {
    try {
        // Gọi RPC function tìm kiếm
        const { data, error } = await supabase.rpc('semantic_search_products', {
            query_text: query,
            similarity_threshold: threshold,
            result_limit: limit,
        })

        if (error) {
            console.warn('RPC error, falling back to text search:', error)
            return fallbackTextSearch(query, limit)
        }

        return data || []
    } catch (error) {
        console.error('Semantic search error:', error)
        // Fallback to simple text search
        return fallbackTextSearch(query, limit)
    }
}

/**
 * Fallback: Tìm kiếm theo text thuần
 */
async function fallbackTextSearch(query, limit = 10) {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
            .eq('is_active', true)
            .limit(limit)

        if (error) throw error
        return data || []
    } catch (error) {
        console.error('Fallback search error:', error)
        return []
    }
}

/**
 * Tính cosine similarity
 */
export function cosineSimilarity(a, b) {
    if (a.length !== b.length) return 0

    let dotProduct = 0
    let normA = 0
    let normB = 0

    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i]
        normA += a[i] * a[i]
        normB += b[i] * b[i]
    }

    if (normA === 0 || normB === 0) return 0
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

/**
 * Tìm sản phẩm tương tự
 * @param {string} productId - ID sản phẩm
 * @param {number} topK - Số lượng kết quả
 */
export async function findSimilarProducts(productId, topK = 5) {
    try {
        // Lấy embedding của sản phẩm
        const { data: productEmbedding, error: embError } = await supabase
            .from('product_embeddings')
            .select('embedding')
            .eq('product_id', productId)
            .single()

        if (embError || !productEmbedding) {
            console.warn(`No embedding found for product ${productId}`)
            return []
        }

        // Tìm sản phẩm tương tự dựa trên embedding
        const { data: allEmbeddings, error: allError } = await supabase
            .from('product_embeddings')
            .select('product_id, embedding')
            .neq('product_id', productId)

        if (allError) throw allError

        // Tính similarity và sort
        const similarities = allEmbeddings.map((item) => ({
            product_id: item.product_id,
            similarity: cosineSimilarity(productEmbedding.embedding, item.embedding),
        }))

        const topProducts = similarities
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, topK)

        // Lấy dữ liệu sản phẩm
        const productIds = topProducts.map((p) => p.product_id)
        const { data: products } = await supabase
            .from('products')
            .select('*')
            .in('id', productIds)

        return products || []
    } catch (error) {
        console.error('Similar products search error:', error)
        return []
    }
}
