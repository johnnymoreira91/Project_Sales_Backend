import express from 'express'
import userController from '@controllers/userController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.use(authMiddleware)

router.get('/', userController.getAll)
router.get('/:userId', userController.getById)
router.put('/:userId', userController.updateUser)
router.delete('/:userId', userController.deleteUser)

export default router
