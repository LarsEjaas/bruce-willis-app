import * as React from "react"
import { Link } from "gatsby"
import styled, { keyframes } from "styled-components"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

interface StyledNavProps {
  readonly isMobile?: "mobile" | "desktop" | undefined
}

const StyledNav = styled.nav<StyledNavProps>`
  z-index: 3;
  position: relative;
  padding: ${props => (props.isMobile === "mobile" ? "20px 8px" : "20px")};
`

interface LanguageButtonProps {
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
  background-color: var(--background1);
  transition: transform 0.2s ease-in-out;
  animation: ${fadeIn} 1s ease-out 0.6s;
  animation-fill-mode: both;
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
    left: -13px;
    height: 32px;
    opacity: 0.7;
  }
  &:hover img {
    opacity: 1;
  }
`

interface LanguageToggleProps {
  location: object
  readonly isMobile?: "mobile" | "desktop" | undefined
}

const LanguageToggle = ({ location, isMobile }: LanguageToggleProps) => {
  const { t } = useTranslation()
  const { language } = useI18next()

  console.log(location.pathname, typeof location, language, typeof language)
  const imageFlag = language === "da" ? "DKK.png" : "GBP.png"
  const linkPath = location.pathname === "/" ? "/en/" : "../"

  return (
    <StyledNav aria-label={t("LANGUAGE_ARIA_LABEL")}>
      <Link to={linkPath} activeClassName="active" title="Dansk">
        <LanguageButton>
          <img src={`../${imageFlag}`} />
        </LanguageButton>
      </Link>
    </StyledNav>
  )
}

export default LanguageToggle
