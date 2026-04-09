/**
 * Member B Store
 * Zustand store for Member B state management
 */
import { create } from 'zustand'
import memberBAPI from '../services/memberB.api'

const useMemberBStore = create((set, get) => ({
    // State
    profile: null,
    products: [],
    currentProduct: null,
    category: null,
    stats: null,
    loading: false,
    error: null,
    pagination: null,
    filters: {
        sortBy: 'newest',
        minPrice: 0,
        maxPrice: Infinity,
    },

    // Actions
    setFilters: (filters) =>
        set((state) => ({
            filters: { ...state.filters, ...filters },
        })),

    fetchProfile: async () => {
        set({ loading: true, error: null })
        try {
            const response = await memberBAPI.getProfile()
            set({
                profile: response.data.data,
                loading: false,
            })
        } catch (error) {
            set({
                error: error.message,
                loading: false,
            })
            console.error('Error fetching Member B profile:', error)
        }
    },

    fetchCategory: async () => {
        set({ loading: true, error: null })
        try {
            const response = await memberBAPI.getCategory()
            set({
                category: response.data.data,
                loading: false,
            })
        } catch (error) {
            set({
                error: error.message,
                loading: false,
            })
            console.error('Error fetching Member B category:', error)
        }
    },

    fetchProducts: async (pageNum = 1, limit = 12) => {
        set({ loading: true, error: null })
        try {
            const { filters } = get()
            const response = await memberBAPI.getProducts({
                ...filters,
                page: pageNum,
                limit,
            })
            set({
                products: response.data.data.products,
                pagination: response.data.data.pagination,
                loading: false,
            })
        } catch (error) {
            set({
                error: error.message,
                loading: false,
            })
            console.error('Error fetching Member B products:', error)
        }
    },

    fetchProductById: async (productId) => {
        set({ loading: true, error: null })
        try {
            const response = await memberBAPI.getProductById(productId)
            set({
                currentProduct: response.data.data.product,
                loading: false,
            })
        } catch (error) {
            set({
                error: error.message,
                loading: false,
            })
            console.error('Error fetching Member B product:', error)
        }
    },

    searchProducts: async (query, limit = 10) => {
        set({ loading: true, error: null })
        try {
            const response = await memberBAPI.searchProducts(query, limit)
            set({
                products: response.data.data.results,
                loading: false,
            })
        } catch (error) {
            set({
                error: error.message,
                loading: false,
            })
            console.error('Error searching Member B products:', error)
        }
    },

    fetchStatistics: async () => {
        set({ loading: true, error: null })
        try {
            const response = await memberBAPI.getStatistics()
            set({
                stats: response.data.data,
                loading: false,
            })
        } catch (error) {
            set({
                error: error.message,
                loading: false,
            })
            console.error('Error fetching Member B statistics:', error)
        }
    },

    validateOrder: async (items) => {
        set({ error: null })
        try {
            const response = await memberBAPI.validateOrder(items)
            return response.data.data
        } catch (error) {
            set({ error: error.message })
            console.error('Error validating order:', error)
            throw error
        }
    },

    clearError: () => set({ error: null }),

    reset: () =>
        set({
            profile: null,
            products: [],
            currentProduct: null,
            category: null,
            stats: null,
            loading: false,
            error: null,
            pagination: null,
            filters: {
                sortBy: 'newest',
                minPrice: 0,
                maxPrice: Infinity,
            },
        }),
}))

// Export for both named and default imports
export { useMemberBStore }
export default useMemberBStore
