import express from 'express'
import productController from '@controllers/productController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.use(authMiddleware)

router.get('/', productController.getAll)
router.get('/:productId', productController.getById)
router.put('/:productId', productController.updateProduct)
router.delete('/:productId', productController.deleteProduct)
router.post('/', productController.store)

export default router
