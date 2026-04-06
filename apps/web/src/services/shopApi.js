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
