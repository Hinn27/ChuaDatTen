import * as OrderService from '../services/order.service.js';

/**
 * Validate checkout payload.
 * @param {object} body
 */
function validateCheckoutBody(body = {}) {
    const items = Array.isArray(body.items) ? body.items : [];
    const paymentMethod = typeof body.paymentMethod === 'string' ? body.paymentMethod.trim().toUpperCase() : '';
    const address = typeof body.address === 'string' ? body.address.trim() : '';

    if (!items.length || !paymentMethod || !address) {
        const err = new Error('items, paymentMethod, address la bat buoc');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    if (!['COD', 'VNPAY', 'MOMO'].includes(paymentMethod)) {
        const err = new Error('paymentMethod khong hop le');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    const normalizedItems = items.map((item) => ({
        productId: item?.productId,
        quantity: Number(item?.quantity || 0),
    }));

    if (normalizedItems.some((item) => !item.productId || !Number.isInteger(item.quantity) || item.quantity <= 0)) {
        const err = new Error('items khong hop le');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    const idempotencyKeyRaw = typeof body.idempotencyKey === 'string' ? body.idempotencyKey.trim() : '';
    const idempotencyKey = idempotencyKeyRaw || null;

    if (idempotencyKey && idempotencyKey.length > 120) {
        const err = new Error('idempotencyKey qua dai');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    return { items: normalizedItems, paymentMethod, address, idempotencyKey };
}

/**
 * Validate order status update payload.
 * @param {object} body
 */
function validateStatusBody(body = {}) {
    const status = typeof body.status === 'string' ? body.status.trim().toUpperCase() : '';
    const allowedStatuses = ['CONFIRMED', 'SHIPPED', 'COMPLETED', 'CANCELLED'];

    if (!allowedStatuses.includes(status)) {
        const err = new Error('status khong hop le');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    return { status };
}

export const checkout = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { items, paymentMethod, address, idempotencyKey } = validateCheckoutBody(req.body);
        const headerIdempotencyKey = typeof req.headers['x-idempotency-key'] === 'string'
            ? req.headers['x-idempotency-key'].trim()
            : '';

        const order = await OrderService.checkoutOrder({
            userId,
            items,
            paymentMethod,
            address,
            idempotencyKey: headerIdempotencyKey || idempotencyKey,
        });
        res.status(201).json({
            success: true,
            data: order,
            message: 'Tao don hang thanh cong',
        });
    } catch (err) {
        next(err);
    }
};

export const getMyOrders = async (req, res, next) => {
    try {
        const orders = await OrderService.getOrdersByUserId(req.user.id);
        res.status(200).json({
            success: true,
            data: orders,
            message: 'Lay lich su don hang thanh cong',
        });
    } catch (err) {
        next(err);
    }
};

export const updateOrderStatus = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            const err = new Error('order id la bat buoc');
            err.status = 400;
            err.code = 'VALIDATION_ERROR';
            throw err;
        }

        const { status } = validateStatusBody(req.body);
        const order = await OrderService.updateOrderStatus({
            orderId,
            status,
            actorUserId: req.user.id,
        });

        res.status(200).json({
            success: true,
            data: order,
            message: 'Cap nhat trang thai don hang thanh cong',
        });
    } catch (err) {
        next(err);
    }
};
