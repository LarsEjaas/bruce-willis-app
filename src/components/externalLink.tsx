import * as React from "react"
import { ReactNode, useContext } from "react"
import { GlobalContext } from "./layout"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"

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
  border: 2px solid var(--icon-hover-color2);
  display: inline-block;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin: 0.5em;
  background-color: transparent;
  font-family: "Passion One", cursive;
  font-weight: 700;
  cursor: pointer;
  font-size: 20px;
  color: var(--movie-paragraph-color);
  &:nth-child(1) {
    color: var(--icon-hover-color2);
    background-color: #ffffff08;
    border-color: var(--icon-hover-color1);
  }
  &:hover {
    color: var(--movie-header1-color);
    border-color: var(--movie-paragraph-color);
    transform: scale(1.1);
  }

  &:nth-child(1):hover {
    color: var(--movie-paragraph-color);
    border-color: var(--icon-hover-color2);
    transform: scale(1.1);
  }
`

const Headline2 = styled.h2`
  font-family: "Passion One", cursive;
  font-weight: 700;
  font-size: clamp(1.6rem, 0.8rem + 4vw, 3.5rem);
  margin: 0;
  margin-block-start: 0;
  margin-block-end: 0.4em;
  line-height: 1.1;
  color: var(--movie-header1-color);
  text-shadow: 4px 4px 4px var(--border-main);
  text-align: center;
`

const Paragraph = styled.p`
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
  font-size: 16px;
  margin-block-start: 1em;
  margin-block-end: 1em;
`

interface closeExternModalProps {
  closeExternModal: (e: any) => void
}

export const GoExtern = ({ closeExternModal }: closeExternModalProps) => {
  const { clickedExternLink } = useContext(GlobalContext)

  const openUrl = e => {
    closeExternModal(e)
    clickedExternLink.href
      ? window.open(`${clickedExternLink.href}`, "_blank")
      : undefined
  }

  let domain = new URL(`${clickedExternLink.href}`)
  domain = domain.hostname

  console.log(domain)

  const backdrop_path =
    domain === "larsejaas.com" ? "../images/ejaas_logo.png" : null

  const backdrop_alt = domain === "larsejaas.com" ? "Ejaas logo" : null

  return (
    <>
      <div>
        <StaticImage
          src={backdrop_path}
          alt={backdrop_alt}
          loading="eager"
          placeholder="none"
          layout="constrained"
        />
        <Headline2>Are you sure?</Headline2>
        <Paragraph>
          You are about to navigate away from this page to {domain} and '
          {clickedExternLink.title}'.
        </Paragraph>
        <ButtonContainer>
          <NavigateButton onClick={closeExternModal}>No Thanks</NavigateButton>
          <NavigateButton onClick={openUrl}>Yes Please</NavigateButton>
        </ButtonContainer>
      </div>
    </>
  )
}
