import { z } from 'zod'

// Schema gửi tin nhắn chat
export const sendMessageSchema = z.object({
    message: z.string().min(1, 'Tin nhắn không được để trống').max(1000, 'Tin nhắn tối đa 1000 ký tự'),
})

// Schema query lịch sử chat
export const chatHistoryQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
})

// Schema tìm kiếm ngữ nghĩa
export const semanticSearchSchema = z.object({
    query: z.string().min(1, 'Truy vấn không được để trống').max(500),
    limit: z.coerce.number().int().positive().default(10),
    threshold: z.coerce.number().min(0).max(1).default(0.3),
})
