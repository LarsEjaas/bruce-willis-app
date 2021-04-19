import * as React from "react"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import FemaleMale from "../images/female_male.inline.svg"
import FilmStrip from "../images/filmStrip.inline.svg"
import ChairDirector from "../images/chair_director.inline.svg"
import PlayTrailer from "../images/play_trailer.inline.svg"
import SandTime from "../images/sand_time.inline.svg"
import Profile from "../images/profile.inline.svg"
import Books from "../images/books.inline.svg"
import TmdbLogo from "../images/tmdb.inline.svg"
import ImdbLogo from "../images/IMDB.inline.svg"
import { useFetchMovieDetails } from "./sourceData"
import { getGenre } from "./genres"
import ExternalLink, { NavigateButton } from "./externalLink"
import IframeMovie from "./youtubeVideo"
import StreamLinks from "./streamingLinks"
import Backdrop from "./backdrop"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"

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
  display: flex;
  flex-wrap: wrap;
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
    margin: 0 4px 6px 0;
    height: 24px;
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

const Note = styled.p`
  white-space: break-spaces;
  color: var(--icon-hover-color1) !important;
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
  font-size: 14px !important;
  margin-block-start: 3em;
  margin-block-end: -2em;
  margin-left: 3em;
  font-style: italic;
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

export const IconHeadline = styled.div<IconHeadlineProps>`
  display: inline-table;
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
  width: ${props => (props.fullWidth ? "100%" : "unset")};
  min-width: ${props => (props.fullWidth ? "unset" : "30%")};
  & span {
    display: inline-flex;
    width: 100%;
    margin-right: 1em;
  }
  & svg {
    display: inline-flex;
    align-self: center;
    margin: 0 8px;
    width: 1.8em;
    top: 0.3em;
    position: relative;
    filter: drop-shadow(4px 4px 4px var(--border-main));
  }
  & p {
    white-space: break-spaces;
    color: var(--movie-paragraph-color);
    margin-block-start: auto;
    margin-block-end: auto;
    font-size: 16px;
    margin-left: 3em;
    flex-basis: 500px;
  }
  & .FullHeight {
    margin: auto;
  }
`

const MovieWrapper = styled.div`
  width: 100%;
  padding-top: 56.25%;
  display: block;
  position: relative;
  & div {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 0;
    border-radius: 12px;
    overflow: hidden;
    margin: 0.5em 0;
    transform: translateX(-50%);
    left: 50%;
    background-color: var(--image-cover-color);
    filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  }
  & iframe {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
`

const CastlistWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-evenly;
`

export const Headline3 = styled.h3`
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
  max-width: ${props => (props.isMobile === "mobile" ? "188px" : "196px")};
  min-width: 70px;
  display: flex;
  flex-direction: column;
  margin-right: 12px;
  & a {
    margin: 0 auto;
    width: 100%;
    transition: transform 0.2s ease-in-out;
  }
  & a:hover {
    transform: scale(1.1);
  }
  & div {
    box-shadow: 8px 8px 6px var(--border-main);
    border-radius: 50%;
    border: ${props =>
      props.isMobile === "mobile"
        ? "4px solid var(--movie-paragraph-color)"
        : "8px solid var(--movie-paragraph-color)"};
    width: 100%;
    padding-top: ${props =>
      props.isMobile === "mobile" ? "calc(100% - 8px)" : "calc(100% - 16px)"};
    min-width: 72px;
    max-width: ${props => (props.isMobile === "mobile" ? "188px" : "196px")};
    overflow: hidden;
    position: relative;
    margin-bottom: 0.5em;
  }
  & a:hover div {
    box-shadow: 6px 12px 6px var(--border-main);
  }
  & svg {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 6%;
    left: 10%;
    margin: 0;
  }
  & img {
    position: absolute;
    top: 0;
    height: 100%;
  }
  & h2 {
    font-family: "Passion One", cursive;
    font-weight: 400;
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
    margin-block-end: 0.8em;
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
    flex-basis: 20px;
  }
`

const ImdbNavigateButton = styled(NavigateButton)`
  padding: 11px 14px 5px;
`

export const StyledTmdbLogo = styled(TmdbLogo)`
  width: 100px !important;
  transform: translateY(-7px);
  height: 13px;
`

const StyledImdbLogo = styled(ImdbLogo)`
  width: 100px !important;
  transform: translateY(-7px);
  height: 29px;
`

interface MovieDetailsProps {
  readonly movieId: number
  readonly isMobile: "mobile" | "desktop" | undefined
}

const MovieDetails = ({ movieId, isMobile }: MovieDetailsProps) => {
  const { t } = useTranslation()
  const id = movieId !== 0 ? movieId : Number(backDropRef.current.id)
  const type = "movie"
  const [movieDetailedData, isLoading] = useFetchMovieDetails({ type, id })
  console.log(isMobile)
  const { language } = useI18next()

  const movieData = JSON.parse(
    localStorage.getItem(`movieStorageData-${language}`)
  )
  console.log(movieData)
  const movieDetails = movieData ? movieData.find(findMovie) : null
  console.log(movieId, id)

  function findMovie(movie) {
    console.log(movie.id, id)
    return movie.id === id
  }

  console.log(movieDetails)

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
    movieDetailedData !== null
      ? movieDetailedData.data.credits.cast.length > 1
        ? movieDetailedData.data.credits.cast
        : null
      : null
  //console.log(castListData)

  const trailerLinkID =
    movieDetailedData !== null
      ? movieDetailedData.data.videos.results.map(movie =>
          movie.iso_639_1 === "en"
            ? movie.site === "YouTube"
              ? movie.type === "Trailer"
                ? movie.key
                : null
              : null
            : null
        )
      : null

  const trailerLink =
    movieDetailedData !== null
      ? trailerLinkID.find(element => element !== null)
      : null

  console.log(trailerLink)

  const imdbId =
    movieDetailedData !== null ? movieDetailedData.data.imdb_id : null

  console.log(
    movieDetailedData !== null ? movieDetailedData : null,
    movieDetailedData !== null ? movieDetailedData.data.imdb_id : null,
    imdbId
  )

  const enDescription =
    language === "da"
      ? movieDetailedData !== null
        ? movieDetailedData.data.overview
        : null
      : null

  const castList =
    castListData !== null
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
                      <div>
                        <Profile />
                        <img
                          src={`https://www.themoviedb.org/t/p/w180_and_h180_face${cast.profile_path}`}
                        />
                      </div>
                    </ExternalLink>
                    <h2>{cast.original_name}</h2>
                    <p>{t("MOVIEDETAILS.STARRING_AS")}</p>
                    <h3>{cast.character}</h3>
                  </CastCard>
                </>
              ) : null
            ) : null
          ) : null
        )
      : null

  console.log(castList !== null && castList.length === 1)

  const languageCode = language === "da" ? "DK" : "US"

  return (
    <>
      {movieDetails.backdrop_path && (
        <Backdrop
          isMobile={isMobile}
          backdrop_path={movieDetails ? movieDetails.backdrop_path : null}
          original_title={movieDetails ? movieDetails.original_title : null}
        />
      )}
      {genreList !== null && (
        <GenreArray>
          <FilmStrip />
          {genreTypes}
        </GenreArray>
      )}
      <Header1>{movieDetails.title}</Header1>
      <HeadlineDetails>
        <StarringAs>
          {t("MOVIEDETAILS.BRUCE_STARRING_AS")}&nbsp;"{movieDetails.character}"
        </StarringAs>
        <Year>({movieYear})</Year>
      </HeadlineDetails>
      <PosterCover
        src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
        alt={`Movie poster from ${movieDetails.original_title}`}
        loading="lazy"
      />
      {!movieDetails.overview && language === "da" && (
        <Note>{t("MOVIEDETAILS.ONLY_ENGLISH_DESCRIPTION")}</Note>
      )}
      <Paragraph>
        {movieDetails.overview ? movieDetails.overview : enDescription}
      </Paragraph>
      {Director && (
        <IconHeadline>
          <span>
            <ChairDirector />
            <Headline3>{t("MOVIEDETAILS.DIRECTOR")}</Headline3>
          </span>
          <p>{Director}</p>
        </IconHeadline>
      )}
      <IconHeadline>
        <span>
          <SandTime />
          <Headline3>{`${hours}${t(
            "MOVIEDETAILS.HOURS"
          )} ${minutes}m`}</Headline3>
        </span>
      </IconHeadline>
      {castList && (
        <IconHeadline fullWidth>
          <span>
            <FemaleMale />
            <Headline3>{t("MOVIEDETAILS.ALSO_STARRING")}</Headline3>
          </span>
          <CastlistWrapper>{castList}</CastlistWrapper>
        </IconHeadline>
      )}
      {trailerLink && (
        <IconHeadline fullWidth>
          <span>
            <PlayTrailer />
            <Headline3>{t("MOVIEDETAILS.TRAILER")}</Headline3>
          </span>
          {language === "da" && (
            <Note>{t("MOVIEDETAILS.ONLY_ENGLISH_TRAILER")}</Note>
          )}
          <MovieWrapper>
            <div>
              <IframeMovie trailerLink={trailerLink} language={language} />
            </div>
          </MovieWrapper>
        </IconHeadline>
      )}
      <StreamLinks
        movieDetailedData={movieDetailedData}
        movieDetails={movieDetails}
        movieYear={movieYear}
        language={language}
        languageCode={languageCode}
      />
      <IconHeadline fullWidth>
        <span>
          <Books />
          <Headline3>{t("MOVIEDETAILS.READ_MORE")}</Headline3>
        </span>
        {imdbId && (
          <>
            <span>
              <p>
                Læs mere om denne titel hos <b>IMDB</b>:&nbsp;
              </p>
              <ExternalLink
                href={`https://www.imdb.com/title/${imdbId}/`}
                title={`Read about ${movieDetails.title} at TMDb`}
                className="FullHeight"
              >
                <ImdbNavigateButton>
                  <StyledImdbLogo />
                </ImdbNavigateButton>
              </ExternalLink>
            </span>
            {language === "da" && (
              <Note>OBS: IMDb er kun tilgængelig på engelsk</Note>
            )}
          </>
        )}
        <Note>&nbsp;</Note>
        <span>
          <p>
            Læs mere om denne titel hos <b>The Movie Database (TMDb)</b>:&nbsp;
          </p>
          <ExternalLink
            href={`https://www.themoviedb.org/movie/${id}/${language}`}
            title={`Read about ${movieDetails.title} at TMDB`}
            className="FullHeight"
          >
            <NavigateButton>
              <StyledTmdbLogo />
            </NavigateButton>
          </ExternalLink>
        </span>
      </IconHeadline>
    </>
  )
}

export default MovieDetails
