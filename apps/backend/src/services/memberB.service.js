/**
 * Member B Service
 * Handles Member B specific business logic, product filtering, and member operations
 */
import { memberBConfig, memberBProducts, memberBStats } from '../config/memberB.config.js'

const PRODUCT_NOT_FOUND_ERROR = 'Product not found'

/**
 * Get Member B profile/configuration
 * @returns {Promise<Object>} Member B config and stats
 */
export async function getMemberBProfile() {
    try {
        return {
            ...memberBConfig,
            stats: memberBStats,
        }
    } catch (error) {
        console.error('Error fetching Member B profile:', error)
        throw new Error('Failed to fetch Member B profile')
    }
}

/**
 * Get all Member B products
 * @param {Object} filters - Filter options
 * @param {String} filters.category - Filter by category
 * @param {Number} filters.minPrice - Minimum price filter
 * @param {Number} filters.maxPrice - Maximum price filter
 * @param {String} filters.sortBy - Sort field (price, rating, newest)
 * @param {Number} filters.page - Page number for pagination
 * @param {Number} filters.limit - Items per page
 * @returns {Promise<Object>} Products with pagination info
 */
export async function getMemberBProducts(filters = {}) {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy = 'newest',
            page = 1,
            limit = 10,
        } = filters

        // Filter products
        let filtered = memberBProducts.filter((p) => p.isActive)

        if (category) {
            filtered = filtered.filter((p) => p.category === category)
        }

        if (minPrice !== undefined) {
            filtered = filtered.filter((p) => p.price >= minPrice)
        }

        if (maxPrice !== undefined) {
            filtered = filtered.filter((p) => p.price <= maxPrice)
        }

        // Sort
        switch (sortBy) {
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price)
                break
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price)
                break
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating)
                break
            case 'newest':
            default:
                // Already newest from config
                break
        }

        // Pagination
        const totalCount = filtered.length
        const totalPages = Math.ceil(totalCount / limit)
        const startIdx = (page - 1) * limit
        const products = filtered.slice(startIdx, startIdx + limit)

        return {
            member: 'b',
            products,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1,
            },
        }
    } catch (error) {
        console.error('Error fetching Member B products:', error)
        throw new Error('Failed to fetch Member B products')
    }
}

/**
 * Get single Member B product by ID
 * @param {String} productId - Product ID
 * @returns {Promise<Object>} Product details
 */
export async function getMemberBProductById(productId) {
    try {
        const product = memberBProducts.find((p) => p.id === productId && p.isActive)

        if (!product) {
            throw new Error(PRODUCT_NOT_FOUND_ERROR)
        }

        return {
            member: 'b',
            product: {
                ...product,
                relatedProducts: memberBProducts
                    .filter((p) => p.id !== productId && p.category === product.category)
                    .slice(0, 4),
            },
        }
    } catch (error) {
        console.error('Error fetching Member B product:', error)
        if (error.message === PRODUCT_NOT_FOUND_ERROR) {
            throw error
        }
        throw new Error('Failed to fetch Member B product')
    }
}

/**
 * Search Member B products
 * @param {String} query - Search query
 * @param {Number} limit - Max results
 * @returns {Promise<Array>} Search results
 */
export async function searchMemberBProducts(query, limit = 10) {
    try {
        if (!query || query.trim().length === 0) {
            return []
        }

        const searchTerm = query.toLowerCase()
        const results = memberBProducts
            .filter((p) => p.isActive &&
                (p.name.toLowerCase().includes(searchTerm) ||
                    p.description.toLowerCase().includes(searchTerm))
            )
            .slice(0, limit)

        return {
            member: 'b',
            query,
            results,
            count: results.length,
        }
    } catch (error) {
        console.error('Error searching Member B products:', error)
        throw new Error('Failed to search Member B products')
    }
}

/**
 * Get Member B category info
 * @returns {Promise<Object>} Category details
 */
export async function getMemberBCategory() {
    try {
        return {
            member: 'b',
            category: memberBConfig.primaryCategory,
            displayName: memberBConfig.displayName,
            description: memberBConfig.description,
            logo: memberBConfig.logo,
            color: memberBConfig.color,
            productCount: memberBProducts.filter((p) => p.isActive).length,
            averageRating: memberBStats.averageRating,
        }
    } catch (error) {
        console.error('Error fetching Member B category:', error)
        throw new Error('Failed to fetch Member B category')
    }
}

/**
 * Get Member B statistics
 * @returns {Promise<Object>} Member statistics
 */
export async function getMemberBStatistics() {
    try {
        return {
            member: 'b',
            ...memberBStats,
        }
    } catch (error) {
        console.error('Error fetching Member B statistics:', error)
        throw new Error('Failed to fetch Member B statistics')
    }
}

/**
 * Get Member B related products (for recommendations)
 * @param {String} productId - Current product ID
 * @param {Number} limit - Max related products
 * @returns {Promise<Array>} Related products
 */
export async function getMemberBRelatedProducts(productId, limit = 4) {
    try {
        const product = memberBProducts.find((p) => p.id === productId && p.isActive)

        if (!product) {
            throw new Error(PRODUCT_NOT_FOUND_ERROR)
        }

        const related = memberBProducts
            .filter(
                (p) =>
                    p.id !== productId &&
                    p.category === product.category &&
                    p.isActive
            )
            .slice(0, limit)

        return {
            member: 'b',
            baseProduct: productId,
            relatedProducts: related,
        }
    } catch (error) {
        console.error('Error fetching related products:', error)
        if (error.message === PRODUCT_NOT_FOUND_ERROR) {
            throw error
        }
        throw new Error('Failed to fetch related products')
    }
}

/**
 * Validate Member B order before checkout
 * @param {Array} items - Cart items
 * @returns {Promise<Object>} Validation result
 */
export async function validateMemberBOrder(items) {
    try {
        const validatedItems = []
        let totalPrice = 0
        let hasErrors = false
        const errors = []

        for (const item of items) {
            const product = memberBProducts.find((p) => p.id === item.productId)

            if (!product) {
                hasErrors = true
                errors.push(`Product ${item.productId} not found`)
                continue
            }

            if (!product.isActive) {
                hasErrors = true
                errors.push(`Product ${product.name} is no longer available`)
                continue
            }

            if (product.stock < item.quantity) {
                hasErrors = true
                errors.push(
                    `Insufficient stock for ${product.name}. Available: ${product.stock}`
                )
                continue
            }

            validatedItems.push({
                productId: item.productId,
                name: product.name,
                quantity: item.quantity,
                unitPrice: product.price,
                subtotal: product.price * item.quantity,
            })

            totalPrice += product.price * item.quantity
        }

        return {
            member: 'b',
            isValid: !hasErrors,
            validatedItems,
            totalPrice,
            itemCount: validatedItems.reduce((sum, item) => sum + item.quantity, 0),
            errors: hasErrors ? errors : [],
            discountEligible: totalPrice >= 100000,
            estimatedShippingDays: 2,
        }
    } catch (error) {
        console.error('Error validating Member B order:', error)
        throw new Error('Failed to validate order')
    }
}
