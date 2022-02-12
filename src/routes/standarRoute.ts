import express from 'express'
import standarController from '@controllers/standarController'

const router = express.Router()

router.post('/login', standarController.login)
router.post('/register', standarController.store)

export default router
