import * as React from "react"
import { useFetchMovieDetails } from "../Data/sourceData"
import { getGenre } from "../Data/genres"
import { useI18next } from "gatsby-plugin-react-i18next"
import { getWithExpiry } from "../Data/localStorage"
import MovieDetails from "./movieDetails"

interface MovieDetailsProps {
  readonly movieId: number
  readonly isMobile: "mobile" | "desktop" | undefined
  children: React.ReactNode
}

interface InterfaceMovie {
  id?: number
}

const MovieDetailsWrapper = ({ movieId, isMobile }: MovieDetailsProps) => {
  const id = movieId !== 0 ? movieId : null
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

  const movieData: Array<object> = getWithExpiry(`movieStorageData-${language}`)

  const movieDetails: InterfaceMovieDetails = !!movieData
    ? movieData.find(findMovie)
    : null

  function findMovie(movie: InterfaceMovie) {
    return movie.id === id
  }

  const movieYear = movieDetails?.release_date.split("-")[0]

  const genreList = movieDetails?.genre_ids

  genreList.forEach((genre_id, index) => {
    let genre = getGenre(language, genre_id.toString())
    genreList[index] = genre
  })

  const genreTypes = genreList.map(genre => <h3>{genre}</h3>)

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
