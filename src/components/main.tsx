import * as React from "react"
import { useState } from "react"
import MobileNavigation from "./mobileNavigation"
import Section1 from "./section1"
import Section2 from "./section2"

interface MainProps {
  togglePage: Function
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
  index: 1 | 2
  className: string
  id: "1" | "2"
  isMobile: "mobile" | "desktop" | undefined
  location: any
  isLoading: boolean
  movieData: any
  isError: boolean
}

export const Main = ({
  isMobile,
  movieData,
  isLoading,
  location,
  isError,
}: MainProps) => {
  const [index, setIndex] = useState(1)
  const [hidden, setHidden] = useState(true)
  const togglePage = (e: MouseEvent) => {
    if (typeof window !== undefined) {
      let body = document.querySelector("body")
      body !== null && body.classList.length > 0
        ? undefined
        : body !== null
        ? body.classList.add("move")
        : undefined
    }
    setIndex(parseFloat(e.currentTarget.id))
    hidden === true
      ? setHidden(false)
      : setTimeout(function () {
          setHidden(true)
          console.log("section 2 hidden")
        }, 1000)
  }

  return (
    <>
      {isMobile === "mobile" && (
        <>
          <MobileNavigation index={index} togglePage={togglePage} />
          <Section1
            className={`${index} one`}
            index={index}
            isMobile={isMobile}
            location={location}
            isError={isError}
          />
          {hidden === false && (
            <Section2
              className={`${index} two`}
              index={index}
              isMobile={isMobile}
              movieData={movieData}
              isLoading={isLoading}
            />
          )}
        </>
      )}
      {isMobile === "desktop" && (
        <>
          <Section1 isMobile={isMobile} isError={isError} />
          <Section2
            isMobile={isMobile}
            movieData={movieData}
            isLoading={isLoading}
            location={location}
            index={index}
          />
        </>
      )}
    </>
  )
}
