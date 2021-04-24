import { useI18next } from "gatsby-plugin-react-i18next"

interface InterfaceObj {
  index: number
  sort?: Function
}

interface IsortedObj {
  release_date: { a: string }
}

const CleanData = (obj: InterfaceObj) => {
  //console.log(obj)
  const { language } = useI18next()
  const entries = Object.entries(obj)
  entries.forEach(function callback(entry, index) {
    //delete not yet released movies
    if (!entry[1].release_date) {
      console.log(`${index} title: ${obj[index].original_title}`)
      obj[index] = undefined
      //delete if no genres are present
    } else if (entry[1].genre_ids.length === 0) {
      obj[index] = undefined
      //delete documentaries
    } else if (
      entry[1]?.genre_ids.find((element: number) => element === 99) === 99
    ) {
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
  const sortedObj: IsortedObj = obj.sort(function (a: any, b: any) {
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

export default CleanData
