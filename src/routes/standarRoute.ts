import express from 'express'
import standarController from '@controllers/standarController'

const router = express.Router()

router.post('/login', standarController.login)
router.post('/register', standarController.store)
router.get('/activities', standarController.activities)

export default router
