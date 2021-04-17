import * as React from "react"
import styled from "styled-components"

type StyledBackDrop = {
  readonly internUrl?: boolean
}

const StyledBackDrop = styled.picture<StyledBackDrop>`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: ${props => (props.internUrl ? "0.5" : "0.7")};
  -webkit-mask-image: linear-gradient(to top, transparent 12%, black 100%);
  -mask-image: linear-gradient(to top, transparent 12%, black 100%);
  & img {
    width: 100%;
  }
`

interface BackdropProps {
  isMobile: "mobile" | "desktop" | undefined
  backdrop_path: string | null
  original_title: string | null
  internUrl?: boolean
}

const Backdrop = ({
  isMobile,
  original_title,
  backdrop_path,
  internUrl = false,
}: BackdropProps) => {
  return (
    <>
      {original_title && backdrop_path && (
        <StyledBackDrop internUrl={internUrl}>
          <source
            media={
              isMobile === "mobile"
                ? "(max-width: 400px)"
                : "(max-width: 865px)"
            }
            srcSet={
              internUrl
                ? `../w400${backdrop_path}`
                : `https://image.tmdb.org/t/p/w400${backdrop_path}`
            }
          />
          <source
            media={
              isMobile === "mobile"
                ? "(min-width: 401px) and (max-width: 500px)"
                : "(min-width: 866px) and (max-width: 1065px)"
            }
            srcSet={
              internUrl
                ? `../w500${backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${backdrop_path}`
            }
          />
          <>
            <source
              media={
                isMobile === "mobile"
                  ? "(min-width: 501px)"
                  : "(min-width: 1066px)"
              }
              srcSet={
                internUrl
                  ? `../w1000${backdrop_path}`
                  : `https://www.themoviedb.org/t/p/w1000_and_h450_multi_faces${backdrop_path}`
              }
            />
          </>

          <img
            src={
              internUrl
                ? `../w500${backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${backdrop_path}`
            }
            alt={
              internUrl
                ? original_title
                : `Background image from the movie "${original_title}"`
            }
            loading="lazy"
          />
        </StyledBackDrop>
      )}
    </>
  )
}

export default Backdrop
