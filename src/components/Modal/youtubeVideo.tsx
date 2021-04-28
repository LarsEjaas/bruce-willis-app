import * as React from "react"

interface IframeMovieProps {
  readonly trailerLink: string
  readonly language: string
}

const IframeMovie = ({ trailerLink, language }: IframeMovieProps) => {
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
      allow="accelerometer; encrypted-media; gyroscope"
      iv_load_policy="3"
      modestbranding="0" //<-- has to be 0 to allow for accessible keyboard nav
      allowfullscreen
      rel="0"
      disablekb="0"
      widget_referrer="path" //set path!!!
    ></iframe>
  )
}

export default IframeMovie
