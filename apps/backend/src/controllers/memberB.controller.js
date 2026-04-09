/**
 * Member B Controller
 * Handles API requests for Member B operations
 */
import * as memberBService from '../services/memberB.service.js'

/**
 * GET /api/v1/members/b/profile
 * Get Member B profile and configuration
 */
export async function getMemberBProfile(req, res) {
    try {
        const profile = await memberBService.getMemberBProfile()
        res.json({
            success: true,
            data: profile,
        })
    } catch (error) {
        console.error('Error in getMemberBProfile:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

/**
 * GET /api/v1/members/b/products
 * Get Member B products with filtering and pagination
 */
export async function getMemberBProducts(req, res) {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy,
            page = 1,
            limit = 10,
        } = req.query

        const filters = {
            category,
            minPrice: minPrice ? parseInt(minPrice) : undefined,
            maxPrice: maxPrice ? parseInt(maxPrice) : undefined,
            sortBy,
            page: parseInt(page),
            limit: parseInt(limit),
        }

        const result = await memberBService.getMemberBProducts(filters)
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberBProducts:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

/**
 * GET /api/v1/members/b/products/:productId
 * Get single Member B product
 */
export async function getMemberBProductById(req, res) {
    try {
        const { productId } = req.params
        const result = await memberBService.getMemberBProductById(productId)
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberBProductById:', error)
        const statusCode = error.message === 'Product not found' ? 404 : 500
        res.status(statusCode).json({
            success: false,
            error: error.message,
        })
    }
}

/**
 * GET /api/v1/members/b/products/related/:productId
 * Get related products for Member B
 */
export async function getMemberBRelatedProducts(req, res) {
    try {
        const { productId } = req.params
        const { limit = 4 } = req.query
        const result = await memberBService.getMemberBRelatedProducts(
            productId,
            parseInt(limit)
        )
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberBRelatedProducts:', error)
        const statusCode = error.message === 'Product not found' ? 404 : 500
        res.status(statusCode).json({
            success: false,
            error: error.message,
        })
    }
}

/**
 * GET /api/v1/members/b/search
 * Search Member B products
 */
export async function searchMemberBProducts(req, res) {
    try {
        const { q, limit = 10 } = req.query

        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Search query is required',
            })
        }

        const result = await memberBService.searchMemberBProducts(
            q,
            parseInt(limit)
        )
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in searchMemberBProducts:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

/**
 * GET /api/v1/members/b/category
 * Get Member B category information
 */
export async function getMemberBCategory(req, res) {
    try {
        const result = await memberBService.getMemberBCategory()
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberBCategory:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

/**
 * GET /api/v1/members/b/stats
 * Get Member B statistics
 */
export async function getMemberBStatistics(req, res) {
    try {
        const result = await memberBService.getMemberBStatistics()
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberBStatistics:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

/**
 * POST /api/v1/members/b/validate-order
 * Validate Member B order before checkout
 */
export async function validateMemberBOrder(req, res) {
    try {
        const { items } = req.body

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                error: 'Items array is required',
            })
        }

        const result = await memberBService.validateMemberBOrder(items)
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in validateMemberBOrder:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}
