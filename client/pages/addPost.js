import PostForm from '../components/PostForm';
import User from '../components/User'

const addPost = () => {
  return (
    <User>
      {({data: {user}}) => {
        if(user){
          return <PostForm userId={user.id}/>
        }
        return <p>Please login to add post</p>
      }}
    </User>
  )
}

export default addPost