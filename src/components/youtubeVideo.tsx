import * as React from "react"

interface IframeMovieProps {
  trailerLink: string
}

const IframeMovie = ({ trailerLink }: IframeMovieProps) => {
  return (
    <iframe
      controls="1"
      color="white"
      fs="1"
      src={`https://www.youtube.com/embed/${trailerLink}?controls=0`}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; encrypted-media; gyroscope"
      iv_load_policy="3"
      modestbranding="1"
      allowfullscreen
      rel="0"
      widget_referrer="path" //set path!!!
    ></iframe>
  )
}

export default IframeMovie
