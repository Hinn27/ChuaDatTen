import { generateEmbedding, batchGenerateEmbeddings } from './gemini.service.js'
import { supabase } from '../config/supabase.js'

/**
 * Tạo và lưu embedding cho sản phẩm
 * @param {string} productId - ID sản phẩm
 * @param {string} name - Tên sản phẩm
 * @param {string} description - Mô tả sản phẩm
 */
export async function generateAndSaveEmbedding(productId, name, description) {
  try {
    const text = `${name} ${description}`
    const embedding = await generateEmbedding(text)

    // Lưu vào Supabase
    const { error } = await supabase.from('product_embeddings').upsert({
      product_id: productId,
      embedding: embedding,
      updated_at: new Date(),
    })

    if (error) throw error

    console.log(`Embedding saved for product ${productId}`)
  } catch (error) {
    console.error('Error saving embedding:', error)
    throw error
  }
}

/**
 * Tạo lại embedding cho tất cả sản phẩm
 */
export async function regenerateAllEmbeddings() {
  try {
    // Lấy tất cả sản phẩm hoạt động
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, description')
      .eq('is_active', true)

    if (error) throw error

    if (!products || products.length === 0) {
      console.log('No products to embed')
      return
    }

    // Tạo embeddings bulk
    const texts = products.map((p) => `${p.name} ${p.description}`)
    const embeddings = await batchGenerateEmbeddings(texts)

    // Lưu batch
    const embeddingRecords = products.map((p, i) => ({
      product_id: p.id,
      embedding: embeddings[i],
      updated_at: new Date(),
    }))

    const { error: insertError } = await supabase
      .from('product_embeddings')
      .upsert(embeddingRecords)

    if (insertError) throw insertError

    console.log(`Regenerated embeddings for ${products.length} products`)
  } catch (error) {
    console.error('Error regenerating embeddings:', error)
    throw error
  }
}

/**
 * Callback khi sản phẩm thay đổi
 */
export async function updateProductEmbeddingOnChange(productId, name, description) {
  try {
    await generateAndSaveEmbedding(productId, name, description)
  } catch (error) {
    console.error('Error updating product embedding:', error)
    // Không throw để không ảnh hưởng đến flow chính
  }
}
