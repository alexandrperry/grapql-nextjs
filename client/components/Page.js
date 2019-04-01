import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Header from './Header'
import Meta from './Meta'

const theme = {
  red: '#FF0000',
  black: '#393939',
  grey: '#3A3A3A',
  lightgrey: '#E1E1E1',
  offWhite: '#EDEDED',
}

const Container = styled.div`

`

const StyledPage = styled.div`
  background-color: #EEE2DC;
  color: ${props => props.theme.black};
  min-height: 100vh
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'dosis';
    src: url('/static/Dosis-Medium.ttf').format('ttf');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'dosis';
  }
`

const Page = ({children}) => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta/>
          <Header/>
          <Container>
            {children}
          </Container>
        </StyledPage>
      </ThemeProvider>
      <GlobalStyle/>
    </React.Fragment>
  )
}

export default Page