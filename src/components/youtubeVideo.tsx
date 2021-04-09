import * as React from "react"

interface IframeMovieProps {
  trailerLink: string
  width: string
}

const IframeMovie = ({ trailerLink, width }: IframeMovieProps) => {
  const height = width * 0.5625
  return (
    <iframe
      width={width}
      height={height}
      controls="0"
      fs="1"
      src={`https://www.youtube.com/embed/${trailerLink}?controls=0`}
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iv_load_policy="3"
      modestbranding="1"
      allowfullscreen
      widget_referrer="path" //set path!!!
    ></iframe>
  )
}

export default IframeMovie
