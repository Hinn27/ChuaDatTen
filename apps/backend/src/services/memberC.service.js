/**
 * Member C Service
 * Handles Member C specific business logic, product filtering, and member operations
 */
import { memberCConfig, memberCProducts, memberCStats } from '../config/memberC.config.js'

const PRODUCT_NOT_FOUND_ERROR = 'Không tìm thấy sản phẩm'

export async function getMemberCProfile() {
    try {
        return {
            ...memberCConfig,
            stats: memberCStats,
        }
    } catch (error) {
        console.error('Error fetching Member C profile:', error)
        throw new Error('Không thể tải hồ sơ Member C')
    }
}

export async function getMemberCProducts(filters = {}) {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy = 'newest',
            page = 1,
            limit = 10,
        } = filters

        let filtered = memberCProducts.filter((p) => p.isActive)

        if (category) {
            filtered = filtered.filter((p) => p.category === category)
        }

        if (minPrice !== undefined) {
            filtered = filtered.filter((p) => p.price >= minPrice)
        }

        if (maxPrice !== undefined) {
            filtered = filtered.filter((p) => p.price <= maxPrice)
        }

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
                break
        }

        const totalCount = filtered.length
        const totalPages = Math.ceil(totalCount / limit)
        const startIdx = (page - 1) * limit
        const products = filtered.slice(startIdx, startIdx + limit)

        return {
            member: 'c',
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
        console.error('Error fetching Member C products:', error)
        throw new Error('Không thể tải danh sách sản phẩm Member C')
    }
}

export async function getMemberCProductById(productId) {
    try {
        const product = memberCProducts.find((p) => p.id === productId && p.isActive)

        if (!product) {
            throw new Error(PRODUCT_NOT_FOUND_ERROR)
        }

        return {
            member: 'c',
            product: {
                ...product,
                relatedProducts: memberCProducts
                    .filter((p) => p.id !== productId && p.category === product.category)
                    .slice(0, 4),
            },
        }
    } catch (error) {
        console.error('Error fetching Member C product:', error)
        if (error.message === PRODUCT_NOT_FOUND_ERROR) {
            throw error
        }
        throw new Error('Không thể tải chi tiết sản phẩm Member C')
    }
}

export async function searchMemberCProducts(query, limit = 10) {
    try {
        if (!query || query.trim().length === 0) {
            return []
        }

        const searchTerm = query.toLowerCase()
        const results = memberCProducts
            .filter((p) => p.isActive &&
                (p.name.toLowerCase().includes(searchTerm) ||
                    p.description.toLowerCase().includes(searchTerm))
            )
            .slice(0, limit)

        return {
            member: 'c',
            query,
            results,
            count: results.length,
        }
    } catch (error) {
        console.error('Error searching Member C products:', error)
        throw new Error('Không thể tìm kiếm sản phẩm Member C')
    }
}

export async function getMemberCCategory() {
    try {
        return {
            member: 'c',
            category: memberCConfig.primaryCategory,
            displayName: memberCConfig.displayName,
            description: memberCConfig.description,
            logo: memberCConfig.logo,
            color: memberCConfig.color,
            productCount: memberCProducts.filter((p) => p.isActive).length,
            averageRating: memberCStats.averageRating,
        }
    } catch (error) {
        console.error('Error fetching Member C category:', error)
        throw new Error('Không thể tải thông tin danh mục Member C')
    }
}

export async function getMemberCStatistics() {
    try {
        return {
            member: 'c',
            ...memberCStats,
        }
    } catch (error) {
        console.error('Error fetching Member C statistics:', error)
        throw new Error('Không thể tải thống kê Member C')
    }
}

export async function getMemberCRelatedProducts(productId, limit = 4) {
    try {
        const product = memberCProducts.find((p) => p.id === productId && p.isActive)

        if (!product) {
            throw new Error(PRODUCT_NOT_FOUND_ERROR)
        }

        const related = memberCProducts
            .filter(
                (p) =>
                    p.id !== productId &&
                    p.category === product.category &&
                    p.isActive
            )
            .slice(0, limit)

        return {
            member: 'c',
            baseProduct: productId,
            relatedProducts: related,
        }
    } catch (error) {
        console.error('Error fetching related products:', error)
        if (error.message === PRODUCT_NOT_FOUND_ERROR) {
            throw error
        }
        throw new Error('Không thể tải sản phẩm liên quan')
    }
}

export async function validateMemberCOrder(items) {
    try {
        const validatedItems = []
        let totalPrice = 0
        let hasErrors = false
        const errors = []

        for (const item of items) {
            const product = memberCProducts.find((p) => p.id === item.productId)

            if (!product) {
                hasErrors = true
                errors.push(`Không tìm thấy sản phẩm ${item.productId}`)
                continue
            }

            if (!product.isActive) {
                hasErrors = true
                errors.push(`Sản phẩm ${product.name} hiện không còn kinh doanh`)
                continue
            }

            if (product.stock < item.quantity) {
                hasErrors = true
                errors.push(
                    `Không đủ tồn kho cho ${product.name}. Còn lại: ${product.stock}`
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
            member: 'c',
            isValid: !hasErrors,
            validatedItems,
            totalPrice,
            itemCount: validatedItems.reduce((sum, item) => sum + item.quantity, 0),
            errors: hasErrors ? errors : [],
            discountEligible: totalPrice >= 100000,
            estimatedShippingDays: 2,
        }
    } catch (error) {
        console.error('Error validating Member C order:', error)
        throw new Error('Không thể xác thực đơn hàng')
    }
}
