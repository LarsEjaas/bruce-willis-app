import { useEffect, useState } from "react"
import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3/"
const IMAGE_URL = "https://image.tmdb.org/t/p/"

interface useFetchProps {
  type: "person" | "movie"
  id: string | null
  data: null | object
  language: "da" | "en"
}

interface Idata {
  name: { data: string }
  biography: { data: string }
  profilePicture: { data: string }
  birthday: { data: string }
  imdb_id: { data: string }
}

interface Ientry {
  release_date: { data: string }
}

interface IsortedObj {
  release_date: { a: string }
}

export const useFetchAbout = ({ type, id, language }: useFetchProps) => {
  const [data, setData] = useState<Idata | null>(null)
  const [isLoading, setLoading] = useState(true)
  const translation = language === "da" ? "da-DK" : "en-US"

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translation}`
      )
      const APIdata = await response
      console.log(APIdata),
        setData({
          name: APIdata.data.name,
          biography: APIdata.data.biography,
          profilePicture: APIdata.data.profile_path,
          birthday: APIdata.data.birthday,
          imdb_id: APIdata.data.imdb_id,
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

export const useFetchMovieCredits = ({ type, id, language }: useFetchProps) => {
  const [data, setData] = useState<Idata | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [Error, setError] = useState<object | null>(null)
  const translation = language === "da" ? "da-DK" : "en-US"

  const cleanData = (obj: object) => {
    //console.log(obj)
    const entries = Object.entries(obj)
    entries.forEach(function callback(entry: Ientry, index: number) {
      // console.log(
      //   `${index}: ${entry[1].original_title} ${entry[1].release_date}`
      // )
      //delete not yet released movies
      if (!entry[1].release_date) {
        console.log(`${index} title: ${obj[index].original_title}`)
        obj[index] = undefined
        //delete if no genres are present
      } else if (entry[1].genre_ids.length === 0) {
        // console.log(
        //   `${index}: ${entry[1].genre_ids}`,
        //   entry[1].genre_ids.length === 0
        // )
        obj[index] = undefined
        //delete documentaries
      } else if (entry[1]?.genre_ids.find(element => element === 99) === 99) {
        //console.log(`${index}: ${entry[1].genre_ids}`)
        obj[index] = undefined
      } else if (new Date(entry[1].release_date) > new Date(Date.now())) {
        console.log("this is a future release", entry[1].original_title)
        obj[index] = undefined
      } else {
        //clean up character field:
        if (entry[1]?.character.indexOf("(uncredited)") !== -1) {
          entry[1].character = entry[1].character.replace("(uncredited)", "")
        }
        if (language === "da") {
          console.log("language is danish", entry[1].character, index)
          if (
            entry[1].character.indexOf("(") !== -1 ||
            entry[1].character.indexOf("Himself") !== -1
          ) {
            console.log("indexOf('(') !== -1", entry[1].character, index)
            if (entry[1].character.indexOf("Himself") !== -1) {
              console.log(
                "replacing himself",
                entry[1].character,
                entry[1].original_title
              )
              entry[1].character = entry[1].character.replace(
                "Himself",
                "Bruce Willis"
              )
            }
            if (entry[1].character.indexOf("(voice)") !== -1) {
              entry[1].character = entry[1].character.replace(
                "(voice)",
                "(stemme)"
              )
            }
          }
        }
      }
    })
    const sortedObj: IsortedObj = obj.sort(function (a, b) {
      a.release_date = new Date(a.release_date)
      b.release_date = new Date(b.release_date)
      if (a.release_date == b.release_date) {
        return 0
      }
      return a.release_date < b.release_date ? 1 : -1
    })

    console.log(sortedObj)

    return sortedObj
  }

  const fetchData = async () => {
    console.log("getting data", data)
    setLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translation}&append_to_response=details`
      )
      const APIdata = await response
      console.log(response)
      const cleanedDATA = cleanData(APIdata.data.cast)
      setData(cleanedDATA)
    } catch (error) {
      setIsError(true)
      setError(error)
      console.log(
        "An error occurred while fetching data:",
        error,
        typeof error,
        isError
      )
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading, isError]
}

const translationDetails = "en-US"

export const useFetchMovieDetails = ({ type, id }: useFetchProps) => {
  const [data, setData] = useState<Idata | null>(null)
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        //681887?api_key=8551b13d1962564c7342bfbbb9e3c5d7&language=en-US&append_to_response=credits,images,videos
        `${BASE_URL}${type}/${id}?api_key=${process.env.GATSBY_TMDB_API_KEY}&language=${translationDetails}&append_to_response=credits,videos,watch/providers`
      )
      const APIdata = await response
      console.log(APIdata), setData(APIdata)
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
