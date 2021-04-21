import * as React from "react"
import {
  useState,
  useEffect,
  createContext,
  useContext,
  createRef,
} from "react"
import styled from "styled-components"
import ReactDOM from "react-dom"
import Cross from "../svg/cross.inline.svg"
import { GlobalContext } from "./layout"
import AboutView from "./about"
import ShareButtons from "./share"
import MovieDetails from "./movieDetails"
import Backdrop from "./backdrop"
import { SkeletonTheme } from "react-loading-skeleton"
import { NavigateButton, Paragraph } from "./externalLink"
import { useTranslation } from "gatsby-plugin-react-i18next"

const Crossbutton = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  filter: drop-shadow(3px 3px 2px var(--border-main));
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
  line-height: 0.7;
  color: var(--movie-header1-color);
  text-shadow: 4px 4px 4px var(--border-main);
  text-align: center;
  width: 80%;
`

interface ModalContainerProps {
  language: "da" | "en"
}

const ModalContainer = ({ language }: ModalContainerProps) => {
  const { t } = useTranslation()
  const {
    modalToggle,
    modalVisible,
    modalType,
    isMobile,
    clickedElement,
  } = useContext(GlobalContext)
  const [isModalVisible, setIsModalVisible] = useState(modalVisible)

  useEffect(() => {
    if (isMobile === undefined) return
    modalVisible
      ? document.querySelector("main").classList.add("blur")
      : undefined
    console.log("modalVisible changed", isModalVisible, modalVisible)
    setIsModalVisible(modalVisible)
  }, [modalVisible])

  const [state, setState] = useState({})
  useEffect(() => {
    if (isMobile === undefined) return
    console.log("modal visible changed")
    document.querySelector(".modal-body") !== null
      ? setTimeout(function () {
          document.querySelector(".cross-btn") !== null
            ? document.querySelector(".modal-header > .cross-btn").focus()
            : document.querySelector(".modal-body.error button").focus()
        }, 400)
      : document.querySelector("main").classList.remove("blur")
  }, [isModalVisible])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const closeModal = e => {
    console.log(
      "closemodal running (not externModal",
      document.querySelector(".extern.modal-container"),
      e.target,
      e.currentTarget
    )
    if (
      (e.currentTarget === document.querySelector(".modal-container") &&
        e.target !== e.currentTarget) ||
      modalType === "error"
    )
      return

    //FIND A WAY TO PREVENT THIS WHEN CLOSING EXTERN MODAL!
    document.querySelector(".modal-container").classList.add("fadeOut")
    document.querySelector(".modal-content").classList.add("fadeOut")
    document.querySelector("main").classList.remove("blur")
    setTimeout(function () {
      setIsModalVisible(false)
      modalToggle()
      clickedElement ? clickedElement.focus() : undefined
    }, 300)
  }

  return (
    <>
      {isModalVisible && (
        <Modal modalType={modalType} onModalClose={e => closeModal(e)}>
          <Modal.Header modalType={modalType} />
          {modalType === "movie" && (
            <Modal.Body
              type={modalType}
              movieId={Number(clickedElement.id)}
              movieContent={
                <>
                  <MovieDetails
                    isMobile={isMobile}
                    movieId={Number(clickedElement.getAttribute("data-id"))}
                  />
                </>
              }
            />
          )}
          {modalType === "credits" && (
            <Modal.Body
              type={modalType}
              credits={
                <>
                  <Headline2>This is credits</Headline2>
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
                  <Backdrop
                    isMobile={isMobile}
                    original_title="Social share background"
                    backdrop_path="socialShare.jpg"
                    internUrl
                  />
                  <Headline2>Share on Social Media</Headline2>
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
                  <Backdrop
                    isMobile={isMobile}
                    original_title="404 error background"
                    backdrop_path="404.jpg"
                    internUrl
                  />
                  <Headline2>An error occured</Headline2>
                  <Paragraph>Please reload the page to retry...</Paragraph>
                  <NavigateButton onClick={() => location.reload()}>
                    {t("RELOAD")}
                  </NavigateButton>
                </>
              }
            />
          )}
        </Modal>
      )}
    </>
  )
}

interface ModalContentFrameProps {
  readonly modalType:
    | "share"
    | "movieContent"
    | "offline"
    | "credits"
    | "about"
    | "error"
}

const StyledModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5000;
  animation: fadeIn ease-out 0.4s;
  will-change: opacity;
  overflow-x: hidden;
  overflow-y: scroll;
`

const ModalContentFrame = styled.div<ModalContentFrameProps>`
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  padding: 0;
  animation: fadeIn ease-out 0.4s;
  background: var(--background2);
  border: 2px solid var(--icon-hover-color2);
  will-change: opacity;
  will-change: filter;
  overflow: hidden;
  transition: all 0.4s;
  :not(.extern, .credits, .share) {
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
  &.desktop.movie, &.desktop.about {
    width: calc(100% - 8px);
    margin-bottom: 200px;
    @media (min-height: 720px) {
      top: calc((100vh - 720px) / 2 );
    }
  }
  }
  &.share,
  &.error,
  &.credits {
    transform: translate(-50%, calc((100vh - 100%) / 2));
    width: fit-content;
  }
  & .gatsby-image-wrapper {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.7;
    -mask-image: linear-gradient(to top, transparent 12%, black 100%);
    -webkit-mask-image: linear-gradient(to top, transparent 12%, black 100%);
  }
`
const ModalBodyContent = styled.div`
  padding: 24px;
`

const modalContext = createContext(null)

interface ModalProps {
  readonly modalType:
    | "share"
    | "movieContent"
    | "offline"
    | "credits"
    | "about"
    | "error"
  children: JSX.Element
  onModalClose: (e: Event) => void
}

function Modal({ children, onModalClose, modalType }: ModalProps) {
  const { isMobile, clickedElement } = useContext(GlobalContext)
  const modalRef = createRef()
  const modalContainerRef = createRef()

  console.log(clickedElement)
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        onModalClose(e)
      }
    }

    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  }, [])

  const handleTabKey = e => {
    let focusableModalElements = []
    const allFocusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"],input[type="email"], input[type="checkbox"], select'
    )
    allFocusableModalElements.forEach(element => {
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

  function keyListener(e) {
    if (modalRef.current === null) return
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
      <SkeletonTheme
        color="var(--image-cover-color)"
        highlightColor="var(--icon-hover-color1)"
      >
        <ModalContentFrame
          className={`${isMobile} modal-content ${modalType}`}
          ref={modalRef}
          modalType={modalType}
        >
          <modalContext.Provider value={{ onModalClose }}>
            {children}
          </modalContext.Provider>
        </ModalContentFrame>
      </SkeletonTheme>
    </StyledModalContainer>,
    document.body
  )
}

interface ModalHeaderProps {
  modalType:
    | "share"
    | "movieContent"
    | "offline"
    | "credits"
    | "about"
    | "error"
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
  share: JSX.Element
  movieContent: JSX.Element
  offline: JSX.Element
  credits: JSX.Element
  about: JSX.Element
  error: JSX.Element
  type: string
  movieId: number
}

Modal.Body = function ModalBody({
  share,
  movieContent,
  offline,
  credits,
  about,
  error,
  type,
  movieId,
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
