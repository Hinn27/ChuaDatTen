import { create } from 'zustand'

const EMPTY_ITEMS = []

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
  activeMember: 'a',
  itemsByMember: {},

  /** @type {CartItem[]} */
  get items() {
    const { activeMember, itemsByMember } = get()
    return itemsByMember[activeMember] || EMPTY_ITEMS
  },

  /**
   * Đổi member đang thao tác để tách flow giỏ hàng theo từng bạn.
   * @param {string} member
   */
  setActiveMember: (member) => {
    const safeMember = member || 'a'
    set((state) => ({
      activeMember: safeMember,
      itemsByMember: {
        ...state.itemsByMember,
        [safeMember]: state.itemsByMember[safeMember] || [],
      },
    }))
  },

  /**
   * Thêm sản phẩm vào giỏ. Nếu đã có thì tăng quantity.
   * @param {CartItem} product
   */
  addItem: (product, member) => {
    const activeMember = member || get().activeMember
    const items = get().itemsByMember[activeMember] || []
    const existingIndex = items.findIndex((item) => item.id === product.id)

    if (existingIndex >= 0) {
      const updatedItems = [...items]
      updatedItems[existingIndex] = {
        ...updatedItems[existingIndex],
        quantity: updatedItems[existingIndex].quantity + 1,
      }
      set((state) => ({
        itemsByMember: {
          ...state.itemsByMember,
          [activeMember]: updatedItems,
        },
      }))
    } else {
      set((state) => ({
        itemsByMember: {
          ...state.itemsByMember,
          [activeMember]: [...items, { ...product, quantity: 1 }],
        },
      }))
    }
  },

  /**
   * Xóa sản phẩm khỏi giỏ
   * @param {string|number} productId
   */
  removeItem: (productId, member) => {
    const activeMember = member || get().activeMember
    const items = get().itemsByMember[activeMember] || []
    set((state) => ({
      itemsByMember: {
        ...state.itemsByMember,
        [activeMember]: items.filter((item) => item.id !== productId),
      },
    }))
  },

  /**
   * Cập nhật số lượng sản phẩm
   * @param {string|number} productId
   * @param {number} quantity - Số lượng mới (nếu <= 0 sẽ xóa)
   */
  updateQuantity: (productId, quantity, member) => {
    const activeMember = member || get().activeMember
    if (quantity <= 0) {
      get().removeItem(productId, activeMember)
      return
    }
    const items = get().itemsByMember[activeMember] || []
    const updatedItems = items.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    )
    set((state) => ({
      itemsByMember: {
        ...state.itemsByMember,
        [activeMember]: updatedItems,
      },
    }))
  },

  /**
   * Xóa toàn bộ giỏ hàng
   */
  clearCart: (member) => {
    const activeMember = member || get().activeMember
    set((state) => ({
      itemsByMember: {
        ...state.itemsByMember,
        [activeMember]: [],
      },
    }))
  },

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
  getTotalPrice: (member) => {
    const activeMember = member || get().activeMember
    const items = get().itemsByMember[activeMember] || []
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  },

  /**
   * Helper: Tính tổng số lượng
   * @returns {number}
   */
  getTotalItems: (member) => {
    const activeMember = member || get().activeMember
    const items = get().itemsByMember[activeMember] || []
    return items.reduce((sum, item) => sum + item.quantity, 0)
  },

  // Backward-compatible aliases for existing hooks/components
  addToCart: (product, quantity = 1, member) => {
    const safeQuantity = Number.isFinite(quantity) ? Math.max(1, Math.floor(quantity)) : 1
    for (let index = 0; index < safeQuantity; index += 1) {
      get().addItem(product, member)
    }
  },

  removeFromCart: (productId, member) => {
    get().removeItem(productId, member)
  },

  updateCartItem: (productId, quantity, member) => {
    get().updateQuantity(productId, quantity, member)
  },

  emptyCart: (member) => {
    get().clearCart(member)
  },
}))

export { useCartStore }
export default useCartStore
