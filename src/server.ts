import express from 'express'
import '@controllers/UsersController'
import morganMiddleware from './middlewares/morganMiddleware'
import AdminRoute from './routes/AdminRoute'
import cors from 'cors'

const app = express()

app.use(morganMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use('/admin', AdminRoute)

app.get('/', (request, response) => {
  return response.json({ message: 'Hello World' })
})

export default app
