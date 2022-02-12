import express from 'express'
import adminController from '@controllers/AdminController'
// import authMiddleware from '../middlewares/'

const router = express.Router()

// router.use(authMiddleware);

router.get('/', adminController.getAll)
router.get('/:adminId', adminController.getById)
router.post('/', adminController.store)
router.put('/:adminId', adminController.update)

export default router
