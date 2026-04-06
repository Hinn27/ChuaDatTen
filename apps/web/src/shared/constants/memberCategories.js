import { memberCategoryOwnership } from '../../features/member-categories/index.js'

/**
 * Danh mục theo member owner.
 * Mỗi member phụ trách đúng 1 danh mục theo phân công team.
 */
export const MEMBER_CATEGORIES = memberCategoryOwnership

export const MEMBER_CATEGORY_BY_MEMBER = MEMBER_CATEGORIES.reduce((acc, item) => {
    acc[item.member] = item
    return acc
}, {})
