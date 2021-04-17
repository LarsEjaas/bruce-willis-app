import * as React from "react"
import { ReactNode, createContext, useContext, useState } from "react"
import "@fontsource/passion-one/700.css"
import "@fontsource/passion-one/400.css"
import "@fontsource/open-sans/400.css"
import { createGlobalStyle } from "styled-components"
import { DeviceDetectHook } from "../components/deviceDetect"
import ModalContainer from "./modal"
import ExternModalContainer from "./externModal"
import { useI18next } from "gatsby-plugin-react-i18next"

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  }

/*remove focus when not using keyboard*/
*:focus:not(:focus-visible) {
  outline: none;
  }

:root {
  --background-color: #918373;
  --image-cover-color: #0807056b;
  --icon-color1: #665a57;
  --icon-hover-color1: #928481;
  --icon-hover-color2: #b2aaa9;
  --movie-header1-color: #f5f5f5;
  --movie-paragraph-color: #d3cfcf;
  --primary-font: #C0AA87;
  --border-main: #36302e;
  --primary-font-focused: #dcb577;
  --modal-container-back: #473F3Dcc;
  --background-body:  linear-gradient(0deg,#918373,#918373), 
                      linear-gradient(352.24deg,rgba(255,255,255,0.2) 6.18%, rgba(0,0,0,0) 94.71%), 
                      linear-gradient(86.84deg,rgba(255,255,255,0.25) 42.32%,rgba(255,255,255,0.0025) 84.88%), 
                      radial-gradient(67.75% 67.75% at 47.57% 44.42%,rgba(32,21,21,0.2) 0%,rgba(32,21,21,1) 230%);
  --background1:      #080705;
  --background2:      linear-gradient(180deg, #48403E 0%, #2D2725 100%);
  --box-shadow-primary: 0 6.2px 3.6px rgb(17 15 13 / 12%), 
                        0 17.4px 10px rgb(17 15 13 / 18%), 
                        0 36.6px 24.1px rgb(17 15 13 / 23%), 
                        0 102px 80px rgb(17 15 13 / 35%);

  --box-shadow-raised:  0 6.2px 3.6px rgba(17 15 13 / 0.143),
                        0 17.4px 10px rgba(17 15 13 / 0.205),
                        0 36.6px 24.1px rgba(17 15 13 / 0.267),
                        0 100px 80px rgba(17 15 13 / 0.41);

  --text-shadow-primary: 0px 54px 55px rgba(0, 0, 0, 0.25), 
                        0px 4px 6px rgba(0, 0, 0, 0.12), 
                        0px 12px 13px rgba(0, 0, 0, 0.17), 
                        0px -3px 5px rgba(0, 0, 0, 0.09);
  --icon-shadow: 0px 4px 6px rgb(0 0 0 / 12%), 
                 0px 12px 13px rgb(0 0 0 / 17%), 
                 0px -3px 5px rgb(0 0 0 / 9%);

/*Auto adjust height on chrome Android*/
height: 100%; 
scroll-behavior: smooth;
}
  /* Hide scrollbar for Chrome, Safari and Opera */
/* .example::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
/* .example { */
  /* -ms-overflow-style: none;  IE and Edge */
  /* scrollbar-width: none;   Firefox 
  }
}  */

body {
  margin:0;
  background-color: var(--background-color);
  background: var(--background-body);
  background-blend-mode: multiply;
  min-height: 100%;
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
  font-size: clamp(1rem, -0.875rem + 8.333vw, 3.5rem);
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

p {
  font-family: 'Open Sans', sans-serif;
  color: var(--icon-hover-color1);
}

main {
  box-shadow: var(--box-shadow-primary);
  border: 1px solid var(--border-main);
  width: 100vw;
  height: 100%;
  position: fixed;
  display: inline-grid;
  transition: all 0.4s;
  }
  main.desktop{
    border-radius: 40px;
    max-height: 720px;
    max-width: 1080px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    grid-template-columns: 50% 50%;
    grid-template-rows: 100%;
    will-change: filter;
    transition: all 0.4s;
    animation: fadeIn 0.4s ease-out;
    animation-fill-mode: both;
  }
  main.mobile{
    width: 200vw;
    grid-template-columns: 100vw 100vw;
    left: 0;
    top: 0;
    will-change: filter;
    animation: fadeIn 0.4s ease-out;
    animation-fill-mode: both;
  }

a {
  height: fit-content;
  width: fit-content;
  }

  @keyframes fadeIn{
    0% {
    opacity:0;
    }
    100% {
    opacity:1;
    }
  }

  @keyframes fadeOut{
    0% {  
    opacity:1;
    }
    100% {
    opacity:0;
    }
  }

.modal-container {
    position: fixed;
    width: 100vw;
    height: 100%;
    top: 0;
    left: 0;
    z-index:5000;
    animation: fadeIn ease-out 0.4s;
    will-change: opacity;
    overflow-x: hidden;
    overflow-y: scroll;
    }

.extern.modal-container {
    z-index:6000;
    }

.modal-content {
  top: 4px;
  transform: translate(-50%,0);
}

  @media (min-height: 720px) {
.modal-content.desktop.about, .modal-content.desktop.movie {
  top: calc((100vh - 720px) / 2 );
  }
}

body.move section.mobile.right {
    animation: slideRight 1s ease-in-out;
    animation-fill-mode: both;
    }

body.move section.mobile.left {
    animation: slideLeft 1s ease-in-out;
    animation-fill-mode: both;
    }

@keyframes slideLeft {
    0% {
    transform: translateX(0);
    }
    100% {
    opacity: 1;
    transform: translateX(-100vw);
    }
  }

@keyframes slideRight { 
    0% {
    transform: translateX(-100vw);
    }
    100% {
    opacity: 1;
    transform: translateX(0);
    }
  }

.blur {
  filter: blur(30px);
  transition: all 0.4s;
}

.fadeOut {
    animation: fadeOut ease-in 0.4s;
    animation-fill-mode: both
  }

`

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { ModalVisibleInitial, externModalVisibleInitial } = useContext(
    GlobalContext
  )
  const { language } = useI18next()
  const isMobile = DeviceDetectHook()
  const [modalVisible, setModalVisible] = useState(ModalVisibleInitial)
  const [externModalVisible, setExternModalVisible] = useState(
    externModalVisibleInitial
  )
  const [modalType, setModalType] = useState(undefined)
  const [clickedElement, setClickedElement] = useState(undefined)
  const [clickedExternLink, setclickedExternLink] = useState(undefined)
  const modalToggle = (
    domNode: HTMLElement | undefined,
    typeOfModal:
      | "share"
      | "movie"
      | "externLink"
      | "offline"
      | "credits"
      | "about"
      | undefined
  ) => {
    setClickedElement(domNode),
      setModalVisible(!modalVisible),
      setModalType(typeOfModal)
  }
  const externModalToggle = (domNode: HTMLElement | undefined) => {
    console.log("externModalToggle running", domNode, externModalVisible),
      setclickedExternLink(domNode),
      setExternModalVisible(!externModalVisible)
  }
  console.log(modalVisible)

  return (
    <>
      <GlobalContext.Provider
        value={{
          isMobile,
          ModalVisibleInitial,
          externModalVisibleInitial,
          modalVisible,
          modalToggle,
          externModalVisible,
          externModalToggle,
          modalType,
          clickedElement,
          clickedExternLink,
        }}
      >
        <GlobalStyle />
        {isMobile === "mobile" && <main className={isMobile}>{children}</main>}
        {isMobile === "desktop" && <main className={isMobile}>{children}</main>}
        <ModalContainer language={language} />
        <ExternModalContainer />
      </GlobalContext.Provider>
    </>
  )
}

export default Layout

type GlobalContextProps = {
  isMobile?: any
  setIsMobile: () => void
  ModalVisibleInitial: boolean
  modalVisible: boolean
  modalType:
    | "share"
    | "movie"
    | "externLink"
    | "offline"
    | "credits"
    | "about"
    | undefined
  modalToggle: (
    DOMnode: HTMLElement,
    modalType:
      | "share"
      | "movie"
      | "externLink"
      | "offline"
      | "credits"
      | "about"
      | undefined
  ) => void
  externModalVisible: boolean
  externModalVisibleInitial: boolean
  externModalToggle: (DOMnode: HTMLElement) => void
  changeModalType: () =>
    | "share"
    | "movie"
    | "externLink"
    | "offline"
    | "credits"
    | "about"
    | undefined
  clickedElement: HTMLElement | undefined
  clickedExternLink: HTMLElement | undefined
  storeClickedElement: () => void
}

const ModalVisibleInitial = false
const externModalVisibleInitial = false
const modalType = undefined
const isMobile = "mobile"
console.log(isMobile)
const clickedElement = undefined
const clickedExternLink = undefined

export const GlobalContext = createContext<Partial<GlobalContextProps>>({
  isMobile,
  setIsMobile: () => {},
  ModalVisibleInitial,
  externModalVisibleInitial,
  modalVisible: ModalVisibleInitial,
  modalToggle: () => {},
  externModalVisible: externModalVisibleInitial,
  externModalToggle: () => {},
  modalType,
  clickedElement,
  clickedExternLink,
})
