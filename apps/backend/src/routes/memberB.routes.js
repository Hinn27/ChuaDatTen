/**
 * Member B Routes
 * All routes for Member B operations
 */
import { Router } from 'express'
import * as memberBController from '../controllers/memberB.controller.js'

const router = Router()

/**
 * Member B Profile & Configuration
 */
router.get('/profile', memberBController.getMemberBProfile)
router.get('/category', memberBController.getMemberBCategory)
router.get('/stats', memberBController.getMemberBStatistics)

/**
 * Member B Products
 */
router.get('/products', memberBController.getMemberBProducts)
router.get('/products/search', memberBController.searchMemberBProducts)
router.get('/products/:productId', memberBController.getMemberBProductById)
router.get('/products/:productId/related', memberBController.getMemberBRelatedProducts)

/**
 * Member B Order Operations
 */
router.post('/validate-order', memberBController.validateMemberBOrder)

export default router
