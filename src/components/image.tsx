import * as React from "react"
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"

type ImageProps = {
  fileName: string;
  alt: string;
  loading: "eager" | "lazy";
}

const Image = ({ fileName, alt, loading }:ImageProps) => {
  const { allImageSharp } = useStaticQuery(graphql`
    query {
      lazy: allImageSharp {
      edges {
        node {
          gatsbyImageData(
            width: 550
            placeholder: TRACED_SVG
            # loading: "lazy"
            )
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
    eager: allImageSharp {
      edges {
        node {
          gatsbyImageData(
            width: 550
            placeholder: TRACED_SVG
            # loading: "eager"
            )
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  }
  `)

console.log(allImageSharp);

  const image = loading ==="lazy"? allImageSharp.lazy.edges.node.find( (node: { parent: { name: string } }) => node.parent.name === fileName).gatsbyImageData : allImageSharp.eager.edges.node.find( (node: { parent: { name: string } }) => node.parent.name === fileName).gatsbyImageData; 

    console.log(image);

  if (!image) return null;

  return (
    <>
      <GatsbyImage image={image} alt={alt} />
    </>
  )
}

export default Image
