import * as React from "react"
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  lazy,
  Suspense,
  useEffect,
} from "react"
import "@fontsource/passion-one/700.css"
import "@fontsource/passion-one/400.css"
import "@fontsource/open-sans/400.css"
import { createGlobalStyle } from "styled-components"
import { DeviceDetectHook } from "./Hooks/deviceDetect"
// import ModalContainer from "./modal"
// import ExternModalContainer from "./externModal"
import { useI18next } from "gatsby-plugin-react-i18next"
import PushToFullScreen from "./Hooks/pushToFullScreen"

const ModalContainer = lazy(() => import("./Modal/modal"))
const ExternModalContainer = lazy(() => import("./ExternModal/externModal"))

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

  /* Hide scrollbar for Chrome, Safari and Opera */
::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
/* .example { */
  -ms-overflow-style: none;  /*IE and Edge */
  scrollbar-width: none;   /*Firefox*/ 
  
/*}  */
}

body {
  margin:0;
  min-height: 100%;
}

@media (min-width: 600px) {
  body {
    background-color: var(--background-color);
    background: var(--background-body);
    background-blend-mode: multiply;
  }
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
  color: var(--primary-font-focused);
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
    animation: fadeIn 0.3s ease-out;
    animation-fill-mode: both;
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

body.move section.mobile.right {
    animation: slideRight 0.6s ease-in-out;
    animation-fill-mode: both;
    }

body.move section.mobile.left {
    animation: slideLeft 0.6s ease-in-out;
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

`

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const isSSR = typeof window === "undefined"
  const { ModalVisibleInitial, externModalVisibleInitial } = useContext(
    GlobalContext
  )
  const { language } = useI18next()
  const isMobile = DeviceDetectHook()
  const [modalVisible, setModalVisible] = useState<boolean>(ModalVisibleInitial)
  const [externModalVisible, setExternModalVisible] = useState<boolean>(
    externModalVisibleInitial
  )
  const [modalType, setModalType] = useState<
    "share" | "movie" | "offline" | "credits" | "about" | "error" | undefined
  >(undefined)
  const [clickedElement, setClickedElement] = useState<HTMLElement | undefined>(
    undefined
  )

  useEffect(() => {
    PushToFullScreen(isMobile)
  }, [isMobile])
  const [clickedExternLink, setclickedExternLink] = useState<
    HTMLAnchorElement | undefined
  >(undefined)
  const modalToggle = (
    domNode: HTMLElement,
    typeOfModal: "share" | "movie" | "offline" | "credits" | "about" | "error"
  ) => {
    console.log("modal toggled"),
      setClickedElement(domNode),
      setModalVisible(!modalVisible),
      setModalType(typeOfModal)
  }
  const externModalToggle = (domNode?: HTMLAnchorElement | undefined) => {
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
        {!isSSR && (
          <Suspense fallback={<div />}>
            <ModalContainer language={language} />
            <ExternModalContainer />
          </Suspense>
        )}
      </GlobalContext.Provider>
    </>
  )
}

export default Layout

type GlobalContextProps = {
  isMobile?: "mobile" | "desktop" | undefined
  setIsMobile: () => void
  ModalVisibleInitial: boolean
  modalVisible: boolean
  modalType: "share" | "movie" | "offline" | "credits" | "about" | "error"
  modalToggle: (
    DOMnode?: HTMLElement,
    modalType?: "share" | "movie" | "offline" | "credits" | "about" | "error"
  ) => void
  externModalVisible: boolean
  externModalVisibleInitial: boolean
  externModalToggle: (DOMnode?: HTMLAnchorElement) => void
  changeModalType: () =>
    | "share"
    | "movie"
    | "offline"
    | "credits"
    | "about"
    | "error"
  clickedElement: HTMLElement | undefined
  clickedExternLink: HTMLAnchorElement | undefined
  storeClickedElement: () => void
}

const ModalVisibleInitial: boolean = false
const externModalVisibleInitial: boolean = false
const modalType:
  | "share"
  | "movie"
  | "offline"
  | "credits"
  | "about"
  | "error"
  | undefined = undefined
const isMobile: "mobile" | "desktop" | undefined = "mobile"
const clickedElement: HTMLElement | undefined = undefined
const clickedExternLink: HTMLAnchorElement | undefined = undefined

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
