import express from 'express';
import { getProfile, login, register } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticateJWT, getProfile);
router.get('/profile', authenticateJWT, getProfile);

export default router;
