import * as React from "react"
import { ReactNode, createContext, useContext, useState } from "react"
import "@fontsource/passion-one/700.css"
import "@fontsource/open-sans/400.css"
import { createGlobalStyle } from "styled-components"
import { DeviceDetectHook } from "../components/deviceDetect"
import ModalContainer from "./modal"

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
  /* Hide scrollbar for Chrome, Safari and Opera */
.example::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  }
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
  /* font-size: 128px; */
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

main {
  box-shadow: var(--box-shadow-primary);
  border: 1px solid var(--border-main);
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: inline-grid;
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
  }
  main.mobile{
    width: 200vw;
    grid-template-columns: 100vw 100vw;
    left: 0;
    top: 0;
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
    height: 100vh;
    top: 0;
    left: 0;
    z-index:5000;
    animation: fadeIn ease-out 0.4s;
    background-color: var(--modal-container-back);
    }

.modal-content.mobile {
    width: 100vw;
    min-width: 300px;
    min-height: calc(100vh - 16px); //to be changed to fit-content
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 40px;
    padding:24px;
    animation: fadeIn ease-out 0.4s; 
    transform-origin: center center;
    background-color: var(--background1);
    border: 1px solid var(--border-main);
    }

.modal-content.desktop {
    border-radius: 40px;
    max-width: 1080px;
    width: calc(100vw - 16px);
    min-height: 400px; //to be changed to fit-content
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 40px;
    padding:24px;
    animation: fadeIn ease-out 0.4s; 
    transform-origin: center center;
    background-color: var(--background1);
    border: 1px solid var(--border-main);
    }

.blur {
  filter: blur(10px);
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
  const { ModalVisibleInitial } = useContext(GlobalContext)
  const isMobile = DeviceDetectHook()
  const [modalVisible, setModalVisible] = useState(ModalVisibleInitial)
  const [modalType, setModalType] = useState(undefined)
  const [clickedElement, setClickedElement] = useState(undefined)
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
  console.log(modalVisible)

  return (
    <>
      <GlobalContext.Provider
        value={{
          isMobile,
          ModalVisibleInitial,
          modalVisible,
          modalToggle,
          modalType,
          //changeModalType,
          clickedElement,
          //storeClickedElement,
        }}
      >
        <GlobalStyle />
        {isMobile === "mobile" && <main className={isMobile}>{children}</main>}
        {isMobile === "desktop" && <main className={isMobile}>{children}</main>}
        <ModalContainer />
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
  changeModalType: () =>
    | "share"
    | "movie"
    | "externLink"
    | "offline"
    | "credits"
    | "about"
    | undefined
  clickedElement: HTMLElement | undefined
  storeClickedElement: () => void
}

const ModalVisibleInitial = false
const modalType = undefined
const isMobile = "mobile"
console.log(isMobile)
const clickedElement = undefined

export const GlobalContext = createContext<Partial<GlobalContextProps>>({
  isMobile,
  setIsMobile: () => {},
  ModalVisibleInitial,
  modalVisible: ModalVisibleInitial,
  modalToggle: () => {},
  modalType,
  //changeModalType:() => {},
  clickedElement,
  //storeClickedElement:() => {},
})
