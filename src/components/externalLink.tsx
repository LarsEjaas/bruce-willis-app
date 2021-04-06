import * as React from "react"
import { ReactNode, useContext } from "react"
import { GlobalContext } from "./layout"
import styled from "styled-components"

type ExternalLinkProps = {
  className?: string
  href: string
  title: string
  children?: ReactNode
  isMobile?: "mobile" | "desktop"
}

const ExternalLink = ({
  className,
  href,
  title,
  children,
}: ExternalLinkProps) => {
  const { modalToggle } = useContext(GlobalContext)
  const sureToLeave = e => {
    e.preventDefault()
    modalToggle(e.currentTarget, "externLink")
  }

  return (
    <a
      className={className}
      onClick={e => sureToLeave(e)}
      href={href}
      title={title}
      aria-label={title}
      target="_blank"
      rel="noreferrer noopener"
    >
      {children}
    </a>
  )
}

export default ExternalLink

type ButtonContainerProps = {
  borderRadius: number
}

const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

type NavigateButtonProps = {
  borderRadius: number
}

const NavigateButton = styled.button<NavigateButtonProps>`
  border-radius: 30px;
  transition: 0.2s ease-in;
  padding: 14px;
  box-shadow: var(--icon-shadow);
  border: 2px solid var(--icon-color1);
  display: inline-block;
  text-decoration: none;
  margin: 0.5em;
  background-color: transparent;
  font-family: "Passion One", cursive;
  font-weight: 700;
  cursor: pointer;
  font-size: 20px;
  color: var(--icon-hover-color1);
  &:hover {
    color: var(--icon-hover-color2);
    border-color: var(--icon-hover-color1);
    transform: scale(1.1);
  }
  &:nth-child(1) {
    color: var(--icon-color1);
    background-color: #ffffff08;
  }
`

export const GoExtern = ({}) => {
  const { modalToggle, clickedElement } = useContext(GlobalContext)

  const closeModal = () => {
    modalToggle()
    clickedElement ? clickedElement.focus() : undefined
  }

  const openUrl = () => {
    clickedElement.href
      ? window.open(`${clickedElement.href}`, "_blank")
      : undefined
  }
  return (
    <>
      <div>
        <h2>Are you sure?</h2>
        <p>You are about to navigate away from this page!</p>
        <ButtonContainer>
          <NavigateButton onClick={closeModal}>No Thanks</NavigateButton>
          <NavigateButton onClick={openUrl}>Yes Please</NavigateButton>
        </ButtonContainer>
      </div>
    </>
  )
}
