import React from 'react'
import styled from 'styled-components'

const GradientBackground = styled.div`
  margin: '0 auto';
`

export default ({ children }) => (
  <GradientBackground>
    {children}
  </GradientBackground>
)
