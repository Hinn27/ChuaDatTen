import { supabase } from '../config/supabase.js';
import { sendPushToToken } from './fcm.service.js';

/**
 * Register or update a user device token for FCM.
 * @param {{userId: string, fcmToken: string, deviceType: 'ios'|'android'|'web'}} payload
 */
export async function registerDeviceToken({ userId, fcmToken, deviceType }) {
    const { data, error } = await supabase
        .from('notification_device_tokens')
        .upsert(
            {
                user_id: userId,
                fcm_token: fcmToken,
                device_type: deviceType,
                is_active: true,
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'fcm_token' }
        )
        .select('id, user_id, device_type, is_active, updated_at')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * Get paginated notifications of an authenticated user.
 * @param {{userId: string, page: number, limit: number}} payload
 */
export async function listNotificationsByUser({ userId, page, limit }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
        .from('notifications')
        .select('id, title, body, data, is_read, created_at', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (error) {
        throw new Error(error.message);
    }

    return {
        items: data || [],
        meta: {
            page,
            limit,
            total: count || 0,
        },
    };
}

/**
 * Mark a notification as read for current user.
 * @param {{userId: string, notificationId: string}} payload
 */
export async function markNotificationAsRead({ userId, notificationId }) {
    const { data, error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', userId)
        .select('id, is_read, created_at')
        .single();

    if (error) {
        if (error.code === 'PGRST116') {
            const err = new Error('Khong tim thay thong bao');
            err.status = 404;
            err.code = 'NOTIFICATION_NOT_FOUND';
            throw err;
        }
        throw new Error(error.message);
    }

    return data;
}

/**
 * Create notification row.
 * @param {{userId: string, title: string, body: string, data?: object}} payload
 */
export async function createNotification({ userId, title, body, data = {} }) {
    const { data: row, error } = await supabase
        .from('notifications')
        .insert({
            user_id: userId,
            title,
            body,
            data,
        })
        .select('id, user_id, title, body, data, is_read, created_at')
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return row;
}

/**
 * Send push notification to all active tokens of a user.
 * @param {{userId: string, title: string, body: string, data?: object}} payload
 */
export async function sendPushToUser({ userId, title, body, data = {} }) {
    const { data: tokens, error } = await supabase
        .from('notification_device_tokens')
        .select('fcm_token')
        .eq('user_id', userId)
        .eq('is_active', true);

    if (error) {
        return { sentCount: 0, failedCount: 0, reason: error.message };
    }

    const activeTokens = (tokens || []).map((item) => item.fcm_token).filter(Boolean);
    if (!activeTokens.length) {
        return { sentCount: 0, failedCount: 0, reason: 'NO_ACTIVE_TOKENS' };
    }

    const deliveryAttempts = await Promise.all(
        activeTokens.map(async (token) => ({
            token,
            result: await sendPushToToken({ token, title, body, data }),
        }))
    );

    const sentCount = deliveryAttempts.filter((item) => item.result.sent).length;
    const invalidTokens = deliveryAttempts
        .filter((item) => item.result.invalidToken)
        .map((item) => item.token);

    if (invalidTokens.length) {
        await supabase
            .from('notification_device_tokens')
            .update({ is_active: false, updated_at: new Date().toISOString() })
            .in('fcm_token', invalidTokens);
    }

    return {
        sentCount,
        failedCount: deliveryAttempts.length - sentCount,
    };
}

/**
 * Create DB notification + send FCM for order status changes.
 * @param {{userId: string, orderId: string, status: string}} payload
 */
export async function notifyOrderStatusChanged({ userId, orderId, status }) {
    const title = 'Cap nhat don hang';
    const body = `Don hang ${orderId} da chuyen sang trang thai ${status}`;
    const data = { type: 'ORDER_STATUS', orderId, status };

    await createNotification({ userId, title, body, data });
    await sendPushToUser({ userId, title, body, data });
}
