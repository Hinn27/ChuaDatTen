import { supabaseAuth } from '../config/supabase.js';

/**
 * Verify Supabase access token from Authorization header.
 */
export async function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                code: 'AUTH_REQUIRED',
                message: 'Thieu token xac thuc',
            },
        });
    }

    if (!supabaseAuth) {
        return res.status(500).json({
            success: false,
            error: {
                code: 'SUPABASE_CONFIG_ERROR',
                message: 'Supabase auth client chua duoc cau hinh',
            },
        });
    }

    const { data, error } = await supabaseAuth.auth.getUser(token);
    if (error || !data?.user) {
        return res.status(403).json({
            success: false,
            error: {
                code: 'AUTH_FAILED',
                message: 'Token khong hop le hoac da het han',
            },
        });
    }

    req.user = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
    };

    next();
}
