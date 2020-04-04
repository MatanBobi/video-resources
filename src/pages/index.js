import React from 'react'
import styled, { withTheme } from 'styled-components'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import BackgroundImage from 'gatsby-background-image'
import ReactTooltip from 'react-tooltip'

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 600px) {
    padding: 15px;
  }
`

const VideosWrapper = styled.div`
  padding: 25vh 0;
  @media (max-width: 600px) {
    padding: 6vh 0;
  }
`

const CategoryWrapper = styled.div`
  margin: 24px 0;
`

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

const StyledLi = styled.li``

const SecondaryTitle = styled.h4`
  color: ${({ theme }) => theme.tagTitle};
  font-weight: 400;
  margin: 12px 0;
  font-size: 20px;
  font-family: 'Roboto';
  transition: color 250ms ease-in-out;
`

const StyledBackgroundImg = styled(BackgroundImage)`
  height: 70vh;
  max-height: 950px;
  position: fixed;
  top: 0;
`

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

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    // const posts = get(this, 'props.data.allContentfulVideo.edges')
    const posts = get(this, 'props.data.allVideosJson.edges')
    const postsByTags =
      posts &&
      posts.reduce((postsByTags, { node: currentPost }) => {
        currentPost.tags?.forEach(tag => {
          if (!postsByTags[tag]) {
            postsByTags[tag] = [currentPost]
            return
          }

          postsByTags[tag] = [...postsByTags[tag], currentPost]
        })

        return postsByTags
      }, {})
    const data = get(this, 'props.data.allContentfulSite.edges')
    const backgroundFluidImageStack = [
      data[0].node.backgroundImage.fluid,
      `linear-gradient(0deg,rgba(29,27,39,1) 30%,rgba(29,27,39,0.5) 50%, rgba(29,27,39,0) 70%)`,
      // `linear-gradient(0deg,rgba(255,255,255,1) 30%,rgba(255,255, 255,0.5) 50%, rgba(255,255, 255,0) 70%)`,
    ].reverse()
    return (
      <Layout location={this.props.location}>
        <div>
          <StyledBackgroundImg Tag="section" fluid={backgroundFluidImageStack}>
            <Helmet title={siteTitle} />
            <Wrapper>
              <Title>Vidit</Title>
              <Subtitle>All the latest video resources in one place</Subtitle>
              <SecondSubtitle>
                Built and maintained by Matan Borenkraout
              </SecondSubtitle>
              <VideosWrapper>
                {Object.keys(postsByTags).map(tagName => {
                  return (
                    <CategoryWrapper>
                      <SecondaryTitle>{tagName}</SecondaryTitle>
                      <ArticleList>
                        {postsByTags[tagName].map(post => {
                          return (
                            <StyledLi key={post.slug}>
                              <ArticlePreview article={post} />
                            </StyledLi>
                          )
                        })}
                      </ArticleList>
                    </CategoryWrapper>
                  )
                })}
              </VideosWrapper>
            </Wrapper>
          </StyledBackgroundImg>
        </div>
        <ReactTooltip className="description-tooltip" />
      </Layout>
    )
  }
}

export default withTheme(RootIndex)

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allVideosJson(sort: { fields: [uploadDate], order: DESC }) {
      edges {
        node {
          imageUrl
          description
          participant
          tags
          title
          uploadDate
          videoUrl
        }
      }
    }
    allContentfulSite(
      filter: { id: { eq: "d4899851-bcb7-5b01-a440-19f53ba8f32e" } }
    ) {
      edges {
        node {
          title
          backgroundImage {
            fluid(maxWidth: 3200, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          id
        }
      }
    }
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(maxWidth: 3200, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
