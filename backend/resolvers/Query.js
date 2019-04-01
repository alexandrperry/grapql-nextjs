import User from '../models/User'
import Post from '../models/Post'
const Query = {
  async user(parent, args, context, info){
    console.log(context.request.userId)
    const {request} = context
    const findUser = await User.findOne({id: request.userId})
    return findUser
  },
  async posts(parent, args, context, info){
    const {authorId} = args
    if(authorId){
      return await Post.findOne({authorId})
    }
    return await Post.find({})
  },
  async post(parent, args, {response}, info){
    const {id} = args
    return await Post.findOne({id})
  }
}

export {Query as default}