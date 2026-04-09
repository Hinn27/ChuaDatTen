import { z } from 'zod'

// Schema checkout đơn hàng
export const checkoutOrderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid('ID sản phẩm không hợp lệ'),
      quantity: z.number().int().positive('Số lượng phải lớn hơn 0'),
      price: z.number().positive('Giá phải dương'),
    })
  ).min(1, 'Đơn hàng phải có ít nhất 1 sản phẩm'),
  deliveryAddress: z.string().min(10, 'Địa chỉ giao hàng không hợp lệ'),
  phone: z.string().regex(/^\d{10}$/, 'Số điện thoại phải 10 chữ số'),
  paymentMethod: z.enum(['cod', 'bank_transfer', 'card']),
  notes: z.string().optional(),
})

// Schema cập nhật trạng thái đơn hàng
export const updateOrderStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'shipping', 'delivered', 'cancelled']),
  notes: z.string().optional(),
})

// Schema query đơn hàng
export const orderQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
  status: z.enum(['pending', 'confirmed', 'shipping', 'delivered', 'cancelled']).optional(),
})
