import React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import Img from "gatsby-image"

const Image = ({ fileName, alt, style, aspectR }) => {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      allImageSharp {
        nodes {
          fluid(maxWidth: 1408,quality: 90) {
            originalName
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  const fluid = allImageSharp.nodes.find( node => node.fluid.originalName === fileName)
    .fluid 

  if (!fluid) return null;

  return (
    <>
      <Img fluid={fluid} alt={alt} style={style} />
    </>
  )
}

export default Image
