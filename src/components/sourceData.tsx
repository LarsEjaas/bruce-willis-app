import { useEffect, useState } from "react"
import axios from "axios"

const BASE_URL = "https://api.themoviedb.org/3/"
const translation = "da-DK"
const language = "da"
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
  const [isLoading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [Error, setError] = useState(null)

  const cleanData = obj => {
    //console.log(obj)
    const entries = Object.entries(obj)
    entries.forEach(function callback(entry, index) {
      // console.log(
      //   `${index}: ${entry[1].original_title} ${entry[1].release_date}`
      // )
      //delete not yet released movies
      if (!entry[1].release_date) {
        //console.log(`${index} title: ${obj[index].original_title}`)
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
          if (entry[1].character.indexOf("(") !== -1) {
            if (entry[1].character.indexOf("Himself") !== -1) {
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
            //console.log(`${index}: ${entry[1].character}`)
          }
        }
      }
    })
    // arr.sort(function(a, b) {
    //   da = new Date(a);
    //   db = new Date(b);
    //   if (da == db) {
    //     return 0;
    //   }
    //   return da > db ? 1 : -1;
    // });

    // console.log(arr);
    const sortedObj = obj.sort(function (a, b) {
      a.release_date = new Date(a.release_date)
      b.release_date = new Date(b.release_date)
      if (a.release_date == b.release_date) {
        return 0
      }
      return a.release_date < b.release_date ? 1 : -1
    })

    console.log(sortedObj)
    // const sortedObj = obj.sort((a, b) => b.release_date - a.release_date)
    return sortedObj
  }

  const fetchData = async () => {
    console.log("getting data", data)
    setLoading(true)
    try {
      const response = await axios.get(
        `${BASE_URL}${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${translation}&append_to_response=details`
      )
      const APIdata = await response
      console.log(response)
      const cleanedDATA = cleanData(APIdata.data.cast)
      console.log(APIdata, cleanedDATA), setData(cleanedDATA)
      //console.log(APIdata), setData(APIdata.data.cast)
    } catch (error) {
      setIsError(true)
      setError(error)
      console.log("An error occurred while fetching data:", error)
    }
    //const cleanedData = data !== null ? cleanData(data) : null
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return [data, isLoading]
}

const translationDetails = "en-US"

export const useFetchMovieDetails = ({ type, id }: useFetchProps) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        //681887?api_key=8551b13d1962564c7342bfbbb9e3c5d7&language=en-US&append_to_response=credits,images,videos
        `${BASE_URL}${type}/${id}?api_key=${process.env.TMDB_API_KEY}&language=${translationDetails}&append_to_response=credits,videos,watch/providers`
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
