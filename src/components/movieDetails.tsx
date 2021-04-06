import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"
import Calendar from "../images/calendar.inline.svg"
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

const PosterCover = styled.img<PosterCoverProps>`
  border-radius: 10px;
  position: inline;
  float: left;
  transform: rotate(-9deg) translate(-6%, 12%);
  width: 32%;
  max-width: 200px;
  z-index: 1;
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(71.73% 1.82%, -11.5% 99.99%, 91.8% 89.82%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  margin-right: 30px;
  margin-bottom: 8%;
  transform-origin: center center;
`

const Header1 = styled.h1<Header1Props>`
  text-shadow: 4px 4px 4px var(--border-main);
  color: var(--movie-header1-color);
  margin: 0;
  margin-block-start: 1em;
  margin-block-end: 0;
  text-align: center;
  position: relative;
  z-index: 2;
  font-size: clamp(2.5rem, 1.2273rem + 6.3636vw, 6rem);
`

const HeadlineDetails = styled.div<HeadlineDetailsProps>`
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
`
const Year = styled.h3<YearProps>`
  font-family: "Passion One", cursive;
  font-weight: 400;
  line-height: 0.8;
  margin: 0;
  margin-block-start: 0;
  margin-inline-end: 0;
  padding: 4px 8px;
  color: var(--border-main);
  font-size: clamp(1.5rem, 1.0273rem + 2.3636vw, 2.8rem);
  background-color: var(--movie-header1-color);
  box-shadow: 6px 6px 16px var(--border-main);
  border-radius: 0.3em;
  transform: rotate(-4deg);
`

const Headline3 = styled.h3<Headline3Props>`
  font-family: "Passion One", cursive;
  font-weight: 400;
  margin: 0;
  margin-block-start: 0.5em;
  margin-inline-end: 0;
  line-height: 1;
  color: var(--movie-header1-color);
  text-shadow: 4px 4px 4px var(--border-main);
`

const Paragraph = styled.p<ParagraphProps>`
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
  font-size: 16px;
  margin-block-start: 3em;
  margin-block-end: 1em;
  &::first-letter {
    font-family: "Passion One", cursive;
    float: left;
    font-size: 98px;
    line-height: 50px;
    padding-top: 16px;
    padding-right: 8px;
    padding-left: 0px;
    margin-left: calc(-12px + 1%);
    text-shadow: 6px 6px 6px var(--border-main);
  }
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

  const movieYear = movieDetails.release_date.split("-")[0]

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
      <HeadlineDetails>
        <Headline3>Som&nbsp;"{movieDetails.character}"</Headline3>
        <Year>({movieYear})</Year>
      </HeadlineDetails>
      <PosterCover
        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
        alt={`Movie poster from ${movieDetails.original_title}`}
        loading="lazy"
      />
      <Paragraph>{movieDetails.overview}</Paragraph>
      <Cast></Cast>
    </>
  )
}

export default MovieDetails
