import { z } from 'zod'

// Schema tạo sản phẩm
export const productCreateSchema = z.object({
    name: z.string().min(3, 'Tên sản phẩm tối thiểu 3 ký tự'),
    description: z.string().min(10, 'Mô tả tối thiểu 10 ký tự'),
    price: z.number().positive('Giá phải là số dương'),
    categoryId: z.string().uuid('ID danh mục không hợp lệ'),
    imageUrl: z.string().url('URL hình ảnh không hợp lệ').optional(),
    stock: z.number().int().nonnegative('Số lượng không thể âm').default(0),
})

// Schema cập nhật sản phẩm
export const productUpdateSchema = z.object({
    name: z.string().min(3).optional(),
    description: z.string().min(10).optional(),
    price: z.number().positive().optional(),
    categoryId: z.string().uuid().optional(),
    imageUrl: z.string().url().optional(),
    stock: z.number().int().nonnegative().optional(),
})

// Schema query sản phẩm
export const productQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    categoryId: z.string().uuid().optional(),
    search: z.string().optional(),
})

// Schema danh mục
export const categorySchema = z.object({
    name: z.string().min(2, 'Tên danh mục tối thiểu 2 ký tự'),
    description: z.string().optional(),
})
