import { create } from 'zustand'
import api from '../services/api.js'

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
  loading: false,
  /** @type {string|null} */
  error: null,

  /**
   * Lấy danh sách tất cả sản phẩm
   */
  fetchProducts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get('/products')
      set({ products: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  /**
   * Lấy chi tiết 1 sản phẩm
   * @param {string|number} productId
   */
  fetchProductById: async (productId) => {
    set({ loading: true, error: null })
    try {
      const response = await api.get(`/products/${productId}`)
      set({ selectedProduct: response.data, loading: false })
    } catch (error) {
      set({ error: error.message, loading: false })
    }
  },

  /**
   * Lấy danh sách sản phẩm bán chạy nhất (tự sắp xếp theo purchaseCountChange)
   */
  fetchBestSelling: async () => {
    set({ loading: true, error: null })
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
   * Xóa lỗi
   */
  clearError: () => set({ error: null }),
}))

export default useProductStore
