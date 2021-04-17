import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"

interface LanguageButtonProps {
  readonly isMobile?: "mobile" | "desktop" | undefined
}

const LanguageButton = styled.button<LanguageButtonProps>`
  border-radius: 50%;
  transition: 0.2s ease-in;
  padding: 14px;
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
`

interface LanguageToggleProps {
  location: string
}

const LanguageToggle = ({ location }: LanguageToggleProps) => {
  const { t } = useTranslation()
  const { language } = useI18next()

  console.log(location, typeof location)
  const imageFlag = language === "da?" ? "DKK.png" : "GBP.png"
  const linkPath = location === "/" ? "/en/" : "../"

  return (
    <nav aria-label={t("LANGUAGE_ARIA_LABEL")}>
      <Link to={linkPath} activeClassName="active" title="Dansk">
        <LanguageButton>
          <img src={imageFlag} />
        </LanguageButton>
      </Link>
    </nav>
  )
}

export default LanguageToggle
