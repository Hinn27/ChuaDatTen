/**
 * Member C Routes
 * All routes for Member C operations
 */
import { Router } from 'express'
import * as memberCController from '../controllers/memberC.controller.js'

const router = Router()

router.get('/profile', memberCController.getMemberCProfile)
router.get('/category', memberCController.getMemberCCategory)
router.get('/stats', memberCController.getMemberCStatistics)

router.get('/products', memberCController.getMemberCProducts)
router.get('/products/search', memberCController.searchMemberCProducts)
router.get('/products/:productId', memberCController.getMemberCProductById)
router.get('/products/:productId/related', memberCController.getMemberCRelatedProducts)

router.post('/validate-order', memberCController.validateMemberCOrder)

export default router
