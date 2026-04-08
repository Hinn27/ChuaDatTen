import express from 'express';
import { searchFoods } from '../controllers/semantic.controller.js';

const router = express.Router();

router.get('/search', searchFoods);

export default router;
