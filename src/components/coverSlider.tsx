import * as React from "react"
import { useState, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { GlobalContext } from "./layout"
import { useFetchMovieCredits } from "./sourceData"
import Cover from "./moviecover"

interface SliderProps {
  left?: boolean
  right?: boolean
  isMobile?: "mobile" | "desktop" | undefined
  index: 1 | 2
  movieData: Array | null
}

interface SliderPropsArray extends Array<SliderProps> {}

const sliderFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(-250px) rotate(9deg);
}
to {
  opacity: 1;
  transform: translateX(calc(8.33% * -1)) rotate(9deg);
}
`

const sliderFadeInMobile = keyframes`
from {
  opacity: 0;
  transform: translateX(-200px) rotate(9deg);
}
to {
  opacity: 1;
  transform: rotate(9deg);
}
`

const Slider = styled.div<SliderProps>`
  position: absolute;
  overflow: hidden;
  inset: 0;
  .sliderContainer {
    transform: ${props =>
      props.isMobile === "mobile"
        ? "rotate(9deg)"
        : "translateX(calc(6.33% * -1)) rotate(9deg)"};
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    transform-origin: top right;
    padding: 16px 0;
    height: 110%;
    overflow: auto;
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
  .desktop.sliderContainer {
    animation: ${sliderFadeIn} 1s ease-out;
    position: relative;
  }
  .mobile.sliderContainer.left {
    animation: ${sliderFadeInMobile} 1s ease-out 0.2s;
    animation-fill-mode: both;
    position: relative;
  }
  .sliderContainer::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
`

//Bruce Willis has id: 62
const id = "62/movie_credits"
const type = "person"

const MovieCovers = ({ isMobile, index }: SliderProps) => {
  console.log(id, type)
  const [movieData, isLoading] = useFetchMovieCredits({ type, id })
  const language = "da"

  // console.log(movieData !== null ? (movieData, movieData.[2]) : null)

  // if (movieData !== null) {console.log(movieData.[2])}

  // console.log(movieData !== null ? movieData : null)

  if (movieData !== null) {
    localStorage.setItem(
      `movieStorageData-${language}`,
      JSON.stringify(movieData)
    )
  }
  //===
  const movieList =
    movieData !== null
      ? movieData.map(listMovie =>
          listMovie !== undefined ? (
            <Cover
              poster_path={listMovie.poster_path}
              original_title={listMovie.original_title}
              isMobile={isMobile}
              id={listMovie.id}
            />
          ) : null
        )
      : null
  console.log(movieList)
  //===

  return (
    <Slider isMobile={isMobile}>
      <div
        className={
          index === 1
            ? `${isMobile} sliderContainer right`
            : `${isMobile} sliderContainer left`
        }
      >
        {movieList}
      </div>
    </Slider>
  )
}

export default MovieCovers
