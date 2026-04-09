import { MOCK_PRODUCTS } from '../shared/constants/mockProducts.js'
import api from './api.js'

const useBackendInDev = import.meta.env.VITE_USE_BACKEND === 'true'
const shouldUseMockData = import.meta.env.DEV && !useBackendInDev

function toSafeProduct(item) {
  return {
    id: item.id,
    name: item.name,
    category: item.category || 'Khac',
    price: Number(item.price) || 0,
    originalPrice: Number(item.originalPrice) || Number(item.price) || 0,
    image: item.image,
    soldQuantity: Number(item.soldQuantity) || 0,
  }
}

/**
 * Lay danh sach san pham.
 * @param {Object} params
 * @returns {Promise<{items: object[], meta: object}>}
 */
export async function fetchProducts(params = {}) {
  if (shouldUseMockData) {
    return {
      items: MOCK_PRODUCTS.map(toSafeProduct),
      meta: { page: 1, limit: MOCK_PRODUCTS.length, total: MOCK_PRODUCTS.length },
    }
  }
  const response = await api.get('/products', { params })
  return response.data?.data || { items: [], meta: { page: 1, limit: 20, total: 0 } }
}

/**
 * Lay thong ke mon ban chay toan bo va theo tung danh muc.
 * @param {{globalLimit?: number, categoryLimit?: number}} params
 */
export async function fetchBestsellerStats(params = {}) {
  if (shouldUseMockData) {
    const globalTopSellers = MOCK_PRODUCTS
      .map(toSafeProduct)
      .sort((a, b) => b.soldQuantity - a.soldQuantity)
      .slice(0, Number(params.globalLimit) || 4)

    const byCategory = new Map()
    for (const item of globalTopSellers) {
      if (!byCategory.has(item.category)) {
        byCategory.set(item.category, item)
      }
    }

    return { globalTopSellers, topByCategory: Array.from(byCategory.values()) }
  }
  const response = await api.get('/products/stats/bestsellers', { params })
  return response.data?.data || { globalTopSellers: [], topByCategory: [] }
}

/**
 * Lay thong ke bestseller theo 3 regions: Bac, Trung, Nam.
 * @param {{limit?: number}} params
 */
export async function fetchRegionalBestsellerStats(params = {}) {
  if (shouldUseMockData) {
    const regional = [
      { region: 'Mien Bac', highlight: 'Com', description: 'Top mon ban chay', tone: 'north', route: '/a/products', image: MOCK_PRODUCTS[0]?.image, products: MOCK_PRODUCTS.slice(0, 3).map(toSafeProduct) },
      { region: 'Mien Trung', highlight: 'Bun/Mi/Pho', description: 'Top mon ban chay', tone: 'central', route: '/b/products', image: MOCK_PRODUCTS[1]?.image, products: MOCK_PRODUCTS.slice(3, 6).map(toSafeProduct) },
      { region: 'Mien Nam', highlight: 'Do chien', description: 'Top mon ban chay', tone: 'south', route: '/c/products', image: MOCK_PRODUCTS[2]?.image, products: MOCK_PRODUCTS.slice(6, 9).map(toSafeProduct) },
    ].slice(0, Number(params.limit) || 3)

    return { regional }
  }
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
