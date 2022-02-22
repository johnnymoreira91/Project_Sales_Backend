import express from 'express'
import productController from '@controllers/productController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

// router.use(authMiddleware)

router.get('/', productController.getAll)
router.get('/:productId', productController.getById)
router.get('/:contractCode/list', productController.getByContract)
router.put('/:productId', authMiddleware, productController.updateProduct)
router.delete('/:productId', authMiddleware, productController.deleteProduct)
router.post('/', authMiddleware, productController.store)

export default router
