import React from 'react'
import Link from 'next/link'
import SignOut from './SignOut'
import User from './User'


function Nav() {
  return (
    <nav>
      <Link href="/">
        <a>Main</a>
      </Link>
      <User>
        {({data: {user}}) => (
          user 
            ? <SignOut/>
            : <>
              <Link href='/signup'>
                <a>Signup</a>
              </Link>
              <Link href='/signin'>
                <a>Signin</a>
              </Link>
            </>
        )}
      </User>
      
      
    </nav>
  )
}

export default Nav
