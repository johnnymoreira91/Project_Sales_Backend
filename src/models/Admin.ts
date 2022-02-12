import mongoose from '../database'
import { v4 as uuidv4 } from 'uuid'
// import bcrypt from 'bcrypt'

interface Admin {
  uuid: string,
  name: string;
  email: string;
  password: string,
  createdAt: Date,
  admin: boolean,
  // avatar?: string;
}

// Schema
const schema = new mongoose.Schema<Admin>({
  uuid: { type: String, required: true, default: uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
  // avatar: String
})

// schema.pre('save', async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

const Admin = mongoose.model('Admin', schema)

export { Admin }

// function generateUuid () {
//   const uuid = uuidv4()
//   return uuid
// }
