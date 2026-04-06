import api from './api.js'

/**
 * Lay danh sach san pham.
 * @param {Object} params
 * @returns {Promise<{items: object[], meta: object}>}
 */
export async function fetchProducts(params = {}) {
  const response = await api.get('/products', { params })
  return response.data?.data || { items: [], meta: { page: 1, limit: 20, total: 0 } }
}

/**
 * Lay thong ke mon ban chay toan bo va theo tung danh muc.
 * @param {{globalLimit?: number, categoryLimit?: number}} params
 */
export async function fetchBestsellerStats(params = {}) {
  const response = await api.get('/products/stats/bestsellers', { params })
  return response.data?.data || { globalTopSellers: [], topByCategory: [] }
}

/**
 * Lay thong ke bestseller theo 3 regions: Bac, Trung, Nam.
 * @param {{limit?: number}} params
 */
export async function fetchRegionalBestsellerStats(params = {}) {
  const response = await api.get('/products/stats/regional-bestsellers', { params })
  return response.data?.data || { regional: [] }
}

/**
 * Dat hang.
 * @param {{items: Array<{productId: string, quantity: number}>, total: number}} payload
 * @returns {Promise<object>}
 */
export async function checkoutOrder(payload) {
  const response = await api.post('/orders/checkout', payload)
  return response.data
}

/**
 * Gui cau hoi cho chatbot.
 * @param {string} message
 * @returns {Promise<string>}
 */
export async function askChat(message) {
  const response = await api.post('/chat', { question: message })
  return response.data?.answer || ''
}
