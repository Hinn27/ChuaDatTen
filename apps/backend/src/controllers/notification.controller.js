import * as NotificationService from '../services/notifications.service.js';

/**
 * Validate body for device token registration.
 * @param {object} body
 */
function validateDeviceTokenBody(body = {}) {
    const fcmToken = typeof body.fcmToken === 'string' ? body.fcmToken.trim() : '';
    const deviceType = typeof body.deviceType === 'string' ? body.deviceType.trim().toLowerCase() : '';

    if (!fcmToken || !deviceType) {
        const err = new Error('fcmToken va deviceType la bat buoc');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    if (!['ios', 'android', 'web'].includes(deviceType)) {
        const err = new Error('deviceType khong hop le');
        err.status = 400;
        err.code = 'VALIDATION_ERROR';
        throw err;
    }

    return { fcmToken, deviceType };
}

/**
 * POST /notifications/device-token
 */
export async function registerDeviceToken(req, res, next) {
    try {
        const { fcmToken, deviceType } = validateDeviceTokenBody(req.body);
        const result = await NotificationService.registerDeviceToken({
            userId: req.user.id,
            fcmToken,
            deviceType,
        });

        return res.status(200).json({
            success: true,
            data: result,
            message: 'Dang ky device token thanh cong',
        });
    } catch (error) {
        return next(error);
    }
}

/**
 * GET /notifications
 */
export async function getMyNotifications(req, res, next) {
    try {
        const page = Math.max(1, Number.parseInt(req.query.page || 1, 10));
        const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit || 20, 10)));

        const result = await NotificationService.listNotificationsByUser({
            userId: req.user.id,
            page,
            limit,
        });

        return res.status(200).json({
            success: true,
            data: result,
            message: 'Lay danh sach thong bao thanh cong',
        });
    } catch (error) {
        return next(error);
    }
}

/**
 * PUT /notifications/:id/read
 */
export async function markNotificationAsRead(req, res, next) {
    try {
        const notificationId = typeof req.params.id === 'string' ? req.params.id.trim() : '';
        if (!notificationId) {
            const err = new Error('notification id la bat buoc');
            err.status = 400;
            err.code = 'VALIDATION_ERROR';
            throw err;
        }

        const result = await NotificationService.markNotificationAsRead({
            userId: req.user.id,
            notificationId,
        });

        return res.status(200).json({
            success: true,
            data: result,
            message: 'Danh dau da doc thanh cong',
        });
    } catch (error) {
        return next(error);
    }
}
