import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  font-size: 52px;
  font-family: 'Roboto';
  padding-top: 72px;
  font-weight: 300;
  margin-bottom: 12px;
`

const Subtitle = styled.div`
  font-size: 24px;
  font-family: 'Roboto';
  font-weight: 300;
  margin: 4px 0;
`

const SecondSubtitle = styled(Subtitle)`
  font-size: 18px;
`

const MainPageHeader = () => {
  return (
    <>
      <Title>Vidit</Title>
      <Subtitle>All the latest video resources in one place</Subtitle>
      <SecondSubtitle>Built and maintained by Matan Borenkraout</SecondSubtitle>
    </>
  )
}

export default MainPageHeader
