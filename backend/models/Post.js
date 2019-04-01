import mongoose from 'mongoose'
const {Schema} = mongoose

const postSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  authorId: {
    type: String,
  },
  title: String,
  image: String,
  body: String,
  date: {
    type: Number,
    default: Date.now()
  },
})

const Post = mongoose.model('posts',postSchema)

export {Post as default}