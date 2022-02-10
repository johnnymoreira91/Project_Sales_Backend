import mongoose from '../database'
// import bcrypt from 'bcrypt'

interface Admin {
  name: string;
  email: string;
  password: string,
  createdAt: Date,
  admin: boolean,
  // avatar?: string;
}

// Schema
const schema = new mongoose.Schema<Admin>({
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
