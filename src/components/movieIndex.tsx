import * as React from "react"
import styled from "styled-components"
import { smoothScroll } from "./smoothScroll"

const MoviePin = styled.div`
  width: 40px;
  height: 2px;
  padding: 3px;
  outline: 1px solid #fff3;
  outline-offset: -4px;
  float: right;
  &:hover {
    outline-width: 3px;
    outline-color: var(--movie-paragraph-color);
    width: 50px;
  }
`

const IndexSlider = styled.div`
  height: fit-content;
  display: block;
  position: absolute;
  right: 24px;
  top: 16px;
  z-index: 20;
  width: 50px;
`

interface MovieIndexProps {
  isMobile: "mobile" | "desktop" | undefined
  index: "1" | "2"
  movieData: any
}

const MovieIndex = ({ isMobile, index, movieData }: MovieIndexProps) => {
  const SmoothScrollToAnchor = (e: MouseEvent) => {
    e.preventDefault()
    if (e.currentTarget === null || typeof window === `undefined`) return
    let hash = e.currentTarget.getAttribute("href")
    hash = hash.substr(1, hash.length)
    console.log(
      hash,
      typeof hash,
      document.querySelector(`#mc${hash}`),
      document.querySelector(`#mc9333`),
      `div${hash}mc`
    )
    const target = document.querySelector(`#mc${hash}`)
    if (target === null) return
    smoothScroll(target)
    console.log(target)
    //const headerOffset = 100
    //const elementPosition = target.offsetTop
    //const offsetPosition = elementPosition - headerOffset
  }

  const ListItems =
    movieData !== null
      ? movieData.map(listMovie =>
          listMovie !== undefined ? (
            <a
              onClick={(e: MouseEvent) => SmoothScrollToAnchor(e)}
              href={`#${listMovie.id}`}
            >
              <MoviePin />
            </a>
          ) : null
        )
      : null

  return <IndexSlider isMobile={isMobile}>{ListItems}</IndexSlider>
}

export default MovieIndex
