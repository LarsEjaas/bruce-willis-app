import * as React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3/"
const translation = "da-DK"
const IMAGE_URL = "https://image.tmdb.org/t/p/"

type useFetchProps = {
  type: "person" | "movie"
  id: string | null
  data: null | object
}

export const useFetchAbout = ({ type, id }: useFetchProps) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${translation}`
      )
      const APIdata = await response
      console.log(APIdata),
        setData({
          name: APIdata.data.name,
          biography: APIdata.data.biography,
          profilePicture: APIdata.data.profile_path,
        })
    } catch (error) {
      console.log("An error occurred while fetching data:", error)
    }
    //console.log(p)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading]
}

export const useFetchMovieCredits = ({ type, id }: useFetchProps) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${translation}`
      )
      const APIdata = await response
      console.log(APIdata),
        setData({
          movies: APIdata.data.cast,
        })
    } catch (error) {
      console.log("An error occurred while fetching data:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading]
}

export const useFetchMovieDetails = ({ type, id }: useFetchProps) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${translation}`
      )
      const APIdata = await response
      console.log(APIdata),
        setData({
          movies: APIdata.data.cast,
        })
    } catch (error) {
      console.log("An error occurred while fetching data:", error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading]
}
