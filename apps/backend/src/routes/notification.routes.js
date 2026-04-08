import express from 'express';
import { getMyNotifications, markNotificationAsRead, registerDeviceToken } from '../controllers/notification.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/device-token', authenticateJWT, registerDeviceToken);
router.get('/', authenticateJWT, getMyNotifications);
router.put('/:id/read', authenticateJWT, markNotificationAsRead);

export default router;
