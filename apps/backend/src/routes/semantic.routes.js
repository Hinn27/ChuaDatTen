import express from 'express';
import { searchFoods } from '../controllers/semantic.controller.js';

const router = express.Router();

router.post('/search', searchFoods);

export default router;
