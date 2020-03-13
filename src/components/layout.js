import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'
import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Nunito", Tahoma, Arial, Helvetica, sans-serif;
    font-size: 1em;
    color: #FFFFFF;
    margin: 0;
    background: rgba(29,27,39,1);
  }
`

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <GlobalStyles />
        <Navigation />
        {children}
      </Container>
    )
  }
}

export default Template
