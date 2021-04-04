import * as React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3/"
const IMAGE_URL = "https://image.tmdb.org/t/p/"

type useFetchProps = {
  type: "person" | "movie"
  id: string | null
}

export const useFetch = ({ type, id }: useFetchProps) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
        //https://api.themoviedb.org/3/person/62?api_key=8551b13d1962564c7342bfbbb9e3c5d7&language=en-US
      )
      const APIdata = await response
      console.log(APIdata),
        setData({
          name: APIdata.data.name,
          biography: APIdata.data.biography,
          profilePicture: APIdata.data.profile_path,

          // detail: d.data,
          // similar: s.data.results,
          // credits: c.data,
          // videos: v.data.results.filter(video => video.type === "Trailer"),
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
