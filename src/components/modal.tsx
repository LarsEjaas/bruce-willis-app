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
import { GoExtern } from "./externalLink"
import AboutView from "./about"
import ShareButtons from "./share"
import { StaticImage } from "gatsby-plugin-image"
import MovieDetails from "./movieDetails"

const Crossbutton = styled.button<CrossbuttonProps>`
  position: absolute;
  right: 24px;
  background-color: unset;
  border: unset;
  cursor: pointer;
  transition: all 0.2s ease-in;
  padding: 0;
  &:hover {
    transition: 0.3s ease-out;
    transform: scale(1.2);
  }
  & path {
    fill: var(--icon-hover-color1);
  }
  &:hover path {
    fill: var(--icon-hover-color2);
  }
`

interface FilmRollProps {
  position: string
  width: number
  left: number
  top: number
  opacity: number
  zIndex: number
}

const FilmRoll = styled(StaticImage)<FilmRollProps>`
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  opacity: 0.1;
  z-index: -1;
  src: "../images/filmroll.png";
`

const ModalContainer = ({}) => {
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
    // modalVisible? document.querySelector('main').classList.add("blur"): void(0);
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
          document.querySelector(".modal-header > .cross-btn").focus()
        }, 400)
      : document.querySelector("main").classList.remove("blur")
  }, [isModalVisible])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const closeModal = e => {
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
        <Modal modalType={modalType} onModalClose={() => closeModal()}>
          <FilmRoll
            src="../images/filmroll.png"
            alt="roll of film"
            loading="eager"
            placeholder="none"
            layout="constrained"
          />
          <Modal.Header></Modal.Header>
          {modalType === "externLink" && <Modal.Body goExtern={<GoExtern />} />}
          {modalType === "movie" && (
            <Modal.Body
              movieContent={
                <>
                  <MovieDetails />
                </>
              }
            />
          )}
          {modalType === "credits" && (
            <Modal.Body
              credits={
                <>
                  <h2>This is credits</h2>
                </>
              }
            />
          )}
          {modalType === "about" && (
            <Modal.Body
              about={
                <>
                  <AboutView />
                </>
              }
            />
          )}
          {modalType === "share" && (
            <Modal.Body
              share={
                <>
                  <h2>Share This Page on Social Media</h2>
                  <ShareButtons />
                </>
              }
            />
          )}
        </Modal>
      )}
    </>
  )
}

const modalContext = createContext()

function Modal({ children, onModalClose, modalType }) {
  const { isMobile, clickedElement } = useContext(GlobalContext)
  console.log(clickedElement)
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        onModalClose()
      }
    }

    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  })

  const modalRef = createRef()
  const modalContainerRef = createRef()
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
    <div
      className="modal-container"
      role="dialog"
      aria-modal="true"
      ref={modalContainerRef}
    >
      <div className={`${isMobile} modal-content ${modalType}`} ref={modalRef}>
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </div>
    </div>,
    document.body
  )
}

Modal.Header = function ModalHeader(props) {
  const { onModalClose } = useContext(modalContext)
  return (
    <div className="modal-header">
      {props.children}
      <Crossbutton
        className="cross-btn"
        title="Close window"
        aria-label="Close window"
        onClick={onModalClose}
      >
        <Cross className="cross" width="22" />
      </Crossbutton>
    </div>
  )
}

Modal.Body = function ModalBody({
  share,
  movieContent,
  goExtern,
  offline,
  credits,
  about,
}) {
  return (
    <div className="modal-body">
      {share}
      {movieContent}
      {goExtern}
      {offline}
      {credits}
      {about}
    </div>
  )
}

export default ModalContainer

const ModalContent = ({
  share,
  movieContent,
  goExtern,
  offline,
  credits,
  about,
}) => (
  <>
    {share}
    {movieContent}
    {goExtern}
    {offline}
    {credits}
    {about}
  </>
)
