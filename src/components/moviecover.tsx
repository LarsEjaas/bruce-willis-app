import * as React from "react"
import { useContext } from "react"
import styled from "styled-components"
import { GlobalContext } from "./layout"

const CoverCard = styled.div<CoverProps>`
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
  id: string
  title: string
  poster_path: string
  release_date: string
}

interface EventInterface {
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
  const { modalToggle } = useContext(GlobalContext)
  console.log(
    release_date,
    typeof release_date,
    new Date(release_date),
    typeof new Date(release_date)
  )
  const year = new Date(release_date).getFullYear()
  const handleEnterKey = (e: EventInterface) => {
    e.currentTarget.click()
  }

  const keyListenersMap = new Map([[13, handleEnterKey]])
  function keyListener(e: EventInterface) {
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode)
    // call the listener if it exists
    return listener && listener(e)
  }

  return (
    <CoverCard
      tabIndex={0}
      onClick={e => modalToggle(e.currentTarget, "movie")}
      onKeyPress={e => keyListener(e)}
      onTouchMove={e => e.currentTarget.focus({ preventScroll: true })}
      onMouseEnter={e => e.currentTarget.focus({ preventScroll: true })}
      aria-label=""
      title={title}
      id={`mc${id}`}
      data-id={id}
      data-year={year}
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
          alt={`Movie poster from ${title}`}
          loading="lazy"
        />
      </picture>
    </CoverCard>
  )
}

export default Cover
