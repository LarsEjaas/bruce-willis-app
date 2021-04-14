import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"
import FemaleMale from "../images/female_male.inline.svg"
import FilmStrip from "../images/filmStrip.inline.svg"
import ChairDirector from "../images/chair_director.inline.svg"
import PlayTrailer from "../images/play_trailer.inline.svg"
import SandTime from "../images/sand_time.inline.svg"
import Television from "../images/television.inline.svg"
import Books from "../images/books.inline.svg"
import TmdbLogo from "../images/tmdb.inline.svg"
import ImdbLogo from "../images/IMDB.inline.svg"
import { useFetchMovieDetails } from "./sourceData"
import { getGenre } from "./genres"
import ExternalLink from "./externalLink"
import IframeMovie from "./youtubeVideo"
import StreamLinks from "./streamingLinks"

const StyledBackDrop = styled.picture`
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

interface BackdropProps {
  isMobile: "mobile" | "desktop" | undefined
  backdrop_path: string | null
  original_title: string | null
}

const Backdrop = ({
  isMobile,
  original_title,
  backdrop_path,
}: BackdropProps) => {
  return (
    <>
      {original_title && backdrop_path && (
        <StyledBackDrop>
          <source
            media={
              isMobile === "mobile"
                ? "(max-width: 400px)"
                : "(max-width: 865px)"
            }
            srcSet={`https://image.tmdb.org/t/p/w400${backdrop_path}`}
            loading="lazy"
          />
          <source
            media={
              isMobile === "mobile"
                ? "(min-width: 401px) and (max-width: 500px)"
                : "(min-width: 866px) and (max-width: 1065px)"
            }
            srcSet={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            loading="lazy"
          />
          <>
            <source
              media={
                isMobile === "mobile"
                  ? "(min-width: 501px)"
                  : "(min-width: 1066px)"
              }
              srcSet={`https://www.themoviedb.org/t/p/w1000_and_h450_multi_faces${backdrop_path}`}
              loading="lazy"
            />
          </>

          <img
            src={`https://image.tmdb.org/t/p/w500${backdrop_path}`}
            alt={`Background image from the movie "${original_title}"`}
            loading="lazy"
          />
        </StyledBackDrop>
      )}
    </>
  )
}

export default Backdrop
