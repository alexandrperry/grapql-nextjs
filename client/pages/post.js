import React from 'react'
import PostItem from '../components/Post';

const Post = props => {
  return (
    <PostItem id={props.query.id}/>
  )
}

export default Post

