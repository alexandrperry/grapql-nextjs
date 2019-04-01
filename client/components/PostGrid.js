import React from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import Link from 'next/link'

const POSTS_QUERY = gql`
  query POSTS_QUERY{
    posts{
      id
      title
      body
      date
      authorId
    }
  }
`

const POSTS_SUBSCRIPTION = gql`
  subscription POSTS_SUBSCRIPTION{
    post{
      mutation
      data{
        id
        title
      }
    }
  }
`



const PostGrid = props =>{
  let subscribeToMorePosts = subscribeToMore => {
    subscribeToMore({
      document: POSTS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        //console.log(prev.posts)
        //console.log(subscriptionData.data.post)
        if (!subscriptionData.data) return prev.posts
        if(prev.posts.find(item => {
          return item.id === subscriptionData.data.post.data.id
        })){
          return prev.posts
        }
        
        return prev.posts.push(subscriptionData.data.post.data)
        
      }
    })
  }
  return (
    <div>
      <Query query={POSTS_QUERY}>
        {({data, loading, error, subscribeToMore}) => {
          if(error) return <p>error</p>
          if(loading) return <p>loading</p>
          process.browser && subscribeToMorePosts(subscribeToMore)
          return data.posts.map(item => {
            return (
              <div>
                <p>{item.title}</p>
                <Link href={{pathname:'post', query:{id: item.id}}}>
                  <a>
                    Read
                  </a>
                </Link>
              </div>
            )
          })
        }}
        
      </Query>
    </div>
  )
}
export default PostGrid
