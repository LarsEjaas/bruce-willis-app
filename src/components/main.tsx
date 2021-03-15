import * as React from "react"
import styled from 'styled-components'
import { StaticImage } from "gatsby-plugin-image"
import EjaasLogo from "../svg/ejaas_logo.inline.svg"
import TMDBlogoVertical from "../svg/tmdb_logo_upright.inline.svg"
import TMDBlogo from "../svg/tmdb_logo.inline.svg"
import ExternalLink from './externalLink'

interface SectionProps {
    left?: boolean;
    right?: boolean;
    isMobile: "mobile" | "desktop" | undefined;
  }

  interface MainProps {
    left?: boolean;
    isMobile: "mobile" | "desktop" | undefined;
  }

const Section = styled.section<SectionProps>
  `padding: 2px 5px;
    position: relative;
    background: ${props => props.left ? "var(--background1)" : "var(--background2)"};
    border-radius: ${props => props.left ? "40px 0 0 40px" : "0 40px 40px 0"};
    height: ${props => props.isMobile==="mobile" ? "100vh" : "unset"};
    &&.mobile{
      border-radius: 0;  
      }
    & nav {
      padding: 16px;
      position: absolute;
      top: 16px;
      left: 0;
      display: flex;
      flex-direction: column;
      }
    & .vertical {
      margin: 8px 0;
      } 
    & .EjaasLogo {
      position: absolute;
      z-index: 1;
      bottom: ${props => props.isMobile==="mobile" ? "unset" : "24px"};
      height: ${props => props.isMobile==="mobile" ? "43px" : "48px"};
      right: ${props => props.isMobile==="mobile" ? "48px" : "24px"};
      top: ${props => props.isMobile==="mobile" ? "24px" : "unset"};
      }
    & SVG path {
      fill: var(--icon-color1);
      }
    & .BruceW {
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
      }
    & h1 {
      position: absolute;
      left: ${props => props.isMobile==="mobile" ? "10%" : "-48px"};  
      font-size: ${props => props.isMobile==="mobile" ? "88px" : "128px"};
      bottom: ${props => props.isMobile==="mobile" ? "72px" : "24px"}; 
      text-shadow: var(--text-shadow-primary)
      }
    & .circleWrapper, .grunge {
      overflow:hidden;
      position:absolute;
      inset: 0;
      }
    & .grunge {
      border-radius: 0 40px 40px 0;
      }
    & .circle1 {
      height: 122%;
      border: 3px solid #ffffff1a;
      border-radius: 50%;
      width: calc(122vh - 6px);
      right: -76px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
   `

const Section1 = ({ isMobile }:SectionProps) => (
  <Section left isMobile={isMobile}>
  {isMobile==="desktop" &&
  <nav style={{zIndex:1}}>
    <ExternalLink className="TMDBlogo" href="https://www.themoviedb.org/" title="The Movie Database"><TMDBlogoVertical width="13"/></ExternalLink>
    <h2 className="vertical">About</h2>
    <h2 className="vertical">Credits</h2>
  </nav>
  }
  {isMobile==="mobile" &&
  <>
  <ExternalLink className="TMDBlogo" href="https://www.themoviedb.org/" title="The Movie Database"><TMDBlogo height="13"/></ExternalLink>
  <nav style={{zIndex:1}}>
    <h2 className="vertical">About</h2>
    <h2 className="vertical">Credits</h2>
  </nav>
  </>
  }
  <ExternalLink className="EjaasLogo" isMobile={isMobile} href="https://larsejaas.com/" title="Made by Lars Ejaas"><EjaasLogo width="64" isMobile={isMobile}/></ExternalLink>
  <StaticImage
  className="BruceW"
  isMobile={isMobile}
  src="../images/Bruce_Willis.png"
  alt="portrait of Bruce Willis"
  loading="eager"
  placeholder="none"
  layout="constrained"
  />
  <h1 isMobile={isMobile}>BRUCE<br/>WILLIS</h1>
  <div className="circleWrapper">
     <div className="circle1" isMobile={isMobile}></div>
  </div>
  </Section> 
   )

const Section2 = ({ isMobile }:SectionProps) => (
  <Section isMobile={isMobile}>
    <StaticImage 
      className="grunge"
      isMobile={isMobile}
      src="../images/grunge-texture.png"
      alt="portrait of Bruce Willis"
      loading="eager"
      placeholder="none"
      layout="constrained"
      />
     <div className="circleWrapper">
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
     </div>
  </Section> 
  )

export const Main = ({ isMobile  }:MainProps) => (
   <>
    <Section1 isMobile={isMobile}/>
    <Section2 isMobile={isMobile}/>
   </> 
  )


export const MainMobile = ({ isMobile }:MainProps) => (
  <>
 <Section1 isMobile={isMobile}/>
  </> 
 )


