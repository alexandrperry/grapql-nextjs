import mongoose from 'mongoose'
const {Schema} = mongoose

const userSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  name: String,
  password: String,
  permission: {
    type: String,
    default: 'USER'
  }
})

const User = mongoose.model('users',userSchema)

export {User as default}