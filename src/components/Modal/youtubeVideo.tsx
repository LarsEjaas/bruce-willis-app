import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { globalHistory as history } from "@reach/router"

interface IframeMovieProps {
  readonly trailerLink: string
  readonly language: string
}

const IframeMovie = ({ trailerLink, language }: IframeMovieProps) => {
  const { location } = history
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )
  const sitePath = `${data.site.siteMetadata.siteUrl}${location.pathname}`
  console.log(sitePath)
  return (
    <iframe
      controls={1}
      color="white"
      fs={1}
      hl={language}
      cc_lang_pref={language}
      src={`https://www.youtube.com/embed/${trailerLink}?controls=0`}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      iv_load_policy={3}
      modestbranding={1} //<-- has to be 0 to allow for accessible keyboard nav
      allowfullscreen
      rel={0}
      disablekb={0}
      widget_referrer={sitePath}
    ></iframe>
  )
}

export default IframeMovie
