/**
 * Member B Service Module
 * Handles Member B initialization, product loading, and business logic
 */
import { useMemberBStore } from '../stores/useMemberBStore'
import memberBAPI from './memberB.api'

/**
 * Initialize Member B service
 * Loads profile, category, and initial products
 */
export async function initializeMemberB() {
    const store = useMemberBStore.getState()

    try {
        // Load profile and category in parallel
        await Promise.all([
            store.fetchProfile(),
            store.fetchCategory(),
            store.fetchStatistics(),
        ])

        // Load initial products
        await store.fetchProducts(1, 12)

        return {
            success: true,
            message: 'Member B initialized successfully',
        }
    } catch (error) {
        console.error('Error initializing Member B:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

/**
 * Load Member B products with specific filters
 */
export async function loadMemberBProducts(filters = {}, page = 1, limit = 12) {
    const store = useMemberBStore.getState()

    try {
        store.setFilters(filters)
        await store.fetchProducts(page, limit)
        return true
    } catch (error) {
        console.error('Error loading Member B products:', error)
        return false
    }
}

/**
 * Search Member B products
 */
export async function searchMemberBProducts(query, limit = 10) {
    const store = useMemberBStore.getState()

    try {
        if (!query || query.trim().length === 0) {
            return {
                success: false,
                error: 'Search query is empty',
            }
        }

        await store.searchProducts(query, limit)
        return {
            success: true,
            resultsCount: store.getState().products.length,
        }
    } catch (error) {
        console.error('Error searching Member B products:', error)
        return {
            success: false,
            error: error.message,
        }
    }
}

/**
 * Get Member B product details
 */
export async function getMemberBProductDetails(productId) {
    try {
        const response = await memberBAPI.getProductById(productId)
        return response.data.data.product
    } catch (error) {
        console.error('Error fetching Member B product details:', error)
        throw error
    }
}

/**
 * Get Member B recommended products
 */
export async function getMemberBRecommendedProducts(productId, limit = 4) {
    try {
        const response = await memberBAPI.getRelatedProducts(productId, limit)
        return response.data.data.relatedProducts
    } catch (error) {
        console.error('Error fetching recommended products:', error)
        throw error
    }
}

/**
 * Validate Member B order (before checkout)
 */
export async function validateMemberBOrder(cartItems) {
    const store = useMemberBStore.getState()

    try {
        if (!cartItems || cartItems.length === 0) {
            throw new Error('Cart is empty')
        }

        // Format items for API
        const items = cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
        }))

        const result = await store.validateOrder(items)

        return {
            success: result.isValid,
            validatedItems: result.validatedItems,
            totalPrice: result.totalPrice,
            itemCount: result.itemCount,
            discountEligible: result.discountEligible,
            estimatedShippingDays: result.estimatedShippingDays,
            errors: result.errors,
        }
    } catch (error) {
        console.error('Error validating Member B order:', error)
        return {
            success: false,
            error: error.message,
            errors: [error.message],
        }
    }
}

/**
 * Get Member B profile summary
 */
export async function getMemberBProfileSummary() {
    try {
        const response = await memberBAPI.getProfile()
        const profile = response.data.data

        return {
            id: profile.id,
            name: profile.name,
            displayName: profile.displayName,
            description: profile.description,
            logo: profile.logo,
            color: profile.color,
            stats: profile.stats,
        }
    } catch (error) {
        console.error('Error fetching Member B profile summary:', error)
        throw error
    }
}

/**
 * Check Member B product stock
 */
export async function checkMemberBProductStock(productIds) {
    try {
        const store = useMemberBStore.getState()
        const { products } = store.getState()

        const stockStatus = {}

        for (const productId of productIds) {
            const product = products.find((p) => p.id === productId)
            if (product) {
                stockStatus[productId] = {
                    inStock: product.stock > 0,
                    stock: product.stock,
                    price: product.price,
                }
            }
        }

        return stockStatus
    } catch (error) {
        console.error('Error checking product stock:', error)
        throw error
    }
}

/**
 * Export Member B service functions
 */
export default {
    initializeMemberB,
    loadMemberBProducts,
    searchMemberBProducts,
    getMemberBProductDetails,
    getMemberBRecommendedProducts,
    validateMemberBOrder,
    getMemberBProfileSummary,
    checkMemberBProductStock,
}
