import * as React from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import Image from '../components/image'
import { StaticImage } from "gatsby-plugin-image"
import EjaasLogo from "../assets/ejaas_logo.inline.svg"
import TMDBlogo from "../assets/tmdb_logo_upright.inline.svg"
import ExternalLink from './externalLink'

interface SectionProps {
    left?: string;
  }

const Section = styled.section<SectionProps>
  `padding: 2px 5px;
    position: relative;
    background: ${props => props.left? "var(--background1)" : "var(--background2)"};
    border-radius: ${props => props.left ? "40px 0 0 40px" : "0 40px 40px 0"};
    & nav {
      padding: 16px;
      position: absolute;
      top: 16px;
      left: 0;
      display: flex;
      flex-direction: column;
      }
    & .EjaasLogo {
      position: absolute;
      right: 16px;
      top: 16px;
      z-index: 1;
      }
    & SVG path {
      fill: var(--icon-color1);
      }
   `

const Section1 = ({ }:SectionProps) => (
  <Section left>
  <nav style={{zIndex:1}}>
    <ExternalLink className="TMDBlogo" href="https://www.themoviedb.org/" title="The Movie Database"><TMDBlogo width="13"/></ExternalLink>
    <p>About</p>
    <p>Credits</p>
  </nav>
  <ExternalLink className="EjaasLogo" href="https://larsejaas.com/" title="Made by Lars Ejaas"><EjaasLogo width="64"/></ExternalLink>
  <Image fileName="Bruce_Willis" alt="portrait of Bruce Willis" loading="eager" />
  {/* <StaticImage 
  src="../images/Bruce_Willis.png" 
  alt="portrait of Bruce Willis"
  placeholder="blurred"
  layout="fixed"
  width={549}
  height={774}
  style={{position:"absolute", left: "0", bottom: "3%"}}
  /> */}
</Section> 
)

const Section2 = () => (
    <Section>

  </Section> 
  )

export const Main = () => (
   <>
    <Section1/>
    <div></div>
    <Section2/>
   </> 
)

export const MainMobile = () => (
  <>
 <Section1/>
  </> 
)

// export const pageQuery = graphql`
// query {
//   allFile(filter: {extension: {eq: "png"}, name: {eq: "Bruce_Willis"}}) {
//     nodes {
//       childImageSharp {
//         gatsbyImageData(width: 550)
//       }
//     }
//   }
// }`
