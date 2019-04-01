import React, {useState} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from './Error'
import {CURRENT_USER_QUERY} from './User'
import Router from 'next/router'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!){
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`

const initialState = {
  name: '',
  password: '',
  email: ''
}

const SignUpForm = () => {
  const [value, setValue] = useState(initialState)


  let saveValue = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  } 
  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={value}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup,{error, loading}) => (
        <form
          method="post"
          onSubmit={async event => {
            event.preventDefault()
            await signup()
            Router.push('/')
          }}
        >
          {error && <Error error={error}/>}
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              placeholder="email"
              value={value.email}
              onChange={saveValue}
              disabled={loading}
            />
          </label>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              placeholder="name"
              value={value.name}
              onChange={saveValue}
              disabled={loading}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="password"
              value={value.password}
              onChange={saveValue}
              disabled={loading}
            />
          </label>
          <button type="submit" disabled={loading}>Sign Up</button>
        </form>
      )}
    </Mutation>
  )
}

export default SignUpForm
