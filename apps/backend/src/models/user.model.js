import { z } from 'zod'

// Schema đăng ký
export const userRegisterSchema = z.object({
    name: z.string().min(2, 'Tên phải tối thiểu 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu phải tối thiểu 8 ký tự'),
})

// Schema đăng nhập
export const userLoginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(1, 'Mật khẩu là bắt buộc'),
})

// Schema cập nhật profile
export const userUpdateProfileSchema = z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    avatar: z.string().url().optional(),
})

// Schema đăng ký device token FCM
export const deviceTokenSchema = z.object({
    token: z.string().min(1, 'Token là bắt buộc'),
    deviceType: z.enum(['ios', 'android', 'web']),
})
