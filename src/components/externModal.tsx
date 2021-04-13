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

const Crossbutton = styled.button`
  position: absolute;
  right: 24px;
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

const ExternModalContainer = ({}) => {
  const {
    externModalToggle,
    externModalVisible,
    isMobile,
    clickedExternLink,
  } = useContext(GlobalContext)
  const [isExternModalVisible, setIsExternModalVisible] = useState(
    externModalVisible
  )

  useEffect(() => {
    if (isMobile === undefined) return
    externModalVisible
      ? document.querySelector(".modal-content.movie")
        ? document.querySelector(".modal-content.movie").classList.add("blur")
        : document.querySelector("main").classList.add("blur")
      : undefined
    console.log(
      "extern modalVisible changed",
      isExternModalVisible,
      externModalVisible,
      document.querySelector(".modal-body.extern")
    )
    setIsExternModalVisible(externModalVisible)
  }, [externModalVisible])

  const [state, setState] = useState({})
  useEffect(() => {
    if (isMobile === undefined) return
    console.log(
      "externModal visible changed",
      isExternModalVisible,
      externModalVisible,
      document.querySelector(".modal-body.extern")
    )
    document.querySelector(".modal-body.extern") !== null
      ? setTimeout(function () {
          document.querySelector(".extern.modal-header > .cross-btn").focus()
        }, 400)
      : document.querySelector(".modal-content.movie") === null
      ? document.querySelector("main").classList.remove("blur")
      : null
  }, [isExternModalVisible])

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const closeExternModal = e => {
    console.log(
      "closeExternModal running",
      e.currentTarget,
      e.target,
      clickedExternLink
    )
    if (
      e.currentTarget === document.querySelector(".extern.modal-container") &&
      e.target !== e.currentTarget &&
      e.target !==
        document.querySelector("[class*=externalLink__NavigateButton]")
    )
      return

    console.log(document.querySelector(".modal-content.movie"))

    document.querySelector(".extern.modal-container").classList.add("fadeOut")
    document.querySelector(".modal-content.extern").classList.add("fadeOut")
    document.querySelector(".modal-content.movie") !== null
      ? document.querySelector(".modal-content.movie").classList.remove("blur")
      : document.querySelector("main").classList.remove("blur")
    setTimeout(function () {
      setIsExternModalVisible(false)
      externModalToggle()
      clickedExternLink ? clickedExternLink.focus() : undefined
    }, 300)
  }

  return (
    <>
      {isExternModalVisible && (
        <Modal onModalExternClose={e => closeExternModal(e)}>
          <Modal.Header />
          <Modal.Body>
            <GoExtern closeExternModal={e => closeExternModal(e)} />
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

const ModalContentFrame = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 40px;
  padding: 24px;
  animation: fadeIn ease-out 0.4s;
  transform-origin: center center;
  background: var(--background2);
  border: 2px solid var(--icon-hover-color2);
  will-change: opacity;
  overflow: hidden;
  &.mobile {
    width: calc(100vw - 8px);
    min-width: 300px;
  }
  &.desktop {
    max-width: 1080px;
  }
`

const externModalContext = createContext(null)

interface ModalProps {
  children: JSX.Element
  onModalExternClose: (e: Event) => void
  movieId: number
}

function Modal({ children, onModalExternClose, movieId }: ModalProps) {
  const { isMobile, clickedExternLink } = useContext(GlobalContext)
  console.log(clickedExternLink)
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        onModalExternClose()
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
    [27, onModalExternClose],
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
      className="extern modal-container"
      role="dialog"
      aria-modal="true"
      ref={modalContainerRef}
      style={{ movieId }}
      onClick={onModalExternClose}
    >
      <ModalContentFrame
        className={`${isMobile} modal-content extern`}
        ref={modalRef}
      >
        <externModalContext.Provider value={{ onModalExternClose }}>
          {children}
        </externModalContext.Provider>
      </ModalContentFrame>
    </div>,
    document.body
  )
}

Modal.Header = function ModalHeader() {
  const { onModalExternClose } = useContext(externModalContext)
  return (
    <div className="extern modal-header">
      <Crossbutton
        className="cross-btn"
        title="Close window"
        aria-label="Close window"
        onClick={onModalExternClose}
      >
        <Cross className="cross" width="22" />
      </Crossbutton>
    </div>
  )
}

interface ModalBodyProps {
  linkDescription: string
}

Modal.Body = function ModalBody({ children }: ModalBodyProps) {
  return (
    <div className="modal-body extern" style={{ padding: "24px" }}>
      {children}
    </div>
  )
}

export default ExternModalContainer
