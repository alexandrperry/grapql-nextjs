import React, {useState} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from './Error'
import {CURRENT_USER_QUERY} from './User'
import Router from 'next/router'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!,$password: String!){
    signin(email: $email, password: $password) {
      id
      email
    }
  }
`

const initialState = {
  password: '',
  email: ''
}

const SignInForm = () => {
  const [value, setValue] = useState(initialState)


  let saveValue = event => {
    setValue({
      ...value,
      [event.target.name]: event.target.value
    })
  } 
  return (
    <Mutation
      mutation={SIGNIN_MUTATION}
      variables={value}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signin,{error, loading}) => (
        <form
          method="post"
          onSubmit={async event => {
            event.preventDefault()
            await signin()
            //Router.push('/')
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
          <button type="submit" disabled={loading}>Sign In</button>
        </form>
      )}
    </Mutation>
  )
}

export default SignInForm
