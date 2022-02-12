import mongoose, { ConnectOptions } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const uri = 'mongodb://root:123456@localhost:27017/vendas?authSource=admin'
// const uri = 'mongodb://localhost:27017/vendas'
// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.vldqd.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
  // useCreateIndex: true
} as ConnectOptions).then((res) => console.log('conectou ao mongo')).catch(err => {
  console.log('deu erro na conexao', err)
})

mongoose.Promise = global.Promise

export default mongoose
