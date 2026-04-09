import { create } from 'zustand'
import api from '../services/api.js'
import { CATEGORIES } from '../shared/constants/categories.js'
import { MOCK_PRODUCTS } from '../shared/constants/mockProducts.js'

const useBackendInDev = import.meta.env.VITE_USE_BACKEND === 'true'
const shouldUseMockData = import.meta.env.DEV && !useBackendInDev

/**
 * @typedef {Object} Product
 * @property {string|number} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number} [originalPrice]
 * @property {string} image
 * @property {string} category
 * @property {number} [purchaseCount] - Số lượt mua
 * @property {number} [purchaseCountChange] - Mức tăng lượt mua (dùng cho Best Selling)
 * @property {number} [similarityScore] - Điểm cosine similarity (dùng cho Search)
 */

/**
 * Product Store — quản lý danh sách sản phẩm
 */
const useProductStore = create((set, get) => ({
  /** @type {Product[]} */
  products: [],
  /** @type {Product|null} */
  selectedProduct: null,
  /** @type {Product[]} */
  bestSellingItems: [],
  selectedCategory: 'all',
  usingMockData: false,
  loading: false,
  /** @type {string|null} */
  error: null,

  /**
   * Lấy danh sách tất cả sản phẩm
   */
  fetchProducts: async () => {
    set({ loading: true, error: null })
    if (shouldUseMockData) {
      set({
        products: MOCK_PRODUCTS,
        selectedProduct: get().selectedProduct,
        usingMockData: true,
        error: null,
        loading: false,
      })
      return
    }
    try {
      const response = await api.get('/products')
      const products = Array.isArray(response.data) ? response.data : []
      set({ products, usingMockData: false, loading: false })
    } catch (error) {
      // Fallback mock giúp nhóm vẫn demo đủ flow khi product API chưa sẵn sàng.
      set({
        products: MOCK_PRODUCTS,
        selectedProduct: get().selectedProduct,
        usingMockData: true,
        error: null,
        loading: false,
      })
    }
  },

  /**
   * Lấy chi tiết 1 sản phẩm
   * @param {string|number} productId
   */
  fetchProductById: async (productId) => {
    set({ loading: true, error: null })
    if (shouldUseMockData) {
      const fallback = get().products.find((p) => `${p.id}` === `${productId}`)
      const mockMatch = fallback || MOCK_PRODUCTS.find((p) => `${p.id}` === `${productId}`) || null
      set({ selectedProduct: mockMatch, usingMockData: true, error: null, loading: false })
      return
    }
    try {
      const response = await api.get(`/products/${productId}`)
      set({ selectedProduct: response.data, usingMockData: false, loading: false })
    } catch (error) {
      const fallback = get().products.find((p) => `${p.id}` === `${productId}`)
      if (fallback) {
        set({ selectedProduct: fallback, usingMockData: true, error: null, loading: false })
        return
      }
      const mockMatch = MOCK_PRODUCTS.find((p) => `${p.id}` === `${productId}`)
      if (mockMatch) {
        set({ selectedProduct: mockMatch, usingMockData: true, error: null, loading: false })
        return
      }
      set({ error: error.message, loading: false })
    }
  },

  /**
   * Lấy danh sách sản phẩm bán chạy nhất (tự sắp xếp theo purchaseCountChange)
   */
  fetchBestSelling: async () => {
    set({ loading: true, error: null })
    if (shouldUseMockData) {
      const sorted = [...MOCK_PRODUCTS].sort((a, b) => (b.purchaseCountChange || 0) - (a.purchaseCountChange || 0))
      set({ bestSellingItems: sorted, usingMockData: true, loading: false })
      return
    }
    try {
      const response = await api.get('/products/best-selling')
      const sorted = response.data.sort(
        (a, b) => (b.purchaseCountChange || 0) - (a.purchaseCountChange || 0)
      )
      set({ bestSellingItems: sorted, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  /**
   * Set selected product (không cần gọi API)
   * @param {Product|null} product
   */
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  /**
   * Chọn category cho trang sản phẩm
   * @param {string} category
   */
  setCategory: (category) => set({ selectedCategory: category || 'all' }),

  /**
   * Danh sách category sắp xếp gọn để render chips/tabs
   * @returns {string[]}
   */
  getCategories: () => {
    const categories = new Set(get().products.map((product) => product.category).filter(Boolean))
    const ordered = CATEGORIES.filter((category) => categories.has(category))
    const extra = Array.from(categories).filter((category) => !CATEGORIES.includes(category))
    return ['all', ...ordered, ...extra]
  },

  /**
   * Danh sách product đã filter theo category
   * @returns {Product[]}
   */
  getFilteredProducts: () => {
    const { products, selectedCategory } = get()
    if (selectedCategory === 'all') return products
    return products.filter((product) => product.category === selectedCategory)
  },

  /**
   * Xóa lỗi
   */
  clearError: () => set({ error: null }),
}))

export { useProductStore }
export default useProductStore
