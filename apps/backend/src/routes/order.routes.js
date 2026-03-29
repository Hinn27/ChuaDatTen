import express from 'express';
import { checkout } from '../controllers/order.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/checkout', authenticateJWT, checkout);

export default router;
