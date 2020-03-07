import React from 'react'
import styled from 'styled-components'
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

const RecentWrapper = styled.div`
  padding: 25vh 0;

  @media (max-width: 600px) {
    padding: 6vh 0;
  }
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
  color: #ffffff;
  font-weight: 400;
  margin: 12px 0 20px;
  font-size: 20px;
  font-family: 'Roboto';
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
    const posts = get(this, 'props.data.allContentfulVideo.edges')
    const data = get(this, 'props.data.allContentfulSite.edges')
    const backgroundFluidImageStack = [
      data[0].node.backgroundImage.fluid,
      `linear-gradient(0deg,rgba(29,27,39,1) 30%,rgba(29,27,39,0.5) 50%, rgba(29,27,39,0) 70%)`,
    ].reverse()
    return (
      <Layout location={this.props.location}>
        <div>
          <StyledBackgroundImg Tag="section" fluid={backgroundFluidImageStack}>
            <Helmet title={siteTitle} />
            <Wrapper>
              <Title>
                Video resources
              </Title>
              <Subtitle>
                All the latest video resources in one place
              </Subtitle>
              <SecondSubtitle>
                Built and maintained by Matan Borenkraout
              </SecondSubtitle>
              <RecentWrapper>
                <SecondaryTitle>Recent</SecondaryTitle>
                <ul className="article-list">
                  {posts.map(({ node }) => {
                    return (
                      <StyledLi key={node.slug}>
                        <ArticlePreview article={node} />
                      </StyledLi>
                    )
                  })}
                </ul>
              </RecentWrapper>
            </Wrapper>
          </StyledBackgroundImg>
        </div>
        <ReactTooltip className='description-tooltip'/>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulVideo(sort: { fields: [uploadDate], order: DESC }) {
      edges {
        node {
          title
          participant
          uploadDate(formatString: "MMMM Do, YYYY")
          tags
          videoUrl {
            videoUrl
          }
          heroImage {
            fluid(maxHeight: 150, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
          description {
            internal {
              content
            }
          }
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
