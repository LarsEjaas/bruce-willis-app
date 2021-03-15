import * as React from "react"
import { ReactNode } from "react"
import "@fontsource/passion-one/700.css"
import { createGlobalStyle } from 'styled-components'
import { DeviceDetectHook } from '../components/deviceDetect'
//import {} from 'styled-components/cssprop'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  }

:root {
  --background-color: #918373;
  --icon-color1: #473F3D;
  --primary-font: #C0AA87;
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
  --text-shadow-primary: 0px 54px 55px rgba(0, 0, 0, 0.25), 
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

H1 { 
  font-family: 'Passion One', cursive;
  font-weight: 700;
  font-size: 128px;
  line-height: 0.7;
  margin: 0;
  color: var(--primary-font);
  margin-block-start: 0;
  margin-block-end: 0;
  }

H2 { 
  font-family: 'Passion One', cursive;
  font-weight: 700;
  font-size: 32px;
  line-height: 0.5;
  margin: 0;
  color: var(--icon-color1);
  margin-block-start: 0.83em;
  margin-block-end: 0.3em;
  }

.vertical {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  margin-block-start: 0;
  margin-block-end: 0;
  }

main {
  box-shadow: var(--box-shadow-primary);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }
  main.desktop{
    border-radius: 40px;
    max-height: 720px;
    max-width: 1080px;
    display: inline-grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
  }
  main.mobile{
    border-radius: 0;
  }

a {
  height: fit-content;
  width: fit-content;
  }
`

type LayoutProps = {
 children: ReactNode;
}

const Layout = ({ children }:LayoutProps) => {
  const isMobile = DeviceDetectHook();
  console.log(isMobile);

  return (
    <>
      <GlobalStyle />
        {isMobile==='mobile' &&
        <main className={isMobile}>{children}</main>
        }
        {isMobile==='desktop' &&
        <main className={isMobile}>{children}</main>
        }
    </>
  )
}

export default Layout
