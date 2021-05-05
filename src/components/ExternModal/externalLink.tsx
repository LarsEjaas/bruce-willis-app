import * as React from "react"
import { ReactNode, useContext, MouseEvent } from "react"
import { GlobalContext } from "../layout"
import styled from "styled-components"
import Backdrop from "../Modal/backdrop"
import { useTranslation } from "gatsby-plugin-react-i18next"

type ExternalLinkProps = {
  className?: string
  href: string
  title: string
  children?: ReactNode
  isMobile?: "mobile" | "desktop"
  tabIndex?: number | undefined
}

const ExternalLink = ({
  className,
  href,
  title,
  children,
  tabIndex,
}: ExternalLinkProps) => {
  const { externModalToggle } = useContext(GlobalContext)
  const sureToLeave = (e: MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()
    externModalToggle(e.currentTarget)
  }

  return (
    <a
      tabIndex={tabIndex}
      className={className}
      onClick={(e: MouseEvent<HTMLAnchorElement>): void => sureToLeave(e)}
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const NavigateButton = styled.button`
  border-radius: 30px;
  transition: 0.2s ease-in;
  padding: 14px 20px;
  border: 2px solid var(--icon-hover-color2);
  margin: 0.5em;
  background-color: transparent;
  font-family: "Passion One", cursive;
  font-weight: 400;
  cursor: pointer;
  font-size: 20px;
  color: var(--movie-paragraph-color);
  float: right;
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

interface ParagraphProps {
  centered?: boolean
}

export const Paragraph = styled.p<ParagraphProps>`
  white-space: break-spaces;
  color: var(--movie-header1-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  font-weight: 600;
  font-size: 16px;
  text-align: ${props => (props.centered ? "center" : "left")};
`

interface closeExternModalProps {
  closeExternModal: (e: MouseEvent<HTMLButtonElement>) => void
  isMobile: "desktop" | "mobile" | undefined
}

export const GoExtern = ({
  closeExternModal,
  isMobile,
}: closeExternModalProps) => {
  const { t } = useTranslation()
  const { clickedExternLink } = useContext(GlobalContext)

  const openUrl = (e: MouseEvent<HTMLButtonElement>) => {
    closeExternModal(e)
    clickedExternLink.href
      ? window.open(`${clickedExternLink.href}`, "_blank")
      : undefined
  }

  const Title =
    clickedExternLink.title.charAt(0).toLowerCase() +
    clickedExternLink.title.slice(1)

  let domain: string | URL = new URL(`${clickedExternLink.href}`)
  domain = domain.hostname

  return (
    <>
      <div>
        {domain === "larsejaas.com" && (
          <Backdrop
            isMobile={isMobile}
            original_title={`Ejaas logo${t("MODAL.EXTERNAL_LOGO_ALT")}`}
            backdrop_path="ejaas_logo.png"
            internUrl
          />
        )}
        {domain === "www.themoviedb.org" && (
          <Backdrop
            isMobile={isMobile}
            original_title={`The Movie Database${t("MODAL.EXTERNAL_LOGO_ALT")}`}
            backdrop_path="tmdb_back.png"
            internUrl
          />
        )}
        {domain === "www.imdb.com" && (
          <Backdrop
            isMobile={isMobile}
            original_title={`IMDb${t("MODAL.EXTERNAL_LOGO_ALT")}`}
            backdrop_path="imdb_back.png"
            internUrl
          />
        )}
        {domain === "github.com" && (
          <Backdrop
            isMobile={isMobile}
            original_title={`Github${t("MODAL.EXTERNAL_LOGO_ALT")}`}
            backdrop_path="Github_background.png"
            internUrl
          />
        )}
        {domain === "www.gageskidmore.com" && (
          <Backdrop
            isMobile={isMobile}
            original_title={`Gage Skidmore${t("MODAL.EXTERNAL_LOGO_ALT")}`}
            backdrop_path="Gage_skidmore_background.png"
            internUrl
          />
        )}
        {domain === "www.gofundme.com" && (
          <Backdrop
            isMobile={isMobile}
            original_title={`gofundme${t("MODAL.EXTERNAL_LOGO_ALT")}`}
            backdrop_path="goFundMe_back.png"
            internUrl
          />
        )}
        {domain === "commons.wikimedia.org" && (
          <Backdrop
            isMobile={isMobile}
            original_title={`Wikimedia Commons${t("MODAL.EXTERNAL_LOGO_ALT")}`}
            backdrop_path="wikiCommons_back.png"
            internUrl
          />
        )}

        <Headline2>{t("MODAL.EXTERNAL_HEADER")}</Headline2>
        <Paragraph centered>
          {t("MODAL.EXTERNAL_PARAGRAPH1")}
          {Title}
          {t("MODAL.EXTERNAL_PARAGRAPH2")}
          {domain}.
        </Paragraph>
        <ButtonContainer>
          <NavigateButton
            onClick={closeExternModal}
            className="externalLink__NavigateButton"
          >
            {t("MODAL.EXTERNAL_BUTTON_NO")}
          </NavigateButton>
          <NavigateButton
            onClick={openUrl}
            className="externalLink__NavigateButton"
          >
            {t("MODAL.EXTERNAL_BUTTON_YES")}
          </NavigateButton>
        </ButtonContainer>
      </div>
    </>
  )
}
