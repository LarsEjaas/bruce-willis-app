import { useState, useEffect } from "react"

const ActiveElement = () => {
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null)
  const [activeMovieId, setActiveMovieId] = useState<string | null | undefined>(
    null
  )
  const [activeMovieYear, setActiveMovieYear] = useState<
    string | null | undefined
  >(null)
  const [activeMovieTitle, setActiveMovieTitle] = useState<
    string | null | undefined
  >(null)

  const handleFocusIn = () => {
    setActiveElement(document.activeElement as HTMLElement | null)
  }

  useEffect(() => {
    document.addEventListener("focusin", handleFocusIn)
    return () => {
      document.removeEventListener("focusin", handleFocusIn)
    }
  }, [])

  useEffect(() => {
    const idString = activeElement?.getAttribute("data-id")
    const yearString = activeElement?.getAttribute("data-year")
    const titleString = activeElement?.title
    setActiveMovieId(idString)
    setActiveMovieYear(yearString)
    setActiveMovieTitle(titleString)
  }, [activeElement])

  return [activeMovieId, activeMovieYear, activeMovieTitle]
}

export default ActiveElement
