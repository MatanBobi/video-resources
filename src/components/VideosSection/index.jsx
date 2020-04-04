// 3rd Party
import React from 'react'
import styled from 'styled-components'

// Components
import ArticlePreview from '../article-preview'

const ArticleList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 7vmin;

  @media (max-width: 600px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 4vmin;
  }
`

const CategoryWrapper = styled.section`
  margin: 24px 0;
`

const StyledLi = styled.li``

const SecondaryTitle = styled.h4`
  color: ${({ theme }) => theme.tagTitle};
  font-weight: 400;
  margin: 12px 0;
  font-size: 20px;
  font-family: 'Roboto';
  transition: color 250ms ease-in-out;
`

const VideosSection = ({ videos, tag }) => {
  return (
    <CategoryWrapper>
      <SecondaryTitle>{tag}</SecondaryTitle>
      <ArticleList>
        {videos.map(video => {
          return (
            <StyledLi key={video.slug}>
              <ArticlePreview article={video} />
            </StyledLi>
          )
        })}
      </ArticleList>
    </CategoryWrapper>
  )
}

export default VideosSection
