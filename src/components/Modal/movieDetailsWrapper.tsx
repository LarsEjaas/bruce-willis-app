import * as React from "react"
import { CastEntity, useFetchMovieDetails } from "../Data/sourceData"
import { getGenre } from "../Data/genres"
import { useI18next } from "gatsby-plugin-react-i18next"
import { getWithExpiry } from "../Data/localStorage"
import MovieDetails from "./movieDetails"

interface MovieDetailsProps {
  readonly movieId: number
  readonly isMobile: "mobile" | "desktop" | undefined
}

export interface InterfaceMovie {
  id?: number
}

const MovieDetailsWrapper = ({ movieId, isMobile }: MovieDetailsProps) => {
  const id = movieId !== 0 ? movieId.toString() : null
  const type = "movie"
  const { language } = useI18next()
  const [movieDetailedData, isLoading, isError] = getWithExpiry(
    `movieDetailsData-${id}-${language}`
  )
    ? [getWithExpiry(`movieDetailsData-${id}-${language}`), false, false]
    : useFetchMovieDetails({
        type,
        id,
        language,
      })

  const movieData: CastEntity[] = getWithExpiry(`movieStorageData-${language}`)

  const movieDetails: CastEntity = !!movieData
    ? movieData.find(findMovie)
    : null

  function findMovie(movie: CastEntity) {
    return movie.id === Number(id)
  }

  const movieYear = movieDetails?.release_date.split("-")[0]

  const genreIdList = movieDetails?.genre_ids

  const genreList: string[] = []
  genreIdList.forEach((genre_id: number) => {
    let genre = getGenre(language, genre_id)
    genreList.push(genre)
  })

  const genreTypes = genreList.map((genre: any) => <li>{genre}</li>)

  let keys = !!movieDetailedData
    ? movieDetailedData.credits?.crew.map((crew: any) =>
        crew.job === "Director" ? crew.name : null
      )
    : null
  const Director = !!movieDetailedData
    ? keys?.find((element: any) => !!element)
    : null

  const hours = !!movieDetailedData
    ? Math.floor(Number(movieDetailedData.runtime) / 60)
    : null
  const minutes = !!movieDetailedData
    ? Number(movieDetailedData.runtime) % 60
    : null

  const trailerLinkID = !!movieDetailedData
    ? movieDetailedData.videos?.results.map((movie: any) =>
        movie.iso_639_1 === "en"
          ? movie.site === "YouTube"
            ? movie.type === "Trailer"
              ? movie.key
              : null
            : null
          : null
      )
    : null

  const trailerLink = !!movieDetailedData
    ? trailerLinkID?.find((element: any) => !!element)
    : null

  const imdbId = !!movieDetailedData ? movieDetailedData.imdb_id : null

  const enDescription =
    language === "da"
      ? !!movieDetailedData
        ? movieDetailedData.overview
        : null
      : null

  const languageCode = language === "da" ? "DK" : "US"

  return (
    <MovieDetails
      genreList={genreList}
      isMobile={isMobile}
      movieDetails={movieDetails}
      genreTypes={genreTypes}
      movieYear={movieYear}
      Director={Director}
      hours={hours}
      minutes={minutes}
      enDescription={enDescription}
      languageCode={languageCode}
      isLoading={isLoading}
      movieDetailedData={movieDetailedData}
      trailerLink={trailerLink}
      language={language}
      imdbId={imdbId}
      id={id}
    />
  )
}

export default MovieDetailsWrapper
