import * as React from "react"
import {
  useState,
  useEffect,
  createContext,
  useContext,
  createRef,
  MouseEvent,
} from "react"
import styled, { keyframes } from "styled-components"
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
  filter: drop-shadow(3px 3px 2px var(--border-main));
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
    setIsExternModalVisible(externModalVisible)
  }, [externModalVisible])

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
          let element: HTMLElement = document.querySelector(
            ".extern.modal-header > .cross-btn"
          )
          element?.focus()
        }, 400)
      : document.querySelector(".modal-content.movie") === null
      ? document.querySelector("main").classList.remove("blur")
      : null
  }, [isExternModalVisible])

  const closeExternModal = (e: MouseEvent | KeyboardEvent) => {
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
    setTimeout(function () {
      setIsExternModalVisible(false)
      externModalToggle()
      clickedExternLink ? clickedExternLink.focus() : undefined
    }, 300)
  }

  return (
    <>
      {isExternModalVisible && (
        <Modal
          onModalExternClose={(e: MouseEvent | KeyboardEvent) =>
            closeExternModal(e)
          }
        >
          <Modal.Header />
          <Modal.Body>
            <GoExtern
              isMobile={isMobile}
              closeExternModal={(e: MouseEvent | KeyboardEvent) =>
                closeExternModal(e)
              }
            />
          </Modal.Body>
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

const StyledExternModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 6000;
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
  position: absolute;
  left: 50%;
  border-radius: 40px;
  padding: 24px;
  animation: fadeIn ease-out 0.3s;
  background: var(--background2);
  border: 2px solid var(--icon-hover-color2);
  will-change: opacity;
  overflow: hidden;
  transform: translate(-50%, calc((100vh - 100%) / 2));
  &.mobile {
    width: calc(100vw - 8px);
    min-width: 300px;
  }
  &.desktop {
    max-width: 1080px;
  }
  &.fadeOut {
    animation: ${fadeOut} ease-in 0.4s;
    animation-fill-mode: both;
  }
`

const externModalContext = createContext(null)

interface ModalProps {
  children: JSX.Element[]
  onModalExternClose: (e: MouseEvent | KeyboardEvent) => void
}

function Modal({ children, onModalExternClose }: ModalProps) {
  const { isMobile, clickedExternLink } = useContext(GlobalContext)
  console.log(clickedExternLink)
  useEffect(() => {
    function keyListener(e: KeyboardEvent) {
      if (e.keyCode === 27) {
        onModalExternClose(e)
      }
    }
    document.addEventListener("keydown", keyListener)

    return () => document.removeEventListener("keydown", keyListener)
  })

  const modalRef = createRef<HTMLDivElement>()
  const externModalContainerRef = createRef<HTMLDivElement>()
  const handleTabKey = (e: KeyboardEvent) => {
    let focusableModalElements: Array<HTMLElement> = []
    const allFocusableModalElements: NodeListOf<HTMLElement> = modalRef.current.querySelectorAll(
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
    [27, onModalExternClose],
    [9, handleTabKey],
  ])

  function keyListener(e: KeyboardEvent) {
    if (modalRef.current === null) return
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode)

    // call the listener if it exists
    return listener && listener(e)
  }

  document.addEventListener("keydown", keyListener)

  return ReactDOM.createPortal(
    <StyledExternModalContainer
      className="extern modal-container"
      role="dialog"
      aria-modal="true"
      ref={externModalContainerRef}
      //style={{ movieId }}
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
    </StyledExternModalContainer>,
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
  //linkDescription: string
  children: JSX.Element | JSX.Element[]
}

Modal.Body = function ModalBody({ children }: ModalBodyProps) {
  return (
    <div className="modal-body extern" style={{ padding: "24px" }}>
      {children}
    </div>
  )
}

export default ExternModalContainer
