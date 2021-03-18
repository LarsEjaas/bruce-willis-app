import * as React from "react"
import { useState, useEffect, createContext, useContext, createRef } from 'react'
import styled from 'styled-components'
import ReactDOM from 'react-dom'
import Cross from "../svg/cross.inline.svg"
import { GlobalContext } from "./layout"
import { GoExtern } from "./externalLink"

const Crossbutton = styled.button<CrossbuttonProps>`
  position: absolute;
  right: 24px;  
  background-color: unset;
  border: unset;
  & path {
    fill: var(--icon-color1)
  }
  }`

const ModalContainer = ({ }) => {
  const { modalToggle, modalVisible, modalType, isMobile, clickedElement } = useContext(GlobalContext);
  const [isModalVisible, setIsModalVisible] = useState(modalVisible);
  console.log(isMobile);

  useEffect(()=>{
    modalVisible? document.querySelector('main').classList.add("blur"): void(0);
    console.log("modalVisible changed", isModalVisible, modalVisible);
    setIsModalVisible(modalVisible);
  },[modalVisible])


    const [state, setState] = useState({})
    useEffect(() => { 
      console.log('modal visible changed')   
      document.querySelector('.modal-body') !== null? 
        setTimeout(function(){document.querySelector('.modal-header > .cross-btn').focus()}, 400)
        :
        document.querySelector('main').classList.remove("blur");
      },[isModalVisible])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const closeModal = (e) => {
    document.querySelector(".modal-container").classList.add('fadeOut');
    document.querySelector(".modal-content").classList.add('fadeOut');
    document.querySelector('main').classList.remove("blur");
    setTimeout(function(){ 
    setIsModalVisible(false);
    modalToggle();
    clickedElement? clickedElement.focus() : undefined;
    }, 300);
  }

    return (
        <>
      {isModalVisible && (
        <Modal onModalClose={() => closeModal()}>
          <Modal.Header></Modal.Header>
          {modalType==="externLink"&&
          <Modal.Body
          goExtern={<GoExtern/>}
          />
          }
          {modalType==="movie"&&
          <Modal.Body
          movieContent={<><h2>This is a test</h2></>}
          />
          }
            {/* //
            // {modalType==="share"&&
            // share={<ShareModal/>}
            // }
            // {modalType==="movie"&&
            // movieContent={<MovieContent/>}
            // } */}
            {/* {modalType==="externLink"&&
            <ModalContent
            goExtern={<GoExtern/>}
            />
            } */}
            {/* // {modalType==="offline"&& 
            // offLine={<Offline/>}
            // }
            // {modalType==="credits"&& 
            // offLine={<Offline/>}
            // }
            // {modalType==="about"&& 
            // offLine={<Offline/>}
            // } */}
          {/* </Modal.Body> */}
        </Modal>
      )}  
        </>        
    );
}

const modalContext = createContext();

function Modal({ children, onModalClose }) {
  const { isMobile, clickedElement } = useContext(GlobalContext);
  console.log(clickedElement)
  useEffect(() => {
    function keyListener(e) {
      if (e.keyCode === 27) {
        onModalClose();
      }
    }

    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef();
  const modalContainerRef =  createRef();
  const handleTabKey = e => {
    let focusableModalElements = [];
    const allFocusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"],input[type="email"], input[type="checkbox"], select'
    );
    allFocusableModalElements.forEach((element) => {
      if (window.getComputedStyle(element).display !== "none") {
        focusableModalElements.push(element)  
        } 
      })
    const firstElement = focusableModalElements[0];
    const lastElement =
    focusableModalElements[focusableModalElements.length - 1];
    if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([[27, onModalClose], [9, handleTabKey]]);

  function keyListener(e) {
    if (modalRef.current === null) return
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode);
  
    // call the listener if it exists
    return listener && listener(e);
  }
  
  document.addEventListener("keydown", keyListener);

  return ReactDOM.createPortal(
    <div className="modal-container" role="dialog" aria-modal="true" ref={modalContainerRef}>
      <div className={`${isMobile} modal-content`} ref={modalRef}>
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </div>
    </div>,
    document.body
  );
}

Modal.Header = function ModalHeader(props) {
  const { onModalClose } = useContext(modalContext);
  return (
    <div className="modal-header">
      {props.children}
      <Crossbutton className="cross-btn" title="Close window" aria-label="Close window" onClick={onModalClose}>
        <Cross className="cross" width="22"/>
      </Crossbutton>
    </div>
  );
};

Modal.Body = function ModalBody({share, movieContent, goExtern, offline, credits, about}) {
  return <div className="modal-body"> 
  {share}
  {movieContent}
  {goExtern}
  {offline}
  {credits}
  {about}
  </div>;
};

export default ModalContainer

const ModalContent = ({share, movieContent,goExtern, offline, credits, about}) => (
  <>
  {share}
  {movieContent}
  {goExtern}
  {offline}
  {credits}
  {about}
  </>
  )
