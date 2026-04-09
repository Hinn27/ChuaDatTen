import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai'

const client = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_KEY)

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DEROGATORY,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_VIOLENCE,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUAL,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_MEDICAL,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
]

/**
 * Gọi Gemini API an toàn
 * @param {string} prompt - Nội dung prompt
 * @param {object} options - Tùy chọn (model, temperature, etc)
 * @returns {Promise<string>} Nội dung phản hồi
 */
export async function callGemini(prompt, options = {}) {
    try {
        const model = client.getGenerativeModel({
            model: options.model || 'gemini-1.5-flash-latest',
            safetySettings,
        })

        const response = await model.generateContent(prompt)
        return response.response.text()
    } catch (error) {
        console.error('Gemini API error:', error)
        throw new Error(`Gemini API error: ${error.message}`)
    }
}

/**
 * Tạo embedding cho text
 * @param {string} text - Text cần embedding
 * @returns {Promise<Array<number>>} Mảng embedding (768 chiều)
 */
export async function generateEmbedding(text) {
    try {
        const model = client.getGenerativeModel({ model: 'embedding-001' })

        const result = await model.embedContent(text)
        return result.embedding.values
    } catch (error) {
        console.error('Embedding error:', error)
        throw new Error(`Embedding error: ${error.message}`)
    }
}

/**
 * Tạo embedding bulk
 * @param {Array<string>} texts - Mảng text
 * @returns {Promise<Array<Array<number>>>} Mảng embeddings
 */
export async function batchGenerateEmbeddings(texts) {
    try {
        const model = client.getGenerativeModel({ model: 'embedding-001' })

        const result = await model.batchEmbedContents({
            requests: texts.map((text) => ({
                content: { parts: [{ text }] },
            })),
        })

        return result.embeddings.map((e) => e.values)
    } catch (error) {
        console.error('Batch embedding error:', error)
        throw new Error(`Batch embedding error: ${error.message}`)
    }
}
