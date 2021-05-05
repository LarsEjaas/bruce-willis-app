import { useEffect, useState } from "react"
import { setWithExpiry } from "./localStorage"
import CleanData from "./cleanData"

const BASE_URL = "https://api.themoviedb.org/3/"

interface useFetchProps {
  type: "person" | "movie"
  id: string
  data?: object
  language?: string
}

interface Idata {
  name: { data: string }
  biography: { data: string }
  profilePicture: { data: string }
  birthday: { data: string }
  imdb_id: { data: string }
}

export const useFetchAbout = ({ type, id, language }: useFetchProps) => {
  const [data, setData] = useState<Idata | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const translation = language === "da" ? "da-DK" : "en-US"

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translation}`
      )
      const APIdata = await response.json()
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

export const useFetchMovieCredits = ({ type, id, language }: useFetchProps) => {
  const [data, setData] = useState<Idata | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const translation = language === "da" ? "da-DK" : "en-US"

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translation}&append_to_response=details`
      )
      const APIdata = await response.json()
      const cleanedDATA: any = CleanData(APIdata.cast, language)
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

export const useFetchMovieDetails = ({ type, id, language }: useFetchProps) => {
  const [data, setData] = useState<Idata | null>(null)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translationDetails}&append_to_response=credits,videos,watch/providers`
      )
      const APIdata: any = await response.json()
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
