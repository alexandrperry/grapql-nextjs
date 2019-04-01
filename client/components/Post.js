import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import CommentsGrid from "./CommentsGrid";

export const POST_QUERY = gql`
  query POST_QUERY($id:ID!){
    post(id:$id){
      id
      title
      body
      date
      authorId
      comments{
        body
        id
      }
    }
  }`

const Post = ({id}) => {
  return (
    <div>
      <Query
        query={POST_QUERY}
        variables={{
          id
        }}
      >
        {({data, loading, error}) => {
          console.log(data)
          if(loading) return <p>loading</p>
          if(error) return <p>Errpr</p>
          return(
            <div>
              {data.post.title}
              <CommentsGrid id={id} comments={data.post.comments}/>
            </div>
          )
        }}
      </Query>
      
    </div>
  )
}

export default Post
