import * as React from "react"
import { useState, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { GlobalContext } from "./layout"
import { useFetchMovieCredits } from "./sourceData"

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
  const [imgIsLoading, setImgIsLoading] = useState(false)

  console.log(movieData !== null ? movieData.movies : null)
  const movies =
    movieData !== null
      ? movieData.movies.sort((a, b) => b.release_date - a.release_date)
      : null
  console.log(movies !== null ? movies : null)
  if (movies !== null) {
    localStorage.setItem("movieStorageData", JSON.stringify(movies))
  }
  //===
  const movieList =
    movies !== null
      ? movies.map(listMovie => (
          <Cover
            poster_path={listMovie.poster_path}
            original_title={listMovie.original_title}
            isMobile={isMobile}
            id={listMovie.id}
          />
        ))
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

interface CoverProps {
  isMobile: "mobile" | "desktop" | undefined
  left?: boolean
  right?: boolean
  active?: boolean
}

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
  &:hover {
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
  &:hover img {
    filter: unset;
  }
`

const Cover = ({ poster_path, original_title, isMobile, id }: CoverProps) => {
  const [active, setActive] = useState(false)

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
      tabIndex="0"
      className={active}
      onClick={e => modalToggle(e.currentTarget, "movie")}
      onKeyPress={e => keyListener(e)}
      aria-label=""
      title=""
      id={id}
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
