import * as React from "react"
import { Link } from "gatsby"
import styled, { keyframes } from "styled-components"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

interface StyledNavProps {
  readonly isMobile?: "mobile" | "desktop" | undefined
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`

const StyledNav = styled.nav<StyledNavProps>`
  z-index: 5;
  position: relative;
  padding: ${props => (props.isMobile === "mobile" ? "20px 8px" : "20px")};
  width: fit-content;
  &.right {
    animation: ${fadeIn} 1s ease-out 0.6s;
    animation-fill-mode: both;
  }
  &.left {
    animation: ${fadeOut} 0.5s ease-out;
    animation-fill-mode: both;
  }
  &.desktop {
    animation: ${fadeIn} 0.6s ease-out 0.4s;
    animation-fill-mode: both;
  }
`

interface LanguageButtonProps {
  readonly isMobile?: "mobile" | "desktop" | undefined
}

const LanguageButton = styled.button<LanguageButtonProps>`
  border-radius: 50%;
  transition: 0.2s ease-in;
  height: 40px;
  width: 40px;
  border: ${props =>
    props.isMobile === "mobile"
      ? "4px solid var(--icon-color1)"
      : "4px solid var(--icon-hover-color1)"};
  display: block;
  position: relative;
  -webkit-text-decoration: none;
  text-decoration: none;
  margin: 0;
  cursor: pointer;
  overflow: hidden;
  background-color: transparent;
  transition: transform 0.2s ease-in-out;
  &::after {
    content: "";
    height: 100%;
    width: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: inset 0 6px 6px var(--border-main);
  }
  &:hover {
    transform: scale(1.1);
    border-color: ${props =>
      props.isMobile === "mobile"
        ? "var(--icon-hover-color1)"
        : "var(--icon-hover-color2)"};
  }
  & img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    opacity: 0.7;
  }
  & img::after {
    content: "";
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: var(--background1);
  }
  &:hover img {
    opacity: 1;
  }
`

interface LanguageToggleProps {
  className?: string
}

const LanguageToggle = ({ className }: LanguageToggleProps) => {
  const { t } = useTranslation()
  const { language } = useI18next()

  const noMove = () => {
    if (typeof window !== undefined) {
      let body = document.querySelector("body")
      !!body && body.classList.contains("move")
        ? body.classList.remove("move")
        : null
    }
  }

  const imageFlag = language === "da" ? "DKK_full.png" : "GBP_full.png"
  const flagAlt = language === "da" ? "dansk flag" : "British Flag"
  const linkPath = language === "da" ? "/en/" : "../"

  return (
    <StyledNav aria-label={t("LANGUAGE_ARIA_LABEL")} className={className}>
      <Link
        tabIndex={-1}
        to={linkPath}
        onClick={() => noMove()}
        activeClassName="active"
        title={
          language === "da"
            ? "Change Language to English"
            : "Skift til dansk sprog"
        }
      >
        <LanguageButton>
          <img src={`../${imageFlag}`} alt={flagAlt} />
        </LanguageButton>
      </Link>
    </StyledNav>
  )
}

export default LanguageToggle
