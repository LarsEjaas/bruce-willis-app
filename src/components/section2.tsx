import * as React from "react"
import styled, { keyframes } from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import LanguageToggle from "./languageToggle"
import MovieCovers from "./coverSlider"
import MovieIndex from "./movieIndex"
import MovieLabel from "./movieLabel"

const circleFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-50%) translateX(-40px) scale(0.9);
}
to {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
`

export const slideDown = keyframes`
from {
  opacity: 0;
  transform: translateY(-40px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`

interface StyledProps {
  readonly left?: boolean
  readonly isMobile: "mobile" | "desktop" | undefined
}

const Section = styled.section<StyledProps>`
  position: relative;
  background: ${props =>
    props.left ? "var(--background1)" : "var(--background2)"};
  border-radius: ${props => (props.left ? "40px 0 0 40px" : "0 40px 40px 0")};
  height: ${props => (props.isMobile === "mobile" ? "100%" : "unset")};
  &.mobile {
    border-radius: 0;
  }
  .BruceW {
    z-index: 2;
    position: absolute;
    left: 0;
  }
  .BruceW.mobile {
    top: 0;
    bottom: 0;
    right: 0;
    width: 90vw;
    margin: auto;
    max-width: 549px;
    max-height: 749px;
    height: 127vw;
  }
  .BruceW.desktop {
    bottom: 3%;
    width: 103%;
  }
  .grunge {
    overflow: hidden;
    position: absolute;
    inset: 0;
    border-radius: 0 40px 40px 0;
    opacity: 0.5;
    z-index: 2;
  }
  SVG {
    transition: all 0.2s ease-in-out;
  }
  SVG path {
    fill: var(--icon-color1);
  }
  SVG:hover path {
    fill: var(--icon-hover-color1);
  }
  SVG:hover {
    transform: scale(1.2);
  }
`

const CircleWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  inset: 0;
  z-index: 2;
`

const Circle2 = styled.div<StyledProps>`
  height: 0;
  padding-top: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 12px)" : "calc(166% - 12px)"};
  border: 2px solid #fff3;
  border-radius: 50%;
  width: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 6px)" : "calc(166% - 6px)"};
  left: calc(-166% + 82px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &.desktop {
    animation: ${circleFadeIn} 1s ease-out;
  }
  &.mobile&.left {
    animation: ${circleFadeIn} 1s ease-out 0.3s;
    animation-fill-mode: both;
  }
`

const Circle3 = styled.div<StyledProps>`
  height: 0;
  padding-top: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 12px)" : "calc(200% - 12px)"};
  border: 3px solid #ffffff1a;
  border-radius: 50%;
  width: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 6px)" : "calc(200% - 6px)"};
  left: calc(-166% + 82px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &.desktop {
    animation: ${circleFadeIn} 1s ease-out;
  }
  &.mobile&.left {
    animation: ${circleFadeIn} 1s ease-out 0.3s;
    animation-fill-mode: both;
  }
`

const Circle4 = styled.div<StyledProps>`
  height: 0;
  padding-top: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 12px)" : "calc(233% - 12px)"};
  border: 4px solid #ffffff0d;
  border-radius: 50%;
  width: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 6px)" : "calc(233% - 6px)"};
  left: calc(-166% + 82px);
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &.desktop {
    animation: ${circleFadeIn} 1s ease-out;
  }
  &.mobile&.left {
    animation: ${circleFadeIn} 1s ease-out 0.3s;
    animation-fill-mode: both;
  }
`

interface Section2Props {
  readonly isMobile: "mobile" | "desktop" | undefined
  index: 1 | 2
  movieData: any
  isLoading: true | false
  location: any
}

const Section2 = ({
  isMobile,
  index,
  movieData,
  isLoading,
  location,
}: Section2Props) => (
  <Section
    isMobile={isMobile}
    className={index === 2 ? `${isMobile} left` : `${isMobile} right`}
  >
    <StaticImage
      className={index === 1 ? "grunge right" : "grunge left"}
      src="../images/grunge-texture.png"
      alt="grunge background-texture"
      loading="eager"
      placeholder="none"
      formats={["auto", "webp", "avif"]}
      layout="constrained"
    />
    <CircleWrapper>
      <Circle2
        className={index === 1 ? `${isMobile} right` : `${isMobile} left`}
      ></Circle2>
      <Circle3
        className={index === 1 ? `${isMobile} right` : `${isMobile} left`}
      ></Circle3>
      <Circle4
        className={index === 1 ? `${isMobile} right` : `${isMobile} left`}
      ></Circle4>
    </CircleWrapper>
    {isMobile === "desktop" && (
      <LanguageToggle location={location} className={isMobile} />
    )}
    <MovieCovers movieData={movieData} index={index} isMobile={isMobile} />
    <MovieIndex isMobile={isMobile} movieData={movieData} />
    <MovieLabel isMobile={isMobile} />
  </Section>
)

export default Section2
