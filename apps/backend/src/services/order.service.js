import { supabase } from '../config/supabase.js';
import { notifyOrderStatusChanged } from './notifications.service.js';

/**
 * Checkout transaction via RPC.
 * @param {{userId: string, items: {productId: string, quantity: number}[], paymentMethod: string, address: string, idempotencyKey?: string|null}} payload
 */
export async function checkoutOrder({ userId, items, paymentMethod, address, idempotencyKey = null }) {
    const client = supabase;
    const result = await client.rpc('checkout_transaction', {
        p_user_id: userId,
        p_items: items,
        p_payment_method: paymentMethod,
        p_address: address,
        p_idempotency_key: idempotencyKey,
    });
    if (result.error) {
        const raw = String(result.error.message || '').toLowerCase();
        const err = new Error(result.error.message);

        if (raw.includes('insufficient stock')) {
            err.status = 409;
            err.code = 'INSUFFICIENT_STOCK';
        } else if (raw.includes('product not found')) {
            err.status = 404;
            err.code = 'PRODUCT_NOT_FOUND';
        } else if (raw.includes('p_items')) {
            err.status = 400;
            err.code = 'VALIDATION_ERROR';
        } else {
            err.status = 500;
            err.code = 'CHECKOUT_FAILED';
        }

        throw err;
    }

    return {
        orderId: result?.data?.orderId,
        paymentUrl: result?.data?.paymentUrl || null,
        status: result?.data?.status || 'PENDING',
        total: result?.data?.total || 0,
    };
}

/**
 * Get order history for authenticated user.
 * @param {string} userId
 */
export async function getOrdersByUserId(userId) {
    const { data, error } = await supabase
        .from('orders')
        .select('id, status, payment_status, payment_method, shipping_address, total, created_at, order_items(id, product_id, quantity, unit_price)')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

/**
 * Update order status by store owner or admin.
 * @param {{orderId: string, status: string, actorUserId: string}} payload
 */
export async function updateOrderStatus({ orderId, status, actorUserId }) {
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', actorUserId)
        .single();

    if (profileError) {
        throw new Error(profileError.message);
    }

    const role = profile?.role;
    if (!['STORE_OWNER', 'ADMIN'].includes(role)) {
        const err = new Error('Ban khong co quyen cap nhat trang thai don hang');
        err.status = 403;
        err.code = 'FORBIDDEN';
        throw err;
    }

    const { data: order, error: orderError } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', orderId)
        .select('id, user_id, status, payment_method, total, updated_at')
        .single();

    if (orderError) {
        if (orderError.code === 'PGRST116') {
            const err = new Error('Khong tim thay don hang');
            err.status = 404;
            err.code = 'ORDER_NOT_FOUND';
            throw err;
        }
        throw new Error(orderError.message);
    }

    await notifyOrderStatusChanged({
        userId: order.user_id,
        orderId: order.id,
        status: order.status,
    });

    return {
        orderId: order.id,
        status: order.status,
        updatedAt: order.updated_at,
    };
}
