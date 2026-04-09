/**
 * Member B API Service
 * Centralized API calls for Member B operations
 */
import api from './api'

const BASE_URL = '/members/b'

export const memberBAPI = {
    /**
     * Get Member B profile and configuration
     */
    getProfile: () => api.get(`${BASE_URL}/profile`),

    /**
     * Get Member B category information
     */
    getCategory: () => api.get(`${BASE_URL}/category`),

    /**
     * Get Member B products with filters
     */
    getProducts: (filters = {}) => {
        const params = new URLSearchParams()
        if (filters.category) params.append('category', filters.category)
        if (filters.minPrice !== undefined) params.append('minPrice', filters.minPrice)
        if (filters.maxPrice !== undefined) params.append('maxPrice', filters.maxPrice)
        if (filters.sortBy) params.append('sortBy', filters.sortBy)
        if (filters.page) params.append('page', filters.page)
        if (filters.limit) params.append('limit', filters.limit)

        return api.get(`${BASE_URL}/products?${params.toString()}`)
    },

    /**
     * Get single Member B product
     */
    getProductById: (productId) => api.get(`${BASE_URL}/products/${productId}`),

    /**
     * Search Member B products
     */
    searchProducts: (query, limit = 10) =>
        api.get(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`),

    /**
     * Get related products for Member B
     */
    getRelatedProducts: (productId, limit = 4) =>
        api.get(`${BASE_URL}/products/${productId}/related?limit=${limit}`),

    /**
     * Get Member B statistics
     */
    getStatistics: () => api.get(`${BASE_URL}/stats`),

    /**
     * Validate order for Member B
     */
    validateOrder: (items) => api.post(`${BASE_URL}/validate-order`, { items }),
}

export default memberBAPI
