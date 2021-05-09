import { useEffect, useState } from "react"
import { setWithExpiry } from "./localStorage"
import CleanData from "./cleanData"

const BASE_URL = "https://api.themoviedb.org/3/"

interface useFetchProps {
  type: "person" | "movie"
  id: string
  language: string
}

interface AboutRawdata {
  adult: boolean
  also_known_as?: string[] | null
  biography: string
  birthday: string
  deathday?: null
  gender: number
  homepage?: null
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
}

interface AboutData {
  name: string
  biography: string
  profilePicture: string
  birthday: string
  imdb_id: string
}

export interface MovieCreditsData {
  cast?: CastEntity[] | null
  crew?: CrewEntity[] | null
  id: number
}

export interface CastEntity {
  adult: boolean
  backdrop_path?: string | null
  genre_ids?: (number | null)[] | null
  id: number
  original_language: string
  original_title: string
  overview: string
  poster_path?: string | null
  release_date?: string | null
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  popularity: number
  character: string
  credit_id: string
  order: number
}
export interface CrewEntity {
  original_title: string
  poster_path: string
  video: boolean
  vote_average: number
  overview: string
  release_date: string
  id: number
  adult: boolean
  backdrop_path?: string | null
  vote_count: number
  genre_ids?: number[] | null
  title: string
  original_language: string
  popularity: number
  credit_id: string
  department: string
  job: string
}

interface MovieDetailsData {
  adult: boolean
  backdrop_path: string
  belongs_to_collection?: null
  budget: number
  genres?: GenresEntity[] | null
  homepage: string
  id: number
  imdb_id: string
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  production_companies?: ProductionCompaniesEntity[] | null
  production_countries?: ProductionCountriesEntity[] | null
  release_date: string
  revenue: number
  runtime: number
  spoken_languages?: SpokenLanguagesEntity[] | null
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  credits: Credits
  videos: Videos
  "watch/providers": WatchProviders
}
export interface GenresEntity {
  id: number
  name: string
}
export interface ProductionCompaniesEntity {
  id: number
  logo_path?: string | null
  name: string
  origin_country: string
}
export interface ProductionCountriesEntity {
  iso_3166_1: string
  name: string
}
export interface SpokenLanguagesEntity {
  english_name: string
  iso_639_1: string
  name: string
}
export interface Credits {
  cast?: CastEntity[] | null
  crew?: CrewEntity[] | null
}
export interface CastEntity {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string | null
  cast_id: number
  character: string
  credit_id: string
  order: number
}
export interface CrewEntity {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path?: string | null
  credit_id: string
  department: string
  job: string
}
export interface Videos {
  results?: ResultsEntity[] | null
}
export interface ResultsEntity {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  site: string
  size: number
  type: string
}
export interface WatchProviders {
  results: Results
}
export interface Results {
  AT: ATOrDE
  BE: BEOrFROrGBOrIEOrNO
  CA: CAOrCHOrDKOrFIOrKROrSEOrUS
  CH: CAOrCHOrDKOrFIOrKROrSEOrUS
  DE: ATOrDE
  DK: CAOrCHOrDKOrFIOrKROrSEOrUS
  FI: CAOrCHOrDKOrFIOrKROrSEOrUS
  FR: BEOrFROrGBOrIEOrNO
  GB: BEOrFROrGBOrIEOrNO
  IE: BEOrFROrGBOrIEOrNO
  IN: INOrIT
  IT: INOrIT
  KR: CAOrCHOrDKOrFIOrKROrSEOrUS
  NO: BEOrFROrGBOrIEOrNO
  SE: CAOrCHOrDKOrFIOrKROrSEOrUS
  US: CAOrCHOrDKOrFIOrKROrSEOrUS
}
export interface ATOrDE {
  link: string
  buy?: BuyEntityOrRentEntityOrFlatrateEntity[] | null
}
export interface BuyEntityOrRentEntityOrFlatrateEntity {
  display_priority: number
  logo_path: string
  provider_id: number
  provider_name: string
}
export interface BEOrFROrGBOrIEOrNO {
  link: string
  buy?: BuyEntityOrRentEntityOrFlatrateEntity[] | null
  rent?: BuyEntityOrRentEntityOrFlatrateEntity[] | null
  flatrate?: BuyEntityOrRentEntityOrFlatrateEntity[] | null
}
export interface CAOrCHOrDKOrFIOrKROrSEOrUS {
  link: string
  buy?: BuyEntityOrRentEntityOrFlatrateEntity[] | null
  rent?: BuyEntityOrRentEntityOrFlatrateEntity[] | null
}
export interface INOrIT {
  link: string
  flatrate?: BuyEntityOrRentEntityOrFlatrateEntity[] | null
}

export const useFetchAbout = ({
  type,
  id,
  language,
}: useFetchProps): [AboutData, boolean] => {
  const [data, setData] = useState<AboutData | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const translation = language === "da" ? "da-DK" : "en-US"

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translation}`
      )
      const APIdata: AboutRawdata = await response.json()
      console.log(JSON.stringify(APIdata))
      setWithExpiry(`movieAbout-${language}`, APIdata)
      setData({
        name: APIdata.name,
        biography: APIdata.biography,
        profilePicture: APIdata.profile_path,
        birthday: APIdata.birthday,
        imdb_id: APIdata.imdb_id,
      })
    } catch (error) {
      //REMEBER TO SET ERROR AN OPEN ERROR MODAL
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading]
}

export const useFetchMovieCredits = ({
  type,
  id,
  language,
}: useFetchProps): [CastEntity[], boolean, boolean] => {
  const [data, setData] = useState<CastEntity[] | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const translation = language === "da" ? "da-DK" : "en-US"

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translation}&append_to_response=details`
      )
      const APIdata: MovieCreditsData = await response.json()
      console.log(JSON.stringify(APIdata))
      const cleanedDATA = CleanData(APIdata.cast, language)
      setData(cleanedDATA)
      setWithExpiry(`movieStorageData-${language}`, cleanedDATA)
    } catch (error) {
      setIsError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return [data, isLoading, isError]
}

const translationDetails = "en-US"

export const useFetchMovieDetails = ({
  type,
  id,
  language,
}: useFetchProps): [MovieDetailsData, boolean, boolean] => {
  const [data, setData] = useState<MovieDetailsData>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translationDetails}&append_to_response=credits,videos,watch/providers`
      )
      const APIdata: MovieDetailsData = await response.json()
      console.log(JSON.stringify(APIdata))
      setData(APIdata)
      setWithExpiry(`movieDetailsData-${id}-${language}`, APIdata)
    } catch (error) {
      setIsError(true)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading, isError]
}
