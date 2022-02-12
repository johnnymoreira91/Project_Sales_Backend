import express from 'express'
import permissionController from '@controllers/permissionController'

const router = express.Router()

router.get('/', permissionController.getAll)
router.get('/:permissionId', permissionController.getById)
router.put('/:permissionId', permissionController.updatePermission)
router.post('/', permissionController.store)

export default router
