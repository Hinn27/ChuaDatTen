import { useCartStore } from '../stores/useCartStore'

/**
 * Custom hook cho giỏ hàng
 * @returns {Object} { items, addToCart, removeFromCart, updateCartItem, getTotalPrice, emptyCart, itemCount }
 */
export function useCart() {
    const { items, addToCart, removeFromCart, updateCartItem, getTotalPrice, emptyCart } = useCartStore()

    return {
        items,
        itemCount: items.length,
        addToCart,
        removeFromCart,
        updateCartItem,
        getTotalPrice,
        emptyCart,
    }
}
