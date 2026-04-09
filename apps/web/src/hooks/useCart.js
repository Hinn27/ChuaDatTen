import { useCartStore } from '../stores/useCartStore'

/**
 * Custom hook cho giỏ hàng
 * @returns {Object} { items, addToCart, removeFromCart, updateCartItem, getTotalPrice, emptyCart, itemCount }
 */
export function useCart() {
    const items = useCartStore((state) => state.items)
    const addToCart = useCartStore((state) => state.addToCart)
    const removeFromCart = useCartStore((state) => state.removeFromCart)
    const updateCartItem = useCartStore((state) => state.updateCartItem)
    const getTotalPrice = useCartStore((state) => state.getTotalPrice)
    const emptyCart = useCartStore((state) => state.emptyCart)

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
