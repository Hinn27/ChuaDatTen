/**
 * Member C Controller
 * Handles API requests for Member C operations
 */
import * as memberCService from '../services/memberC.service.js'

function toOptionalNumber(value) {
    if (value === undefined || value === null || value === '') {
        return undefined
    }
    const parsed = Number(value)
    return Number.isFinite(parsed) ? parsed : undefined
}

export async function getMemberCProfile(req, res) {
    try {
        const profile = await memberCService.getMemberCProfile()
        res.json({
            success: true,
            data: profile,
        })
    } catch (error) {
        console.error('Error in getMemberCProfile:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export async function getMemberCProducts(req, res) {
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
            minPrice: toOptionalNumber(minPrice),
            maxPrice: toOptionalNumber(maxPrice),
            sortBy,
            page: toOptionalNumber(page) || 1,
            limit: toOptionalNumber(limit) || 10,
        }

        const result = await memberCService.getMemberCProducts(filters)
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberCProducts:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export async function getMemberCProductById(req, res) {
    try {
        const { productId } = req.params
        const result = await memberCService.getMemberCProductById(productId)
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberCProductById:', error)
        const statusCode = error.message === 'Không tìm thấy sản phẩm' ? 404 : 500
        res.status(statusCode).json({
            success: false,
            error: error.message,
        })
    }
}

export async function getMemberCRelatedProducts(req, res) {
    try {
        const { productId } = req.params
        const { limit = 4 } = req.query
        const result = await memberCService.getMemberCRelatedProducts(
            productId,
            toOptionalNumber(limit) || 4
        )
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberCRelatedProducts:', error)
        const statusCode = error.message === 'Không tìm thấy sản phẩm' ? 404 : 500
        res.status(statusCode).json({
            success: false,
            error: error.message,
        })
    }
}

export async function searchMemberCProducts(req, res) {
    try {
        const { q, limit = 10 } = req.query

        if (!q) {
            return res.status(400).json({
                success: false,
                error: 'Từ khóa tìm kiếm là bắt buộc',
            })
        }

        const result = await memberCService.searchMemberCProducts(
            q,
            parseInt(limit, 10)
        )
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in searchMemberCProducts:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export async function getMemberCCategory(req, res) {
    try {
        const result = await memberCService.getMemberCCategory()
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberCCategory:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export async function getMemberCStatistics(req, res) {
    try {
        const result = await memberCService.getMemberCStatistics()
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in getMemberCStatistics:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}

export async function validateMemberCOrder(req, res) {
    try {
        const { items } = req.body

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                error: 'Danh sách items là bắt buộc',
            })
        }

        const result = await memberCService.validateMemberCOrder(items)
        res.json({
            success: true,
            data: result,
        })
    } catch (error) {
        console.error('Error in validateMemberCOrder:', error)
        res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}
