import * as React from "react"
import styled, { keyframes } from "styled-components"
import ActiveElement from "../Hooks/activeElementHook"

const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(-40px) scale(0.9);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`

interface MovieLabelProps {
  readonly isMobile: "mobile" | "desktop" | undefined
}

const LabelContainer = styled.div<MovieLabelProps>`
  height: fit-content;
  width: fit-content;
  position: absolute;
  left: ${props => (props.isMobile === "mobile" ? "52%" : "55%")};
  bottom: ${props => (props.isMobile === "mobile" ? "55px " : "48px")};
  z-index: 25;
  display: flex;
  flex-direction: column;
  max-width: 30%;
`

const Year = styled.h2<MovieLabelProps>`
  font-family: "Passion One", cursive;
  font-weight: 700;
  line-height: 0.7;
  color: var(--primary-font);
  font-size: ${props =>
    props.isMobile === "mobile"
      ? "clamp(2.7rem, -0.2647rem + 14.8235vw, 9rem)"
      : "clamp(2.1rem, -0.7750rem + 7.6667vw, 4.4rem)"};
  text-shadow: #000 -8px 8px 20px;
  margin: 0;
  width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
  animation-fill-mode: both;
`

const Title = styled.h3`
  font-family: "Passion One", cursive;
  font-weight: 400;
  line-height: 0.8;
  color: var(--movie-paragraph-color);
  font-size: clamp(1rem, 0.6364rem + 1.8182vw, 2rem);
  text-shadow: #000 -8px 8px 12px;
  margin: 0;
  max-width: 100%;
  text-align: center;
  animation: ${fadeIn} 0.4s ease-out;
  animation-fill-mode: both;
`

const MovieLabel = ({ isMobile }: MovieLabelProps) => {
  const [activeMovieId, activeMovieYear, activeMovieTitle] = ActiveElement()

  return (
    <LabelContainer isMobile={isMobile}>
      {activeMovieId && (
        <>
          <Year isMobile={isMobile}>{activeMovieYear}</Year>
          <Title>{activeMovieTitle}</Title>
        </>
      )}
    </LabelContainer>
  )
}

export default MovieLabel
