import express from 'express';
import { generateAiText } from '../controllers/ai.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/generate', authenticateJWT, generateAiText);

export default router;
