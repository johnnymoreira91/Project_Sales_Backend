import mongoose from '../database'
import { v4 as uuidv4 } from 'uuid'

interface Jwt {
  uuid: string,
  token: string,
  userName: string,
  dateToken: Date
}

const schemaJwt = new mongoose.Schema<Jwt>({
  uuid: { type: String, required: true, default: uuidv4() },
  token: { type: String, required: true },
  userName: { type: String, required: true },
  dateToken: { type: Date, default: new Date() }
})

const Token = mongoose.model('Token', schemaJwt)

export { Token }
