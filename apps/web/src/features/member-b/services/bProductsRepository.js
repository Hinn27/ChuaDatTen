import api from '../../../services/api.js'
import { B_MOCK_PRODUCTS } from '../data/bMockProducts.js'

/**
 * Repository cho flow member B.
 * Hien tai fallback mock, sau nay doi sang PostgreSQL API ma khong doi UI.
 */
export async function fetchBProducts() {
  try {
    const response = await api.get('/products', {
      params: { category: 'BunPho', member: 'b' },
    })

    const products = Array.isArray(response.data) ? response.data : []
    if (!products.length) {
      return { products: B_MOCK_PRODUCTS, source: 'mock' }
    }

    return { products, source: 'api' }
  } catch {
    return { products: B_MOCK_PRODUCTS, source: 'mock' }
  }
}

export async function fetchBProductById(id) {
  const { products, source } = await fetchBProducts()
  const product = products.find((item) => `${item.id}` === `${id}`) || null
  return { product, source }
}

