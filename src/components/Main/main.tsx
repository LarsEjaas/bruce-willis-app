import * as React from "react"
import { useState } from "react"
import MobileNavigation from "./mobileNavigation"
import Section1 from "./section1"
import Section2 from "./section2"
import { CastEntity } from ".././Data/sourceData"

interface MainProps {
  togglePage?: Function
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
  index?: 1 | 2
  className?: string
  id?: "1" | "2"
  isMobile?: "mobile" | "desktop" | undefined
  location?: any
  isLoading?: boolean
  movieData: CastEntity[]
  isError: boolean
}

interface Event {
  currentTarget?: HTMLElement
}

export const Main = ({ isMobile, movieData, isError }: MainProps) => {
  const [index, setIndex] = useState<number>(1)
  const [hidden, setHidden] = useState<boolean>(true)
  const togglePage = (e: Event) => {
    if (typeof window !== undefined) {
      let body = document.querySelector("body")
      !!body && body.classList.length > 0
        ? undefined
        : body.classList.add("move")
    }
    setIndex(Number(e.currentTarget.id))
    hidden === true
      ? setHidden(false)
      : setTimeout(function () {
          setHidden(true)
        }, 1300)
  }

  return (
    <>
      {isMobile === "mobile" && (
        <>
          <MobileNavigation index={index} togglePage={togglePage} />
          <Section1 index={index} isMobile={isMobile} isError={isError} />
          {hidden === false && (
            <Section2 index={index} isMobile={isMobile} movieData={movieData} />
          )}
        </>
      )}
      {isMobile === "desktop" && (
        <>
          <Section1 isMobile={isMobile} isError={isError} />
          <Section2 isMobile={isMobile} movieData={movieData} index={index} />
        </>
      )}
    </>
  )
}
