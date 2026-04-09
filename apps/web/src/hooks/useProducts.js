import { useProductStore } from '../stores/useProductStore'

/**
 * Custom hook cho sản phẩm
 */
export function useProducts() {
    const products = useProductStore((state) => state.products)
    const selectedProduct = useProductStore((state) => state.selectedProduct)
    const loading = useProductStore((state) => state.loading)
    const error = useProductStore((state) => state.error)
    const fetchProducts = useProductStore((state) => state.fetchProducts)
    const selectProduct = useProductStore((state) => state.selectProduct)
    const clearError = useProductStore((state) => state.clearError)

    return {
        products,
        selectedProduct,
        loading,
        error,
        fetchProducts,
        selectProduct,
        clearError,
    }
}

/**
 * Custom hook cho chi tiết sản phẩm
 */
export function useProductDetail() {
    const selectedProduct = useProductStore((state) => state.selectedProduct)
    const loading = useProductStore((state) => state.loading)
    const error = useProductStore((state) => state.error)
    const selectProduct = useProductStore((state) => state.selectProduct)

    return {
        product: selectedProduct,
        loading,
        error,
        selectProduct,
    }
}

/**
 * Custom hook cho tìm kiếm sản phẩm
 */
export function useSearchProducts() {
    const products = useProductStore((state) => state.products)
    const loading = useProductStore((state) => state.loading)
    const error = useProductStore((state) => state.error)
    const fetchProducts = useProductStore((state) => state.fetchProducts)

    const search = async (query) => {
        // Có thể thêm logic tìm kiếm từ API
        await fetchProducts()
        return products.filter(
            (p) => p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.description?.toLowerCase().includes(query.toLowerCase())
        )
    }

    return {
        search,
        loading,
        error,
    }
}
