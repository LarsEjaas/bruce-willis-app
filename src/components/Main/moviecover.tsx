import * as React from "react"
import { useContext, useRef, useEffect, MutableRefObject } from "react"
import styled from "styled-components"
import { GlobalContext } from "../layout"
import { useTranslation } from "gatsby-plugin-react-i18next"

interface CoverCardProps {
  id: string
  active?: boolean
  isMobile: "mobile" | "desktop" | undefined
}

const CoverCard = styled.div<CoverCardProps>`
  position: relative;
  width: 46.3%;
  height: 0;
  padding-top: 69.44%;
  border-radius: 20px;
  overflow: hidden;
  margin: 10px auto;
  background-color: var(--image-cover-color);
  box-shadow: var(--box-shadow-primary);
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  transform-origin: center;
  transform: ${props => (props.active === true ? "scale(1.1)" : "scale(1)")};
  z-index: 1;
  &:last-of-type {
    margin-bottom: 50px;
  }
  &:nth-child(1) {
    margin-top: 40px;
  }
  &:hover,
  &:active,
  &:focus {
    transform: scale(1.13);
    box-shadow: var(--box-shadow-raised);
    z-index: 2;
  }
  & img {
    border-radius: 20px;
    filter: sepia(1);
    transition: filter 0.3s ease-in-out;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
  }
  &:hover img,
  &:active img,
  &:focus img {
    filter: unset;
  }
`

interface CoverProps {
  isMobile: "mobile" | "desktop" | undefined
  left?: boolean
  right?: boolean
  active?: boolean
  id: number
  title: string
  poster_path?: string
  release_date?: string
  data_id?: string
  data_year?: string
}

interface Event {
  currentTarget?: HTMLElement
  keyCode?: number
}

const Cover = ({
  poster_path,
  title,
  isMobile,
  id,
  release_date,
}: CoverProps) => {
  const { t } = useTranslation()
  const coverRef: MutableRefObject<HTMLDivElement> = useRef()
  const { modalToggle } = useContext(GlobalContext)
  const year = new Date(release_date).getFullYear()
  const handleEnterKey = (e: Event) => {
    e.currentTarget.click()
  }

  const keyListenersMap = new Map([[13, handleEnterKey]])
  function keyListener(e: Event) {
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode)
    // call the listener if it exists
    return listener && listener(e)
  }

  const focusElement = () => {
    coverRef.current.focus({ preventScroll: true })
  }

  useEffect(() => {
    coverRef.current.addEventListener("touchmove", focusElement, {
      passive: true,
    })
    return coverRef.current.removeEventListener("touchMove", focusElement)
  }, [])

  return (
    <CoverCard
      tabIndex={0}
      ref={coverRef}
      onClick={e => modalToggle(e.currentTarget, "movie")}
      onKeyPress={e => keyListener(e)}
      onMouseEnter={e => e.currentTarget.focus({ preventScroll: true })}
      aria-label={`${title}${t("FROM")}${year}`}
      title={title}
      id={`mc${id}`}
      data-id={id}
      data-year={year}
      isMobile={isMobile}
    >
      <picture className={isMobile}>
        <source
          media={
            isMobile === "mobile" ? "(max-width: 432px)" : "(max-width: 865px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w200${poster_path}`}
        />
        <source
          media={
            isMobile === "mobile"
              ? "(min-width: 433px) and (max-width: 648px)"
              : "(min-width: 866px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w300${poster_path}`}
        />
        {isMobile === "mobile" && (
          <>
            <source
              media="(min-width: 649px) and (max-width: 864px)"
              srcSet={`https://image.tmdb.org/t/p/w400${poster_path}`}
            />
            <source
              media="(min-width: 865px)"
              srcSet={`https://image.tmdb.org/t/p/w500${poster_path}`}
            />
          </>
        )}
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={`${t("MOVIEDETAILS.MOVIE_POSTER_ALT")}${title}`}
          loading="lazy"
        />
      </picture>
    </CoverCard>
  )
}

export default Cover
