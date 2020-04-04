import React from 'react'
import styled, { withTheme } from 'styled-components'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import BackgroundImage from 'gatsby-background-image'
import ReactTooltip from 'react-tooltip'

// Components
import MainPageHeader from '../components/MainPageHeader'
import VideosSection from '../components/VideosSection'

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

const StyledBackgroundImg = styled(BackgroundImage)`
  height: 70vh;
  max-height: 950px;
  position: fixed;
  top: 0;
`

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
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
              <MainPageHeader />
              <VideosWrapper>
                {Object.keys(postsByTags).map(tag => {
                  return <VideosSection videos={postsByTags[tag]} tag={tag} />
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
