import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"
import Calendar from "./images/calendar.inline.svg"
import { useFetchMovieDetails } from "./sourceData"

const BackDrop = styled.picture<BackDropProps>`
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

const PosterCover = styled.picture<PosterCoverProps>`
  & img {
    border-radius: 10px;
    position: inline;
    float: left;
    /* transform: rotate(-14deg) translate(-25%, -10%); */
    transform: rotate(-9deg) translate(-6%, 12%);
    width: 32%;
    z-index: 1;
    filter: drop-shadow(12px 12px 6px var(--image-cover-color));
    shape-outside: polygon(71.73% 1.82%, -11.5% 99.99%, 91.8% 89.82%);
    shape-image-threshold: 0.9;
    shape-margin: 2%;
    margin-right: 7%;
    margin-bottom: 10%;
    transform-origin: center center;
  }
`

const Header1 = styled.h1<Header1Props>`
  text-shadow: 4px 4px 4px var(--border-main);
  color: var(--movie-header1-color);
  margin-block-start: 1em;
  margin-block-end: 1em;
  text-align: center;
  position: relative;
  z-index: 2;
  font-size: clamp(2.5rem, 1.2273rem + 6.3636vw, 6rem);
`

const Paragraph = styled.p<ParagraphProps>`
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
`

const Cast = styled.div<CastProps>`
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
`

const MovieDetails = ({ movieId, isMobile }) => {
  const movieData = JSON.parse(localStorage.getItem("movieStorageData"))
  console.log(movieData)
  console.log(movieId)

  function findMovie(movie) {
    return movie.id === movieId
  }
  const movieDetails = movieData.find(findMovie)
  console.log(movieDetails)

  const id = `${movieId}/credits`
  const type = "movie"
  const [movieDetailedData, isLoading] = useFetchMovieDetails({ type, id })
  console.log(movieDetailedData !== null ? movieDetailedData : null)

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
        <>
          <source
            media={
              isMobile === "mobile"
                ? "(min-width: 501px)"
                : "(min-width: 1066px)"
            }
            srcSet={`https://www.themoviedb.org/t/p/w1000_and_h450_multi_faces${movieDetails.backdrop_path}`}
            loading="lazy"
          />
        </>

        <img
          src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
          alt={`Background image from the movie "${movieDetails.original_title}"`}
          loading="lazy"
        />
      </BackDrop>
      <Header1>{movieDetails.title}</Header1>
      <Calendar />
      <svg viewBox="0 0 32 32" height="24">
        <path d="M30,24.3c-0.5-2.5-2.4-4.6-4.9-5.2c0,0,0,0,0,0c-1.1-0.3-2-1.2-2.2-2.4c1.5-1.1,2.4-2.8,2.4-4.7c0-0.3,0.3-0.6,0.6-0.6  c0.5,0,1-0.4,1-0.9L27,9c0-2.6-2-5.7-4.9-6c-1.7-0.2-3.3,0.4-4.4,1.6c-0.6,0-1.2,0.1-1.7,0.4c2.6,1.2,4.5,3.4,5.4,6.4  c0.6,0.3,1.3,0.4,2,0.5c0,0,0,0.1,0,0.1c0,1.4-0.7,2.6-1.9,3.3c-0.3,0.2-0.5,0.5-0.5,0.9c0,2.3,1.5,4.2,3.7,4.8  c1.5,0.4,2.7,1.5,3.2,2.9h-9.4c-0.1-0.1-0.1-0.1-0.2-0.2c1-2.5,1.6-5.3,1.6-7.9c0-6.2-3.3-9.9-9-9.9s-9,3.7-9,9.9  c0,2.6,0.6,5.4,1.6,7.9c-0.7,0.8-1.1,1.7-1.4,2.8l-0.1,0.7c-0.1,0.4,0,0.9,0.3,1.2C2.7,28.8,3.1,29,3.5,29h14.8  c0.4,0,0.8-0.2,1.1-0.5c0.3-0.3,0.4-0.8,0.3-1.2l-0.1-0.7c0-0.2-0.1-0.4-0.1-0.6h9.1c0.4,0,0.8-0.2,1.1-0.5  C30,25.2,30.1,24.7,30,24.3z M4.2,27L4.2,27c0.3-1.4,1.3-2.5,2.5-3c1.7-0.6,2.8-2.1,2.8-4c0-0.3-0.2-0.7-0.5-0.9  c-1.2-0.7-1.9-2.1-1.9-3.5v-1.7c1.9,1.5,4.5,2.6,7.4,2.8c-0.3,1-0.9,1.8-1.8,2.4c-0.3,0.2-0.5,0.5-0.5,0.9c0,1.8,1.1,3.4,2.8,3.9  c1.3,0.4,2.3,1.6,2.5,2.9l0,0.1H4.2z" />
      </svg>
      <PosterCover>
        <source
          media={
            isMobile === "mobile" ? "(max-width: 432px)" : "(max-width: 865px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
          loading="lazy"
        />
        <source
          media={
            isMobile === "mobile"
              ? "(min-width: 433px) and (max-width: 648px)"
              : "(min-width: 866px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
          loading="lazy"
        />
        {isMobile === "mobile" && (
          <>
            <source
              media="(min-width: 649px) and (max-width: 864px)"
              srcSet={`https://image.tmdb.org/t/p/w400${movieDetails.poster_path}`}
              loading="lazy"
            />
            <source
              media="(min-width: 865px)"
              srcSet={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
              loading="lazy"
            />
          </>
        )}
        <img
          src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
          alt={`Movie poster from ${movieDetails.original_title}`}
          loading="lazy"
        />
      </PosterCover>
      <Paragraph>{movieDetails.overview}</Paragraph>
      <Cast></Cast>
    </>
  )
}

export default MovieDetails
