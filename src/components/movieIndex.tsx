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
    const target: HTMLElement | null = document.querySelector(`#mc${hash}`)

    target?.addEventListener("scroll", scrollListener(e))

    target?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "nearest",
    })

    let scrollTimeout: number

    function scrollListener(this: Event) {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(function () {
        target?.focus()
        console.log(isMobile)
      }, 700)
    }

    target?.removeEventListener("scroll", scrollListener(e))
    // if (target === null) return
    // smoothScroll(target)
    // console.log(target)
  }

  const ListItems =
    movieData !== null
      ? movieData.map(listMovie =>
          listMovie !== undefined ? (
            <a
              onClick={(e: MouseEvent) => SmoothScrollToAnchor(e)}
              href={`#${listMovie.id}`}
              tabIndex={-1}
              title={listMovie.title}
              //   className="moviePin"
            >
              <MoviePin />
            </a>
          ) : null
        )
      : null

  return <IndexSlider isMobile={isMobile}>{ListItems}</IndexSlider>
}

export default MovieIndex
