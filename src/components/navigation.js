import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

const NavigationWrapper = styled.nav`
  width: 100%;
  margin: 0 auto;
  position: fixed;
  top: 0;
  z-index: 1;
`

const UnorderedList = styled.ul`
  display: flex;
  justify-content: flex-end;
  max-width: 1200px;
  margin: 16px auto
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 12px;
`

export default (props) => (
  <NavigationWrapper role="navigation">
    <UnorderedList>
    <li onClick={props.toggleTheme} className={styles.navigationItem}>
      Toggle Theme
    </li>
      <li className={styles.navigationItem}>
        <StyledLink to="/">Home</StyledLink>
      </li>
      <li className={styles.navigationItem}>
        <StyledLink to="/">About</StyledLink>
      </li>
    </UnorderedList>
  </NavigationWrapper>
)
