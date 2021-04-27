interface InterfaceObj {
  index: number
  sort?: Function
  [index: number]: { original_title: string }
}

interface IsortedObj {
  release_date: { a: string }
}

const CleanData = (obj: InterfaceObj, language: string) => {
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
      obj[index] = undefined
    } else if (new Date(entry[1].release_date) > new Date(Date.now())) {
      obj[index] = undefined
    } else {
      //clean up character field:
      if (entry[1]?.character.indexOf("(uncredited)") !== -1) {
        entry[1].character = entry[1].character.replace("(uncredited)", "")
      }
      if (language === "da") {
        if (
          entry[1].character.indexOf("(") !== -1 ||
          entry[1].character.indexOf("Himself") !== -1
        ) {
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

  return sortedObj
}

export default CleanData
