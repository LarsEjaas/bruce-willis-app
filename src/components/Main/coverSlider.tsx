import * as React from "react"
import styled, { keyframes } from "styled-components"
import Cover from "./moviecover"
import { CastEntity } from ".././Data/sourceData"

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
interface SliderProps {
  readonly isMobile: "mobile" | "desktop"
}

const Slider = styled.div<SliderProps>`
  position: absolute;
  overflow: hidden;
  @media (max-height: 720px) {
    height: ${props => (props.isMobile === "mobile" ? "100%" : "100vh")};
  }
  @media (min-height: 721px) {
    height: ${props => (props.isMobile === "mobile" ? "100%" : "717px")};
  }
  inset: 0;
  z-index: 3;
  width: 100%;
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
    @media (max-height: 450px) {
      height: 130%;
    }
    @media (min-height: 451px) {
      height: 111%;
    }
    overflow: auto;
    overflow: -moz-scrollbars-none;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .desktop.sliderContainer {
    position: relative;
  }
  .mobile.sliderContainer.left {
    animation: ${sliderFadeInMobile} 1s ease-out 0.2s;
    animation-fill-mode: both;
    position: relative;
    will-change: transform, opacity;
  }
  .sliderContainer::-webkit-scrollbar {
    width: 0 !important;
    display: none;
  }
`

interface MovieCoverProps {
  isMobile: "mobile" | "desktop" | undefined
  index: number
  movieData: CastEntity[]
}

const MovieCovers = ({ isMobile, index, movieData }: MovieCoverProps) => {
  const movieList = !!movieData
    ? movieData.map((listMovie: CastEntity) =>
        !!listMovie ? (
          <Cover
            poster_path={listMovie.poster_path}
            title={listMovie.title}
            isMobile={isMobile}
            id={listMovie.id}
            release_date={listMovie.release_date}
          />
        ) : null
      )
    : null

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
