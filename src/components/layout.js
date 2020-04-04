import React from 'react'
import { Link } from 'gatsby'
import base from './base.css'
import Container from './container'
import Navigation from './navigation'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Nunito", Tahoma, Arial, Helvetica, sans-serif;
    font-size: 1em;
    color: #FFFFFF;
    margin: 0;
    background: ${({ theme }) => theme.background};
    transition: background 250ms ease-in-out;
  }
`

class Template extends React.Component {
  state = {
    darkMode: true,
  }
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <ThemeProvider
        theme={
          this.state.darkMode
            ? {
                background: 'rgba(29,27,39,1)',
                tagTitle: '#ffffff',
              }
            : {
                background: '#FFFFFF',
                tagTitle: '#000000',
              }
        }
      >
        <Container>
          <GlobalStyles />
          <Navigation
            toggleTheme={() => {
              this.setState(prevState => ({ darkMode: !prevState.darkMode }))
            }}
          />
          {children}
        </Container>
      </ThemeProvider>
    )
  }
}

export default Template
