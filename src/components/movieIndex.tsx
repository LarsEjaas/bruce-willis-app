import * as React from "react"
import styled from "styled-components"

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
`

interface MovieIndexProps {
  isMobile: "mobile" | "desktop" | undefined
  movieData: any
}

interface EventInterface {
  currentTarget: HTMLElement
}

const MovieIndex = ({ isMobile, movieData }: MovieIndexProps) => {
  const SmoothScrollToAnchor = (e: EventInterface) => {
    if (!e.currentTarget || typeof window === `undefined`) return
    const hash = e.currentTarget.getAttribute("data-movieId")
    const target: HTMLElement | null = document.querySelector(`#mc${hash}`)

    // target?.addEventListener("scroll", scrollListener(e), { passive: true })
    // console.log(target?.nextElementSibling !== null, target)
    if (!!target.nextElementSibling) {
      target?.focus({ preventScroll: true })
      target?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      })
    } else {
      console.log(target?.previousSibling)
      target?.focus({ preventScroll: true })
      target?.previousSibling.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      })
    }

    // let scrollTimeout: number

    // function scrollListener(this: Event) {
    //   clearTimeout(scrollTimeout)
    //   scrollTimeout = setTimeout(function () {
    //     target?.focus({ preventScroll: true })
    //     console.log(isMobile)
    //   }, 700)
    // }

    // target?.removeEventListener("scroll", scrollListener(e))
  }

  const ListItems = !!movieData
    ? movieData.map(listMovie =>
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
