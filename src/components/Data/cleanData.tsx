import { CastEntity } from "./sourceData"

const CleanData = (obj: CastEntity[], language: string): CastEntity[] => {
  obj.map((entry: CastEntity, index: number) => {
    //delete not yet released movies
    if (!entry.release_date) {
      obj[index] = undefined
      //delete if no genres are present
    } else if (entry.genre_ids.length === 0) {
      obj[index] = undefined
      //delete documentaries
    } else if (
      entry?.genre_ids.find((element: number) => element === 99) === 99
    ) {
      obj[index] = undefined
    } else if (new Date(entry.release_date) > new Date(Date.now())) {
      obj[index] = undefined
    } else {
      //clean up character field:
      if (entry?.character.indexOf("(uncredited)") !== -1) {
        entry.character = entry.character.replace("(uncredited)", "")
      }
      if (language === "da") {
        if (
          entry.character.indexOf("(") !== -1 ||
          entry.character.indexOf("Himself") !== -1
        ) {
          if (entry.character.indexOf("Himself") !== -1) {
            entry.character = entry.character.replace("Himself", "Bruce Willis")
          }
          if (entry.character.indexOf("(voice)") !== -1) {
            entry.character = entry.character.replace("(voice)", "(stemme)")
          }
        }
      }
    }
  })
  const sortedObj = obj.sort(function (a: any, b: any) {
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
