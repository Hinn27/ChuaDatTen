/**
 * useMemberB Hook
 * Custom hook for Member B product operations
 */
import { useCallback, useState } from 'react'
import api from '../services/api'

export function useMemberB() {
    const [profile, setProfile] = useState(null)
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)
    const [category, setCategory] = useState(null)
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState(null)

    /**
     * Fetch Member B profile
     */
    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/members/b/profile')
            setProfile(response.data.data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member B profile:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Fetch Member B category info
     */
    const fetchCategory = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/members/b/category')
            setCategory(response.data.data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member B category:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Fetch Member B products with filters
     */
    const fetchProducts = useCallback(async (filters = {}) => {
        try {
            setLoading(true)
            setError(null)
            const params = new URLSearchParams()

            if (filters.category) params.append('category', filters.category)
            if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice)
            if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice)
            if (filters.sortBy) params.append('sortBy', filters.sortBy)
            if (filters.page) params.append('page', filters.page)
            if (filters.limit) params.append('limit', filters.limit)

            const response = await api.get(
                `/members/b/products?${params.toString()}`
            )
            setProducts(response.data.data.products)
            setPagination(response.data.data.pagination)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member B products:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Fetch single Member B product
     */
    const fetchProductById = useCallback(async (productId) => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get(`/members/b/products/${productId}`)
            setCurrentProduct(response.data.data.product)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member B product:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Search Member B products
     */
    const searchProducts = useCallback(async (query, limit = 10) => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get(
                `/members/b/products/search?q=${encodeURIComponent(query)}&limit=${limit}`
            )
            setProducts(response.data.data.results)
        } catch (err) {
            setError(err.message)
            console.error('Error searching Member B products:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Fetch Member B statistics
     */
    const fetchStatistics = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/members/b/stats')
            setStats(response.data.data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member B stats:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    /**
     * Validate order for Member B
     */
    const validateOrder = useCallback(async (items) => {
        try {
            setError(null)
            const response = await api.post('/members/b/validate-order', { items })
            return response.data.data
        } catch (err) {
            setError(err.message)
            console.error('Error validating Member B order:', err)
            throw err
        }
    }, [])

    return {
        // State
        profile,
        products,
        currentProduct,
        category,
        stats,
        loading,
        error,
        pagination,

        // Methods
        fetchProfile,
        fetchCategory,
        fetchProducts,
        fetchProductById,
        searchProducts,
        fetchStatistics,
        validateOrder,
    }
}

export default useMemberB
