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
  const { externModalToggle } = useContext(GlobalContext)
  const sureToLeave = e => {
    e.preventDefault()
    externModalToggle(e.currentTarget, "externLink")
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

const ButtonContainer = styled.div<ButtonContainerProps>`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

const NavigateButton = styled.button`
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

export const GoExtern = () => {
  const { externModalToggle, clickedExternLink } = useContext(GlobalContext)

  const closeExternModal = () => {
    console.log(clickedExternLink)
    externModalToggle(clickedExternLink)
    clickedExternLink ? clickedExternLink.focus() : undefined
  }

  const openUrl = () => {
    clickedExternLink.href
      ? window.open(`${clickedExternLink.href}`, "_blank")
      : undefined
  }

  let domain = new URL(`${clickedExternLink.href}`)
  domain = domain.hostname

  return (
    <>
      <div>
        <h2>Are you sure?</h2>
        <p>
          You are about to navigate away from this page to {domain} and '
          {clickedExternLink.title}'.
        </p>
        <ButtonContainer>
          <NavigateButton onClick={closeExternModal}>No Thanks</NavigateButton>
          <NavigateButton onClick={openUrl}>Yes Please</NavigateButton>
        </ButtonContainer>
      </div>
    </>
  )
}
