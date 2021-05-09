import * as React from "react"
import styled from "styled-components"
import { CastEntity } from ".././Data/sourceData"

const MoviePin = styled.div`
  width: 40px;
  height: 2px;
  padding: 3px;
  outline: 1px solid #fff3;
  outline-offset: -3px;
  float: right;
  cursor: pointer;
  transition: outline-color 0.15s ease-in-out;
  &:hover {
    outline-width: 3px;
    outline-color: var(--movie-paragraph-color);
    width: 50px;
  }
`

interface IndexSliderProps {
  isMobile: "mobile" | "desktop" | undefined
}

const IndexSlider = styled.div<IndexSliderProps>`
  height: fit-content;
  display: block;
  position: absolute;
  right: 24px;
  top: 16px;
  z-index: 20;
  width: 50px;
  z-index: 5;
  max-height: ${props =>
    props.isMobile === "mobile" ? "calc(100% - 80px)" : "100%"};
  overflow: auto;
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

interface MovieIndexProps {
  isMobile: "mobile" | "desktop" | undefined
  movieData: CastEntity[]
}

interface EventInterface {
  currentTarget: HTMLAnchorElement
}

const MovieIndex = ({ isMobile, movieData }: MovieIndexProps) => {
  const SmoothScrollToAnchor = (e: EventInterface) => {
    if (!e.currentTarget || typeof window === `undefined`) return
    const hash = e.currentTarget.getAttribute("data-movieId")
    const target: HTMLDivElement | null = document.querySelector(`#mc${hash}`)

    if (!!target.nextElementSibling) {
      target?.focus({ preventScroll: true })
      target?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })
    } else {
      target?.focus({ preventScroll: true })
      let previousSibling = target.previousSibling
      if (!!previousSibling)
        previousSibling.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
    }
  }

  const ListItems = !!movieData
    ? movieData.map((listMovie: CastEntity) =>
        !!listMovie ? (
          <a
            onClick={(e: EventInterface) => SmoothScrollToAnchor(e)}
            tabIndex={-1}
            title={listMovie.title}
            data-movieId={listMovie.id}
          >
            <MoviePin />
          </a>
        ) : null
      )
    : null

  return <IndexSlider isMobile={isMobile}>{ListItems}</IndexSlider>
}

export default MovieIndex
