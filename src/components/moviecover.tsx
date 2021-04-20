import * as React from "react"
import { useState, useContext } from "react"
import styled, { keyframes } from "styled-components"
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
  original_title: string
  poster_path: string
}

const Cover = ({ poster_path, original_title, isMobile, id }: CoverProps) => {
  const [active, setActive] = useState<boolean>(false)

  const { modalToggle } = useContext(GlobalContext)
  const handleEnterKey = e => {
    console.log(e)
    e.currentTarget.click()
  }

  const keyListenersMap = new Map([[13, handleEnterKey]])
  function keyListener(e) {
    console.log(e, e.keyCode)
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode)
    // call the listener if it exists
    return listener && listener(e)
  }

  return (
    <CoverCard
      tabIndex={0}
      className={active}
      onClick={e => modalToggle(e.currentTarget, "movie")}
      onKeyPress={e => keyListener(e)}
      aria-label=""
      title=""
      id={`mc${id}`}
    >
      <picture className={isMobile}>
        <source
          media={
            isMobile === "mobile" ? "(max-width: 432px)" : "(max-width: 865px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w200${poster_path}`}
          loading="lazy"
        />
        <source
          media={
            isMobile === "mobile"
              ? "(min-width: 433px) and (max-width: 648px)"
              : "(min-width: 866px)"
          }
          srcSet={`https://image.tmdb.org/t/p/w300${poster_path}`}
          loading="lazy"
        />
        {isMobile === "mobile" && (
          <>
            <source
              media="(min-width: 649px) and (max-width: 864px)"
              srcSet={`https://image.tmdb.org/t/p/w400${poster_path}`}
              loading="lazy"
            />
            <source
              media="(min-width: 865px)"
              srcSet={`https://image.tmdb.org/t/p/w500${poster_path}`}
              loading="lazy"
            />
          </>
        )}
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={`Movie poster from ${original_title}`}
          loading="lazy"
        />
      </picture>
    </CoverCard>
  )
}

export default Cover
