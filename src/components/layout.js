/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import styled, { createGlobalStyle } from 'styled-components'
import { useStaticQuery, graphql } from "gatsby"
import useDeviceDetect from '../components/deviceDetect'

import Header from "./main"
//import "./layout.css"

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  }

:root {
  --background-color: #918373;
  --background-body: linear-gradient(0deg, #918373, #918373), 
                      linear-gradient(352.24deg, rgba(255, 255, 255, 0.2) 6.18%, 
                      rgba(0, 0, 0, 0) 94.71%), 
                      linear-gradient(86.84deg, rgba(255, 255, 255, 0.25) 42.32%, rgba(255, 255, 255, 0.0025) 84.88%), 
                      radial-gradient(67.75% 67.75% at 47.57% 44.42%, rgba(255, 255, 255, 0.5) 0%, rgba(32, 21, 21, 0.6) 100%);
  --background1:      #080705;
  --background2:      linear-gradient(180deg, #48403E 0%, #2D2725 100%);
  --box-shadow-primary: 0px 54px 55px 15px rgba(0, 0, 0, 0.25), 
                        0px 4px 6px rgba(0, 0, 0, 0.12), 
                        0px 12px 13px rgba(0, 0, 0, 0.17), 
                        0px -3px 5px rgba(0, 0, 0, 0.09);
  }

body {
  margin:0;
  background-color: var(--background-color);
  background: var(--background-body);
  background-blend-mode: multiply;
  min-height: 100vh;
}

.tl-wrapper {
  padding:
    env(safe-area-inset-top, 0)
    env(safe-area-inset-right, 0)
    env(safe-area-inset-bottom, 0)
    env(safe-area-inset-left, 0);
    }

img, h1, h2, h3, h4, p, a, button, ul, li, figure, div {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  }

main {
  box-shadow: var(--box-shadow-primary);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  } &&.desktop{
    border-radius: 40px;
    max-height: 720px;
    max-width: 1080px;
    display: inline-grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
  } &&.mobile{
    border-radius: 0;
  }

`

const Layout = ({ children }) => {
  const { isMobile } = useDeviceDetect();
  console.log(isMobile);
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
        {isMobile==='mobile' &&
        <main className={isMobile} mobile={isMobile}>{children}</main>
        }
        {isMobile==='desktop' &&
        <main className={isMobile} mobile={isMobile}>{children}</main>
        }
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
