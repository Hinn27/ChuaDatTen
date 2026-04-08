import express from 'express';
import { checkout, getMyOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/checkout', authenticateJWT, checkout);
router.get('/me', authenticateJWT, getMyOrders);
router.put('/:id/status', authenticateJWT, updateOrderStatus);

export default router;
