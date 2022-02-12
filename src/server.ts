/* eslint-disable no-path-concat */
import express from 'express'
import '@controllers/UsersController'
import morganMiddleware from './middlewares/morganMiddleware'
import AdminRoute from './routes/AdminRoute'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute'
import standarRoute from './routes/standarRoute'
import permissionRoute from './routes/permissionRoute'
import contractRoute from './routes/contractRoute'
import productRoute from './routes/productRoute'
dotenv.config()

const app = express()

app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/admin', AdminRoute)
app.use('/', standarRoute)
app.use('/user', userRoute)
app.use('/permission', permissionRoute)
app.use('/contract', contractRoute)
app.use('/product', productRoute)

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default app
