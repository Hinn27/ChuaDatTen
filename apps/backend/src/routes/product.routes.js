import express from 'express';
import {
    getBestsellerStats,
    getProductById,
    getProducts,
    getRegionalBestsellerStats,
} from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/stats/bestsellers', getBestsellerStats);
router.get('/stats/regional-bestsellers', getRegionalBestsellerStats);
router.get('/:id', getProductById);

export default router;
