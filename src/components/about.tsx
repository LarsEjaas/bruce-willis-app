import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"

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

const AboutView = () => {
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
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
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
      )}
    </>
  )
}

export default AboutView
