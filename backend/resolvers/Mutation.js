import bcrypt from 'bcrypt'
import uuidv4 from 'uuid/v4'
import User from '../models/User'
import Post from '../models/Post'
import Comment from '../models/Comment'
import jwt from 'jsonwebtoken'

const Mutation = {
  async signup(parent, args, ctx, info){
    //console.log('signup',ctx.response.cookie)
    let {password, email} = args
    password = await bcrypt.hash(password, 10)
    const user = new User(
      {
        ...args,
        id: uuidv4(),
        password
      }
    )
    
    const checkUserInDatabase = await User.findOne({email})
    if(checkUserInDatabase){
      throw new Error('This email is register in our DB')
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)

    console.log('token',token)
    ctx.response.cookie('gav','sfsfsssf',{
      httpOnly:true,
      maxAge:1000000
    })
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    })

    return await user.save()
  },
  async signin(parent, args, {response}, info){
    let {password, email} = args
    const user = await User.findOne({email})
    if (!user) {
      throw new Error(`No such user found for email ${email}`)
    }
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      throw new Error('Invalid Password!')
    }
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    console.log("token",token)
    console.log(response.cookie)
    response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })
    return  user
  },
  async signout(parent, args, {response}, info){
    response.clearCookie('token')
    return {
      status: true
    }
  },
  async addPost(parent, args, {pubsub}, info){
    const post = new Post(
      {
        ...args,
        id: uuidv4()
      }
    )
    const res = await post.save()
    if(res){
      pubsub.publish('post', { 
        post: {
          mutation: 'CREATED',
          data: post
        }
      })
    }
    return res
  },
  async addComment(parent, args, {request}){
    console.log('user', request.userId)
    const {articleId} = args
    if(!articleId){
      throw new Error('No article')
    }
    if(!request.userId){
      throw new Error('Please login to add comment')
    }
    const comment = new Comment({
      ...args,
      authorId: request.userId,
      id: uuidv4()
    })
    return await comment.save()
  }
}

export {Mutation as default}