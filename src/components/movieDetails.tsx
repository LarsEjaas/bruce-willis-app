import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"
import FemaleMale from "../images/female_male.inline.svg"
import CinemaFilm from "../images/cinema_film.inline.svg"
import { useFetchMovieDetails } from "./sourceData"
import { getGenre } from "./genres"

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

const GenreArray = styled.div<GenreArrayProps>`
  display: inline-flex;
  & h3 {
    font-family: "Passion One", cursive;
    font-size: 20px;
    font-weight: 400;
    margin: 0 12px;
    margin-block-start: 0.5em;
    margin-inline-end: 0;
    line-height: 1;
    color: var(--movie-header1-color);
    text-shadow: 4px 4px 4px var(--border-main);
  }
  & h3:nth-child(2) {
    margin-left: 6px;
  }
  & svg {
    display: inline-flex;
    align-self: center;
    margin-bottom: 5px;
    height: 20px;
    top: 0.5em;
    position: relative;
    filter: drop-shadow(4px 4px 4px var(--border-main));
  }
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

const StarringAs = styled.h3<StarringAsProps>`
  font-family: "Passion One", cursive;
  font-weight: 400;
  font-size: clamp(1rem, 0.6364rem + 1.8182vw, 2rem);
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
  & span {
    display: inline-flex;
  }
  & svg {
    display: inline-flex;
    align-self: center;
    margin: 0 8px;
    height: 1.8em;
    width: 1.8em;
    top: 1em;
    position: relative;
    filter: drop-shadow(4px 4px 4px var(--border-main));
  }
`

const Headline3 = styled.h3<Headline3Props>`
  font-family: "Passion One", cursive;
  font-weight: 400;
  font-size: 1.8em;
  margin: 0;
  margin-block-start: 1em;
  margin-inline-end: 0;
  line-height: 1;
  color: var(--movie-paragraph-color);
  text-shadow: 4px 4px 4px var(--border-main);
`

const MovieDetails = ({ movieId, isMobile }) => {
  const language = "da"
  const movieData = JSON.parse(
    localStorage.getItem(`movieStorageData-${language}`)
  )
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

  const genreList = movieDetails.genre_ids
  console.log(genreList)

  genreList.forEach((genre_id, index) => {
    console.log(genre_id, typeof genre_id)
    let genre = getGenre(language, genre_id.toString())
    genreList[index] = genre
  })

  console.log(genreList)

  const genreTypes = genreList.map(genre => <h3>{genre}</h3>)

  const castListData =
    movieDetailedData !== null ? movieDetailedData.data.cast : null
  console.log(castListData)

  const castList =
    movieDetailedData !== null
      ? castListData.map(cast =>
          castListData.name !== "Bruce Willis" ? (
            <>
              <img
                src={`https://www.themoviedb.org/t/p/w180_and_h180_face${castListData.profile_path}`}
              />
              <h3>{castListData.name}</h3>
            </>
          ) : null
        )
      : null

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
      {genreList !== null && (
        <GenreArray>
          <CinemaFilm />
          {genreTypes}
        </GenreArray>
      )}
      <Header1>{movieDetails.title}</Header1>
      <HeadlineDetails>
        <StarringAs>Som&nbsp;"{movieDetails.character}"</StarringAs>
        <Year>({movieYear})</Year>
      </HeadlineDetails>
      <PosterCover
        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
        alt={`Movie poster from ${movieDetails.original_title}`}
        loading="lazy"
      />
      <Paragraph>{movieDetails.overview}</Paragraph>
      <Cast>
        <span>
          <FemaleMale />
          <Headline3>Also Starring</Headline3>
        </span>
        <div>{castList}</div>
      </Cast>
    </>
  )
}

export default MovieDetails
