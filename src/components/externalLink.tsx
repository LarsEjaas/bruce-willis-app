import * as React from "react"
import { ReactNode, useContext } from "react"
import PropTypes from "prop-types"
import { GlobalContext } from "./layout"

type ExternalLinkProps = {
  className?: string; 
  href: string; 
  title: string; 
  children?: ReactNode;
  isMobile?: "mobile" | "desktop";
}

const ExternalLink = ({ className, href, title, children }:ExternalLinkProps) => {
  const { modalToggle, changeModalType, storeClickedElement } = useContext(GlobalContext);
  const sureToLeave = (e) => {
    e.preventDefault();
    modalToggle(e.currentTarget,"externLink");
  }


    return (
      <a className={className} onClick={(e)=>(sureToLeave(e))} href={href} title={title} aria-label={title} target="_blank" rel="noreferrer noopener">{children}</a>
    )
    }
  
export default ExternalLink

export const GoExtern = ({}) => {
  const { modalToggle, clickedElement } = useContext(GlobalContext);

  const closeModal = () => {
    modalToggle();
    clickedElement? clickedElement.focus() : undefined;
  }

  const openUrl = () => {
    clickedElement.href? window.open(`${clickedElement.href}`, '_blank'): undefined;
  }
  return(
  <>
  <div>
    <p>Are you sure you want to leave?</p>
    <button onClick={closeModal}>No thanks</button>
    <button onClick={openUrl}>Yes Please</button>
  </div>
  </>
  )
}