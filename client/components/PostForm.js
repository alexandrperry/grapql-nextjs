import React, {useState} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from './Error'

const ADD_POST_MUTATION = gql`
  mutation ADD_POST_MUTATION($authorId: ID! $title: String! $body: String! $image: String!){
    addPost(authorId: $authorId title: $title body: $body image: $image) {
      authorId
      title
      body
      image
    }
  }
`

const PostForm = ({userId}) => {
  const initialState = {
    authorId:userId,
    title: '',
    body: '',
    image: ''
  }
  
  const initialImageStatus = {
    loading: null,
    status: null
  }
  const [value, setValue] = useState(initialState)
  const [imageStatus, setImageStatus] = useState(initialImageStatus)

  let saveValue = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  }
  let changeImage = async event => {
    setImageStatus({
      ...imageStatus,
      loading: true
    })
    const files = event.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'graphql-blog');

    const res = await fetch('https://api.cloudinary.com/v1_1/dwfz3tf79/image/upload', {
      method: 'POST',
      body: data,
    })
    const file = await res.json()
    setValue({
      ...value,
      image:file.url
    })
    setImageStatus({
      loading: false,
      status: file.url.length > 0
    })
  } 
  return (
    <Mutation
      mutation={ADD_POST_MUTATION}
      variables={value}
    >
      {(addPost,{data, error, loading}) => (
        <div>
          {data && <p>Post added</p>}
          <form
            method="post"
            onSubmit={async event => {
              event.preventDefault()
              await addPost()
            }}
          >
            {error && <Error error={error}/>}
            <label htmlFor="title">
              Title
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={value.title}
                onChange={saveValue}
                disabled={loading}
              />
            </label>
            <label htmlFor="body">
              Body
              <textarea
                name="body"
                placeholder="Your body"
                value={value.body}
                onChange={saveValue}
                disabled={loading}
              />
            </label>
            <label htmlFor="image">
              Upload an image
              <input
                type="file"
                name="image"
                placeholder="Upload an image"
                required
                onChange={changeImage}
              />
            </label>
            {imageStatus.status && <p>Success download image</p>}
            {imageStatus.loading && <p>Loading image</p>}
            <button 
              type="submit" 
              disabled={loading || !imageStatus.status || imageStatus.loading }
            >
              Add Post
            </button>
          </form>
        </div>
        
      )}
    </Mutation>
  )
}

export default PostForm
