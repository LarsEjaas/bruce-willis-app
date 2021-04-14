import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"

//images
//https://api.themoviedb.org/3/person/62/tagged_images?api_key=8551b13d1962564c7342bfbbb9e3c5d7&language=en-US&page=1

//https://image.tmdb.org/t/p/w500/w7RDIgQM6bLT7JXtH4iUQd3Iwxm.jpg

const BackDrop = styled.picture`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.7;
  -webkit-mask-image: linear-gradient(to top, transparent 12%, black 100%);
  -mask-image: linear-gradient(to top, transparent 12%, black 100%);
  & img {
    width: 100%;
  }
`

const BruceImage = styled.picture`
  position: relative;
  }
  & img {
    border-radius: 22px;
  }
`

const Paragraph = styled.p`
  white-space: break-spaces;
`

//Bruce Willis has id: 62
//const id = "62/movie_credits" - for all movie credits
const id = "62"
const type = "person"

//https://api.themoviedb.org/3/person/62?api_key=8551b13d1962564c7342bfbbb9e3c5d7&language=en-US

const AboutView = ({ isMobile }) => {
  console.log(id, type)
  const [data, isLoading] = useFetchAbout({ type, id })
  const [imgIsLoading, setImgIsLoading] = useState(false)

  let biographyText =
    data !== null ? data.biography.match(/[^\s.!?]+[^.!?\r\n]+[.!?]*/g) : null
  console.log(biographyText)
  biographyText = biographyText !== null ? biographyText.join("\n") : null
  console.log(data !== null ? data.biography : null, biographyText)

  return (
    <>
      <BackDrop>
        <source
          media={
            isMobile === "mobile" ? "(max-width: 400px)" : "(max-width: 865px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w400${movieDetails.backdrop_path}`}
          loading="lazy"
        />
        <source
          media={
            isMobile === "mobile"
              ? "(min-width: 401px) and (max-width: 500px)"
              : "(min-width: 866px) and (max-width: 1065px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          loading="lazy"
        />
      </BackDrop>
      <BruceImage>
        <source
          media="(max-width: 599px)"
          srcSet={`https://www.themoviedb.org/t/p/w180_and_h180_face${data.profilePicture}`}
        />
        <source
          media="(min-width: 600px)"
          srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_face${data.profilePicture}`}
        />
        <img
          src={`https://www.themoviedb.org/t/p/w300_and_h450_face${data.profilePicture}`}
          alt={`Profile Picture of ${data.name}`}
        />
      </BruceImage>
      <h2>{data.name}</h2>
      <Paragraph>{biographyText}</Paragraph>
    </>
  )
}

export default AboutView
