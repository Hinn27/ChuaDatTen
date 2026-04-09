import { useProductStore } from '../stores/useProductStore'

/**
 * Custom hook cho sản phẩm
 */
export function useProducts() {
    const { products, selectedProduct, loading, error, fetchProducts, selectProduct, clearError } =
        useProductStore()

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
    const { selectedProduct, loading, error, selectProduct } = useProductStore()

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
    const { products, loading, error, fetchProducts } = useProductStore()

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
