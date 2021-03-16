import * as React from "react"
import { useState } from "react"
import styled, { keyframes } from 'styled-components'
import { StaticImage } from "gatsby-plugin-image"
import EjaasLogo from "../svg/ejaas_logo.inline.svg"
import TMDBlogoVertical from "../svg/tmdb_logo_upright.inline.svg"
import TMDBlogo from "../svg/tmdb_logo.inline.svg"
import ExternalLink from './externalLink'
import MovieCovers from './coverSlider'
import MobileNavigation from './mobileNavigation'

interface SectionProps {
    left?: boolean;
    right?: boolean;
    isMobile?: "mobile" | "desktop" | undefined;
    className?: string;
    index: 1 | 2 ;
  }

  const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
from {
  opacity: 0;
  transform: translateX(-40px);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

const circleFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-50%) translateX(-40px) scale(0.9);
}
to {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
`;

const slideUp = keyframes`
from {
  opacity: 0;
  transform: translateY(40px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;

const slideLeft = keyframes`
from {
  transform: translateX(0);
}
to {
  opacity: 1;
  transform: translateX(-100vw);
}
`;
const slideRight = keyframes`
from {
  transform: translateX(-100vw);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`;

const Section = styled.section<SectionProps>
  ` position: relative;
    background: ${props => props.left ? "var(--background1)" : "var(--background2)"};
    border-radius: ${props => props.left ? "40px 0 0 40px" : "0 40px 40px 0"};
    height: ${props => props.isMobile==="mobile" ? "100vh" : "unset"};
    &.mobile.right{
      animation: ${slideRight} 1s ease-in-out;
      animation-fill-mode: both;
      border-radius: 0;
    }
    &.mobile.left{
      animation: ${slideLeft} 1s ease-in-out;
      animation-fill-mode: both;
      border-radius: 0;
    }
    & .BruceW {
      z-index: 2;
      position: absolute;
      top: ${props => props.isMobile==="mobile" ? "0" : "unset"};
      bottom: ${props => props.isMobile==="mobile" ? "0" : "3%"};
      left: 0; 
      right: ${props => props.isMobile==="mobile" ? "0" : "unset"};
      width: ${props => props.isMobile==="mobile" ? "90vw" : "103%"};
      margin: ${props => props.isMobile==="mobile" ? "auto" : "unset"};
      max-width: ${props => props.isMobile==="mobile" ? "549px" : "unset"};
      max-height: ${props => props.isMobile==="mobile" ? "749px" : "unset"};
      height: ${props => props.isMobile==="mobile" ? "127vw" : "unset"};
      animation: ${fadeIn} 1.5s cubic-bezier(1, 0, 1, 1);
      animation-fill-mode: both;
      }
    & .EjaasLogo {
      position: absolute;
      z-index: 3;
      bottom: ${props => props.isMobile==="mobile" ? "unset" : "24px"};
      height: ${props => props.isMobile==="mobile" ? "43px" : "48px"};
      right: 24px;
      top: ${props => props.isMobile==="mobile" ? "24px" : "unset"};
      animation: ${slideUp} 1s ease-out;
      }
    & SVG {
       transition: all 0.2s ease-in-out;
      }
    & SVG path {
      fill: var(--icon-color1);
      }
    & SVG:hover path {
      fill: var(--icon-hover-color1);
      }
    & SVG:hover {
      transform: scale(1.1)
      }
    & .grunge {
      overflow:hidden;
      position:absolute;
      inset: 0;
      border-radius: 0 40px 40px 0;
      animation: ${fadeIn} 1.5s cubic-bezier(1, 0, 1, 1);;
      }
      `

  const Navigation = styled.nav<SectionProps> 
      `z-index: 4;
      padding: 16px;
      position: absolute;
      top: 16px;
      left: 0;
      display: flex;
      flex-direction: column;
      animation: ${slideIn} 1s ease-out;
      `
  const Vertical = styled.h2
      `margin: 8px 0;
      writing-mode: vertical-rl;
      text-orientation: mixed;
      transform: rotate(180deg);
      margin-block-start: 0;
      margin-block-end: 0;
      cursor: pointer;
      & :hover {
        color: var(--icon-hover-color1);
        }
      `
       
  const Headline = styled.h1<SectionProps>
     `position: absolute;
      left: ${props => props.isMobile==="mobile" ? "10%" : "-48px"};  
      font-size: ${props => props.isMobile==="mobile" ? "88px" : "128px"};
      bottom: ${props => props.isMobile==="mobile" ? "72px" : "24px"}; 
      text-shadow: var(--text-shadow-primary);
      z-index: 3;
      animation: ${slideIn} 1.5s ease-out;
      `
      const CircleWrapper = styled.div
     `overflow:hidden;
      position:absolute;
      inset: 0;
      `
      const Circle1 = styled.div<SectionProps>
     `height: 0;
      padding-top: ${props => props.isMobile==="mobile" ? "calc(280% - 12px)" : "calc(166% - 12px)"};
      border: 2px solid #ffffff1a;
      border-radius: 50%;
      width: ${props => props.isMobile==="mobile" ? "calc(280% - 6px)" : "calc(166% - 6px)"};
      right: -76px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      animation: ${circleFadeIn} 1s ease-out;
      `
   
      const Circle2 = styled.div<SectionProps>
     `height: 0;
      padding-top: ${props => props.isMobile==="mobile" ? "calc(280% - 12px)" : "calc(166% - 12px)"};
      border: 2px solid #fff3;
      border-radius: 50%;
      width: ${props => props.isMobile==="mobile" ? "calc(280% - 6px)" : "calc(166% - 6px)"};
      left: calc(-166% + 82px);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      animation: ${circleFadeIn} 1s ease-out;
      `

      const Circle3 = styled.div<SectionProps>
     `height: 0;
      padding-top: ${props => props.isMobile==="mobile" ? "calc(280% - 12px)" : "calc(200% - 12px)"};
      border: 3px solid #ffffff1a;
      border-radius: 50%;
      width: ${props => props.isMobile==="mobile" ? "calc(280% - 6px)" : "calc(200% - 6px)"};
      left: calc(-166% + 82px);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      animation: ${circleFadeIn} 1s ease-out;
      `

      const Circle4 = styled.div<SectionProps>
     `height: 0;
      padding-top: ${props => props.isMobile==="mobile" ? "calc(280% - 12px)" : "calc(233% - 12px)"};
      border: 4px solid #ffffff0d;
      border-radius: 50%;
      width: ${props => props.isMobile==="mobile" ? "calc(280% - 6px)" : "calc(233% - 6px)"};
      left: calc(-166% + 82px);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      animation: ${circleFadeIn} 1s ease-out;
      `

const Section1 = ({ isMobile, index }:SectionProps) => (
  <Section left className={index===1? `${isMobile} right` : `${isMobile} left`}>
  {isMobile==="desktop" &&
  <Navigation>
    <ExternalLink className="TMDBlogo" href="https://www.themoviedb.org/" title="The Movie Database"><TMDBlogoVertical width="13"/></ExternalLink>
    <Vertical>About</Vertical>
    <Vertical>Credits</Vertical>
  </Navigation>
  }
  {isMobile==="mobile" &&
  <>
  <ExternalLink className="TMDBlogo" href="https://www.themoviedb.org/" title="The Movie Database"><TMDBlogo height="13"/></ExternalLink>
  <Navigation>
    <Vertical>About</Vertical>
    <Vertical>Credits</Vertical>
  </Navigation>
  </>
  }
  <ExternalLink className="EjaasLogo" isMobile={isMobile} href="https://larsejaas.com/" title="Made by Lars Ejaas"><EjaasLogo width="64"/></ExternalLink>
  <StaticImage
  className="BruceW"
  isMobile={isMobile}
  src="../images/Bruce_Willis.png"
  alt="portrait of Bruce Willis"
  loading="eager"
  placeholder="none"
  layout="constrained"
  />
  <Headline isMobile={isMobile}>BRUCE<br/>WILLIS</Headline>
  <CircleWrapper>
     <Circle1 isMobile={isMobile}></Circle1>
  </CircleWrapper>
  </Section> 
   )

const Section2 = ({ isMobile, index }:SectionProps) => (
  <Section isMobile={isMobile} className={index===2? `${isMobile} left` : `${isMobile} right`}>
    <StaticImage 
      className="grunge"
      isMobile={isMobile}
      src="../images/grunge-texture.png"
      alt="portrait of Bruce Willis"
      loading="eager"
      placeholder="none"
      layout="constrained"
      />
     <CircleWrapper>
        <Circle2></Circle2>
        <Circle3></Circle3>
        <Circle4></Circle4>
     </CircleWrapper>
     <MovieCovers/>
  </Section> 
  )

  interface MainProps {
    togglePage: Function;
    onClick(event: React.MouseEvent<HTMLButtonElement>): void;
    index: 1 | 2 ;
    className: string;
    id: "1" | "2";
    isMobile: "mobile" | "desktop" | undefined;
  }

export const Main = ({ isMobile }:MainProps) => {
  const [index, setIndex] = useState(1);
  const togglePage = (e) => {
   setIndex(parseFloat(e.currentTarget.id));
  }

  return(
    <>
    {isMobile==="mobile" &&
    <>
    <MobileNavigation index={index} togglePage={togglePage}/>
    <Section1 className={`${index} one`} index={index} isMobile={isMobile}/>
    <Section2 className={`${index} two`} index={index} isMobile={isMobile}/>
    </> 
    }
    {isMobile==="desktop" &&
    <>
    <Section1 isMobile={isMobile}/>
    <Section2 isMobile={isMobile}/>
    </> 
    }
    </>
  )
  }