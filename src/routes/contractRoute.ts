import express from 'express'
import contractController from '@controllers/contractController'
import authMiddleware from '../middlewares/authMiddleware'

const router = express.Router()

router.use(authMiddleware)

router.get('/', contractController.getAll)
router.get('/:contractId', contractController.getById)
router.put('/:contractId', contractController.updateContract)
router.delete('/:contractId', contractController.deleteContract)
router.post('/', contractController.store)

export default router
