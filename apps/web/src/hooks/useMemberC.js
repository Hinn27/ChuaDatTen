/**
 * useMemberC Hook
 * Custom hook for Member C product operations
 */
import { useCallback, useState } from 'react'
import api from '../services/api'

export function useMemberC() {
    const [profile, setProfile] = useState(null)
    const [products, setProducts] = useState([])
    const [currentProduct, setCurrentProduct] = useState(null)
    const [category, setCategory] = useState(null)
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [pagination, setPagination] = useState(null)

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/members/c/profile')
            setProfile(response.data.data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member C profile:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchCategory = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/members/c/category')
            setCategory(response.data.data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member C category:', err)
        } finally {
            setLoading(false)
        }
    }, [])

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
                `/members/c/products?${params.toString()}`
            )
            setProducts(response.data.data.products)
            setPagination(response.data.data.pagination)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member C products:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchProductById = useCallback(async (productId) => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get(`/members/c/products/${productId}`)
            setCurrentProduct(response.data.data.product)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member C product:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    const searchProducts = useCallback(async (query, limit = 10) => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get(
                `/members/c/products/search?q=${encodeURIComponent(query)}&limit=${limit}`
            )
            setProducts(response.data.data.results)
        } catch (err) {
            setError(err.message)
            console.error('Error searching Member C products:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    const fetchStatistics = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/members/c/stats')
            setStats(response.data.data)
        } catch (err) {
            setError(err.message)
            console.error('Error fetching Member C stats:', err)
        } finally {
            setLoading(false)
        }
    }, [])

    const validateOrder = useCallback(async (items) => {
        try {
            setError(null)
            const response = await api.post('/members/c/validate-order', { items })
            return response.data.data
        } catch (err) {
            setError(err.message)
            console.error('Error validating Member C order:', err)
            throw err
        }
    }, [])

    return {
        profile,
        products,
        currentProduct,
        category,
        stats,
        loading,
        error,
        pagination,

        fetchProfile,
        fetchCategory,
        fetchProducts,
        fetchProductById,
        searchProducts,
        fetchStatistics,
        validateOrder,
    }
}

export default useMemberC
