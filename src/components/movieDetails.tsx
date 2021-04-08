import * as React from "react"
import { useState } from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "./sourceData"
import styled from "styled-components"
import FemaleMale from "../images/female_male.inline.svg"
import CinemaFilm from "../images/cinema_film.inline.svg"
import ChairDirector from "../images/chair_director.inline.svg"
import PlayTrailer from "../images/play_trailer.inline.svg"
import SandTime from "../images/sand_time.inline.svg"
import Television from "../images/television.inline.svg"
import Books from "../images/books.inline.svg"
import { useFetchMovieDetails } from "./sourceData"
import { getGenre } from "./genres"
import ExternalLink from "./externalLink"
import IframeMovie from "./youtubeVideo"

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

const PosterCover = styled.img`
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

const GenreArray = styled.div`
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

const Header1 = styled.h1`
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

const HeadlineDetails = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-around;
`
const Year = styled.h3`
  font-family: "Passion One", cursive;
  font-weight: 400;
  line-height: 0.8;
  margin-bottom: 0.2em;
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

const StarringAs = styled.h3`
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

const Paragraph = styled.p`
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
interface IconHeadlineProps {
  readonly fullWidth?: boolean | undefined
}

const IconHeadline = styled.div<IconHeadlineProps>`
  display: inline-table;
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
  width: ${props => (props.fullWidth ? "100%" : "60%")};
  & span {
    display: inline-flex;
  }
  & svg {
    display: inline-flex;
    align-self: center;
    margin: 0 8px;
    height: 1.8em;
    width: 1.8em;
    top: 0.3em;
    position: relative;
    filter: drop-shadow(4px 4px 4px var(--border-main));
  }
  & p {
    white-space: break-spaces;
    color: var(--movie-paragraph-color);
    text-shadow: 6px 6px 6px var(--border-main),
      -6px -6px 6px var(--border-main);
    position: inline;
    line-height: 0.5;
    font-size: 16px;
    margin-block-start: 0;
    margin-block-end: 2em;
    margin-left: 3em;
  }
  & iframe {
    display: block;
    margin: 0.5em auto 0.5em auto;
    border-radius: 12px;
    filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  }
`
const CastlistWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
`

const Headline3 = styled.h3`
  font-family: "Passion One", cursive;
  font-weight: 400;
  font-size: 1.8em;
  margin: 0;
  margin-block-start: 0.8em;
  margin-block-end: 0.5em;
  line-height: 1;
  color: var(--movie-paragraph-color);
  text-shadow: 4px 4px 4px var(--border-main);
`

interface CastCardProps {
  readonly movieId: number
  readonly isMobile: "mobile" | "desktop" | undefined
}

const CastCard = styled.div<CastCardProps>`
  height: fit-content;
  width: 20%;
  min-width: 70px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  & img {
    box-shadow: 8px 8px 6px var(--border-main);
    border-radius: 50%;
    border: ${props =>
      props.isMobile === "mobile"
        ? "4px solid var(--movie-paragraph-color)"
        : "8px solid var(--movie-paragraph-color)"};
    width: 100%;
    min-width: 80px;
    max-width: 180px;
  }
  & h2 {
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 1.2em;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0;
    line-height: 0.9;
    color: var(--movie-paragraph-color);
    text-shadow: 4px 4px 4px var(--border-main);
    text-align: center;
  }
  & h3 {
    font-family: "Open Sans", sans-serif;
    font-weight: 700;
    font-size: 1em;
    margin: 0;
    margin-block-start: 0;
    margin-block-end: 0.4em;
    line-height: 1.1;
    color: var(--movie-paragraph-color);
    text-shadow: 4px 4px 4px var(--border-main);
    text-align: center;
  }
  & p {
    text-align: center;
    margin-block-start: 0.2em;
    margin-block-end: 0.4em;
    margin-left: 0;
  }
`

interface MovieDetailsProps {
  readonly movieId: number
  readonly isMobile: "mobile" | "desktop" | undefined
}

const MovieDetails = ({ movieId, isMobile }: MovieDetailsProps) => {
  console.log(isMobile)
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

  const id = `${movieId}`
  const type = "movie"
  const [movieDetailedData, isLoading] = useFetchMovieDetails({ type, id })
  console.log(movieDetailedData !== null ? movieDetailedData : null)

  const movieYear = movieDetails.release_date.split("-")[0]

  const genreList = movieDetails.genre_ids

  genreList.forEach((genre_id, index) => {
    let genre = getGenre(language, genre_id.toString())
    genreList[index] = genre
  })

  const genreTypes = genreList.map(genre => <h3>{genre}</h3>)

  let keys =
    movieDetailedData !== null
      ? movieDetailedData.data.credits.crew.map((crew, index) =>
          crew.job === "Director" ? crew.name : null
        )
      : null
  const Director =
    movieDetailedData !== null ? keys.find(element => element !== null) : null

  const hours =
    movieDetailedData !== null
      ? Math.floor(Number(movieDetailedData.data.runtime) / 60)
      : null
  const minutes =
    movieDetailedData !== null
      ? Number(movieDetailedData.data.runtime) % 60
      : null

  //console.log(`${hours}h ${minutes}m`)
  const castListData =
    movieDetailedData !== null ? movieDetailedData.data.credits.cast : null
  //console.log(castListData)

  const trailerLinkID =
    movieDetailedData !== null
      ? movieDetailedData.data.videos.results.map(movie =>
          movie.iso_639_1 === "en"
            ? movie.site === "YouTube"
              ? movie.key
              : null
            : null
        )
      : null

  const trailerLink =
    movieDetailedData !== null
      ? trailerLinkID.find(element => element !== null)
      : null

  console.log(trailerLink)

  const castList =
    movieDetailedData !== null
      ? castListData.map((cast, index) =>
          cast.original_name !== "Bruce Willis" ? (
            index < 7 ? (
              cast.profile_path !== null ? (
                <>
                  <CastCard isMobile={isMobile}>
                    <ExternalLink
                      href={`https://www.themoviedb.org/person/${cast.id}`}
                      title={`Details about ${cast.original_name}`} //skal oversættes
                    >
                      <img
                        src={`https://www.themoviedb.org/t/p/w180_and_h180_face${cast.profile_path}`}
                      />
                    </ExternalLink>
                    <h2>{cast.original_name}</h2>
                    <p>as</p>
                    <h3>{cast.character}</h3>
                  </CastCard>
                </>
              ) : null
            ) : null
          ) : null
        )
      : null

  const buyLinks =
    movieDetailedData !== null
      ? movieDetailedData.data.["watch/providers"].results.DK.buy
      : null
  const streamLink =
  movieDetailedData !== null
      ? movieDetailedData.data.["watch/providers"].results.DK.link
      : null
  console.log(buyLinks, streamLink)

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
      <IconHeadline>
        <span>
          <ChairDirector />
          <Headline3>Director</Headline3>
        </span>
        <p>{Director}</p>
      </IconHeadline>
      <IconHeadline>
        <span>
          <SandTime />
          <Headline3>{`${hours}h ${minutes}m`}</Headline3>
        </span>
      </IconHeadline>
      <IconHeadline>
        <span>
          <FemaleMale />
          <Headline3>Also Starring</Headline3>
        </span>
        <CastlistWrapper>{castList}</CastlistWrapper>
      </IconHeadline>
      {trailerLink && (
        <IconHeadline fullWidth>
          <span>
            <PlayTrailer />
            <Headline3>Trailer</Headline3>
          </span>
          {language === "da" && (
            <p>Traileren er desværre kun tilgængelig på engelsk</p>
          )}
          <IframeMovie trailerLink={trailerLink} />
        </IconHeadline>
      )}
      {language === "da" && (
        <IconHeadline fullWidth>
          <span>
            <Television style={{ top: "0" }} />
            <Headline3>Lej eller stream denne film</Headline3>
          </span>
        </IconHeadline>
        )}
        <IconHeadline fullWidth>
        <span>
          <Books />
          <Headline3>Læs mere</Headline3>
        </span>
      </IconHeadline>
      
    </>
  )
}

export default MovieDetails
