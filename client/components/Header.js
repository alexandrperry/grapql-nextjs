import Link from 'next/link'
import styled from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'
import User from './User'
import Nav from './Nav';

Router.onRouteChangeStart = () => {
  NProgress.start()
};

Router.onRouteChangeComplete = () => {
  NProgress.done()
};

Router.onRouteChangeError = () => {
  NProgress.done()
};



const Header = () => (
  <header>
    <Nav/>
    <User>
      {({ data: { user } }) => {
        console.log(user)
        if (user) return <span>{user.name}</span>
        return null
      }}
    </User>
  </header>
);

export default Header