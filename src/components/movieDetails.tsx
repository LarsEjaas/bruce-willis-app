import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"

const PosterCover = styled.picture<PosterCoverProps>`
  position: relative;
  }
  & img {
    border-radius: 22px;
  }
`

const Paragraph = styled.p<ParagraphProps>`
  white-space: break-spaces;
`

const MovieDetails = ({ movieData }) => {
  return (
    <>
      <PosterCover>
        {/* <source
          media="(max-width: 599px)"
          srcSet={`https://image.tmdb.org/t/p/w200${data.profilePicture}`}
        />
        <source
          media="(min-width: 600px)"
          srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_face${data.profilePicture}`}
        />
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_face${data.profilePicture}`}
          alt={`Profile Picture of ${data.name}`}
        /> */}
      </PosterCover>
      <h2>TEST</h2>
      <Paragraph>TEST</Paragraph>
    </>
  )
}

export default MovieDetails
