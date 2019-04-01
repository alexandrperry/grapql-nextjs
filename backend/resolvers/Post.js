import Comment from '../models/Comment'
const Post = {
  async comments({id}, args, context){
    return await Comment.find({articleId:id})
  }
}

export {Post as default}