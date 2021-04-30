import * as React from "react"
import {
  useState,
  useEffect,
  createContext,
  useContext,
  createRef,
  lazy,
  Suspense,
  MouseEvent,
} from "react"
import styled, { keyframes } from "styled-components"
import ReactDOM from "react-dom"
import Cross from "../../svg/cross.inline.svg"
import { GlobalContext } from "../layout"
import AboutView from "./about"
import CreditsView from "./credits.tsx"
import ShareButtons from "./share"
//import MovieDetails from "./movieDetails"
import Backdrop from "./backdrop"
import { SkeletonTheme } from "react-loading-skeleton"
import { NavigateButton, Paragraph } from "../ExternModal/externalLink"
import { useTranslation } from "gatsby-plugin-react-i18next"

const MovieDetailsWrapper = lazy(() => import("./movieDetailsWrapper"))

interface CrossbuttonProps {
  modalType: "about" | "share" | "offline" | "credits" | "movie" | "error"
}

const Crossbutton = styled.button<CrossbuttonProps>`
  position: absolute;
  right: 24px;
  top: 24px;
  filter: drop-shadow(3px 3px 2px var(--background1));
  background-color: unset;
  border: unset;
  cursor: pointer;
  transition: all 0.2s ease-in;
  padding: 0;
  z-index: 3;
  &:hover {
    transition: 0.3s ease-out;
    transform: scale(1.2);
  }
  & path {
    fill: var(--movie-paragraph-color);
  }
  &:hover path {
    fill: var(--movie-header1-color);
  }
`

const Headline2 = styled.h2`
  font-family: "Passion One", cursive;
  font-weight: 700;
  font-size: clamp(1.6rem, 0.8rem + 4vw, 3.5rem);
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0.4em;
  line-height: 0.8;
  color: var(--movie-header1-color);
  text-shadow: 4px 4px 8px var(--background1);
  text-align: center;
  width: 80%;
`

const Headline3 = styled.h3`
  font-family: "Passion One", cursive;
  font-size: 22px;
  font-weight: 400;
  color: var(--movie-header1-color);
  text-shadow: 4px 4px 8px var(--background1);
  text-align: center;
`

interface ModalContainerProps {
  language: string
}

const ModalContainer = ({ language }: ModalContainerProps) => {
  const isSSR = typeof window === "undefined"
  const { t } = useTranslation()
  const {
    modalToggle,
    modalVisible,
    modalType,
    isMobile,
    clickedElement,
    clickedExternLink,
  } = useContext(GlobalContext)
  const [isModalVisible, setIsModalVisible] = useState(modalVisible)

  useEffect(() => {
    if (isMobile === undefined) return

    setIsModalVisible(modalVisible)
  }, [modalVisible])

  useEffect(() => {
    if (isMobile === undefined) return
    !!document.querySelector(".modal-body")
      ? setTimeout(function () {
          if (!!document.querySelector(".cross-btn")) {
            let element: HTMLElement = document.querySelector(
              ".modal-header > .cross-btn"
            )
            element?.focus()
          } else {
            let element: HTMLElement = document.querySelector(
              ".modal-body.error button"
            )
            element?.focus()
          }
        }, 400)
      : null
  }, [isModalVisible])

  const closeModal = (e: MouseEvent | KeyboardEvent) => {
    console.log(
      "closemodal running (not externModal",
      document.querySelector(".extern.modal-container"),
      e.target,
      e.currentTarget,
      document.querySelector(".extern.modal-container"),
      clickedElement,
      clickedExternLink
    )
    //avoid layered modals closing in cascade and make the error modal impossible to close when clicking outside
    console.log(
      e.target,
      e.currentTarget,
      e.currentTarget !== document.querySelector(".modal-container") ||
        e.target !== document.querySelector(".modal-container")
    )
    if (
      (e.currentTarget !== document.querySelector(".modal-container") ||
        e.target !== document.querySelector(".modal-container")) &&
      e.currentTarget !== document.querySelector(".cross-btn")
    )
      return

    document.querySelector(".modal-container").classList.add("fadeOut")
    document.querySelector(".modal-content").classList.add("fadeOut")
    setTimeout(function () {
      setIsModalVisible(false)
      modalToggle()
      clickedElement ? clickedElement.focus() : undefined
    }, 300)
  }

  return (
    <>
      {isModalVisible && (
        <Modal
          modalType={modalType}
          onModalClose={(e: MouseEvent | KeyboardEvent) => closeModal(e)}
        >
          <>
            <Modal.Header modalType={modalType} />
            {modalType === "movie" && (
              <Modal.Body
                type={modalType}
                movieId={Number(clickedElement.id)}
                movieContent={
                  <>
                    {!isSSR && (
                      <Suspense fallback={<div />}>
                        <MovieDetailsWrapper
                          isMobile={isMobile}
                          movieId={Number(
                            clickedElement.getAttribute("data-id")
                          )}
                        />
                      </Suspense>
                    )}
                  </>
                }
              />
            )}
            {modalType === "credits" && (
              <Modal.Body
                type={modalType}
                credits={
                  <>
                    <CreditsView isMobile={isMobile} language={language} />
                  </>
                }
              />
            )}
            {modalType === "about" && (
              <Modal.Body
                type={modalType}
                about={
                  <>
                    <AboutView isMobile={isMobile} language={language} />
                  </>
                }
              />
            )}
            {modalType === "share" && (
              <Modal.Body
                type={modalType}
                share={
                  <>
                    {!isSSR && (
                      <Suspense fallback={<div />}>
                        <Backdrop
                          isMobile={isMobile}
                          original_title={t("MODAL.SOCIAL_SHARE_ALT")}
                          backdrop_path="socialShare.jpg"
                          internUrl
                        />
                      </Suspense>
                    )}
                    <Headline2>{t("MODAL.SHARE_HEADER")}</Headline2>
                    <Headline3>{t("MODAL.SHARE_PARAGRAPH")}</Headline3>
                    <ShareButtons isMobile={isMobile} />
                  </>
                }
              />
            )}
            {modalType === "error" && (
              <Modal.Body
                type={modalType}
                error={
                  <>
                    {!isSSR && (
                      <Suspense fallback={<div />}>
                        <Backdrop
                          isMobile={isMobile}
                          original_title="404 error background"
                          backdrop_path="404.jpg"
                          internUrl
                        />
                      </Suspense>
                    )}
                    <Headline2>An Error Occured</Headline2>
                    <Paragraph centered>
                      Please reload the page to retry...
                    </Paragraph>
                    <NavigateButton onClick={() => location.reload()}>
                      {t("RELOAD")}
                    </NavigateButton>
                  </>
                }
              />
            )}
          </>
        </Modal>
      )}
    </>
  )
}

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const StyledModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5000;
  animation: fadeIn ease-out 0.3s;
  will-change: opacity;
  overflow-x: hidden;
  overflow-y: scroll;
  backdrop-filter: blur(30px);
  @supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
    background-color: var(--modal-container-back);
  }
  &.fadeOut {
    animation: ${fadeOut} ease-in 0.4s;
    animation-fill-mode: both;
  }
`

const ModalContentFrame = styled.div`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  padding: 0;
  animation: fadeIn ease-out 0.3s;
  background: var(--background2);
  border: 2px solid var(--icon-hover-color2);
  will-change: opacity;
  overflow: hidden;
  transition: all 0.4s;
  :not(.extern, .share) {
    top: 4px;
    transform: translate(-50%, 0);
  }
  &.mobile {
    width: calc(100vw - 8px);
    min-width: 300px;
  }
  &.desktop {
    max-width: 1080px;
  }
  &.desktop.movie,
  &.desktop.about,
  &.desktop.credits {
    width: calc(100% - 8px);
    margin-bottom: 200px;
    @media (min-height: 720px) {
      top: calc((100vh - 720px) / 2);
    }
  }
  &.error,
  &.share {
    //transform: translate(-50%, calc((100vh - 100%) / 2));
    width: fit-content;
  }
  & .gatsby-image-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.7;
    mask-image: linear-gradient(to top, transparent 12%, black 100%);
    -webkit-mask-image: linear-gradient(to top, transparent 12%, black 100%);
  }
  &.fadeOut {
    animation: ${fadeOut} ease-in 0.4s;
    animation-fill-mode: both;
  }
`

const ModalBodyContent = styled.div`
  padding: 24px;
  &.movie {
    min-height: 100vh;
  }
`

const modalContext = createContext(null)

interface ModalProps {
  readonly modalType:
    | "share"
    | "movie"
    | "offline"
    | "credits"
    | "about"
    | "error"
  children: JSX.Element
  onModalClose: (e: MouseEvent | KeyboardEvent) => void
}

function Modal({ children, onModalClose, modalType }: ModalProps) {
  const { isMobile, clickedElement } = useContext(GlobalContext)

  console.log(clickedElement)
  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (e.keyCode === 27) {
        onModalClose(e)
      }
    }

    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  }, [])

  const externModalRef = createRef<HTMLDivElement>()
  const modalContainerRef = createRef<HTMLDivElement>()
  const handleTabKey = (e: KeyboardEvent) => {
    let focusableModalElements: Array<HTMLElement> = []
    const allFocusableModalElements: NodeListOf<HTMLElement> = externModalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"],input[type="email"], input[type="checkbox"], select'
    )
    allFocusableModalElements.forEach((element: HTMLElement) => {
      if (window.getComputedStyle(element).display !== "none") {
        focusableModalElements.push(element)
      }
    })
    const firstElement = focusableModalElements[0]
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1]
    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus()
      return e.preventDefault()
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus()
      e.preventDefault()
    }
  }

  const keyListenersMap = new Map([
    [27, onModalClose],
    [9, handleTabKey],
  ])

  function keyListener(e: KeyboardEvent) {
    if (externModalRef.current === null) return
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode)

    // call the listener if it exists
    return listener && listener(e)
  }

  document.addEventListener("keydown", keyListener)

  return ReactDOM.createPortal(
    <StyledModalContainer
      className="modal-container"
      role="dialog"
      aria-modal="true"
      ref={modalContainerRef}
      onClick={onModalClose}
    >
      <ModalContentFrame
        className={`${isMobile} modal-content ${modalType}`}
        ref={externModalRef}
      >
        <SkeletonTheme
          color="var(--image-cover-color)"
          highlightColor="var(--icon-hover-color1)"
        ></SkeletonTheme>
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </ModalContentFrame>
    </StyledModalContainer>,
    document.body
  )
}

interface ModalHeaderProps {
  modalType: "share" | "movie" | "offline" | "credits" | "about" | "error"
}

Modal.Header = function ModalHeader({ modalType }: ModalHeaderProps) {
  const { onModalClose } = useContext(modalContext)
  console.log(modalType)
  return (
    <div className="modal-header">
      {modalType !== "error" && (
        <Crossbutton
          className="cross-btn"
          title="Close window"
          aria-label="Close window"
          onClick={onModalClose}
          modalType={modalType}
        >
          <Cross className="cross" width="22" />
        </Crossbutton>
      )}
    </div>
  )
}

interface ModalBodyProps {
  share?: JSX.Element
  movieContent?: JSX.Element
  offline?: JSX.Element
  credits?: JSX.Element
  about?: JSX.Element
  error?: JSX.Element
  type: string
  movieId?: number
}

Modal.Body = function ModalBody({
  share,
  movieContent,
  offline,
  credits,
  about,
  error,
  type,
}: ModalBodyProps) {
  return (
    <ModalBodyContent className={`modal-body ${type}`}>
      {share}
      {movieContent}
      {offline}
      {credits}
      {about}
      {error}
    </ModalBodyContent>
  )
}

export default ModalContainer
