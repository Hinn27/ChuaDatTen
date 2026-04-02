import { create } from 'zustand'

/**
 * @typedef {Object} CartItem
 * @property {string|number} id - Product ID
 * @property {string} name
 * @property {number} price
 * @property {number} quantity
 * @property {string} image
 */

/**
 * Cart Store — quản lý giỏ hàng
 * State thêm/bớt số lượng bằng Zustand
 */
const useCartStore = create((set, get) => ({
  /** @type {CartItem[]} */
  items: [],

  /**
   * Thêm sản phẩm vào giỏ. Nếu đã có thì tăng quantity.
   * @param {CartItem} product
   */
  addItem: (product) => {
    const { items } = get()
    const existingIndex = items.findIndex((item) => item.id === product.id)

    if (existingIndex >= 0) {
      const updatedItems = [...items]
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1,
      }
      set({ items: updatedItems })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  /**
   * Xóa sản phẩm khỏi giỏ
   * @param {string|number} productId
   */
  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.id !== productId) })
  },

  /**
   * Cập nhật số lượng sản phẩm
   * @param {string|number} productId
   * @param {number} quantity - Số lượng mới (nếu <= 0 sẽ xóa)
   */
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    const updatedItems = get().items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
    set({ items: updatedItems })
  },

  /**
   * Xóa toàn bộ giỏ hàng
   */
  clearCart: () => set({ items: [] }),

  /**
   * Tổng số lượng sản phẩm trong giỏ
   * @returns {number}
   */
  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },

  /**
   * Tổng tiền
   * @returns {number}
   */
  get totalPrice() {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  /**
   * Helper: Tính tổng tiền (dùng khi computed getter không hoạt động)
   * @returns {number}
   */
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  /**
   * Helper: Tính tổng số lượng
   * @returns {number}
   */
  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))

export default useCartStore
