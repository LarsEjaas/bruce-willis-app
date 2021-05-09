import * as React from "react"
import { useContext, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import EjaasLogo from "../../svg/ejaas_logo.inline.svg"
import TMDBlogoVertical from "../../svg/tmdb_logo_upright.inline.svg"
import TMDBlogo from "../../svg/tmdb_logo.inline.svg"
import ShareIcon from "../../svg/share-alt.inline.svg"
import ExternalLink from "../ExternModal/externalLink"
import { GlobalContext } from "../layout"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import LanguageToggle from "./languageToggle"

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const slideIn = keyframes`
from {
  opacity: 0;
  transform: translateX(-40px);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`

const HeadlineslideIn = keyframes`
from {
  opacity: 0;
  transform: translateX(-120px);
}
to {
  opacity: 1;
  transform: translateX(0);
}
`

const circleFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-50%) translateX(-40px) scale(0.9);
}
to {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
`

const slideUp = keyframes`
from {
  opacity: 0;
  transform: translateY(40px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`

export const slideDown = keyframes`
from {
  opacity: 0;
  transform: translateY(-40px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`

interface StyledProps {
  readonly left?: boolean
  readonly isMobile?: "mobile" | "desktop" | undefined
}

const Section = styled.section<StyledProps>`
  position: relative;
  background: ${props =>
    props.left ? "var(--background1)" : "var(--background2)"};
  border-radius: ${props => (props.left ? "40px 0 0 40px" : "0 40px 40px 0")};
  height: ${props => (props.isMobile === "mobile" ? "100%" : "unset")};
  &.mobile {
    border-radius: 0;
  }
  .BruceW {
    z-index: 2;
    position: absolute;
    left: 0;
  }
  body.move & .BruceW.right img {
    animation: ${fadeIn} 0.5s ease-out 0.4s;
    animation-fill-mode: both;
    will-change: opacity;
  }
  .BruceW.desktop img {
    animation: ${fadeIn} 0.5s ease-out 0.2s;
    animation-fill-mode: both;
    width: 103%;
  }
  .BruceW.mobile {
    top: 0;
    bottom: 2.5em;
    left: 0;
    width: 80vw;
    margin: auto;
    max-width: 549px;
    max-height: 749px;
    height: 127vw;
  }
  .BruceW.desktop {
    bottom: 3%;
    width: 103%;
  }
  .grunge {
    overflow: hidden;
    position: absolute;
    inset: 0;
    border-radius: 0 40px 40px 0;
    opacity: 0.6;
  }
  svg {
    transition: all 0.2s ease-in-out;
  }
  svg path {
    fill: var(--icon-color1);
  }
  svg:hover path {
    fill: var(--icon-hover-color1);
  }
  svg:hover {
    transform: scale(1.2);
  }
`

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledExternalLink = styled(ExternalLink)<StyledProps>`
  &.EjaasLogo {
    position: ${props =>
      props.isMobile === "mobile" ? "relative" : "absolute"};
    z-index: 3;
    bottom: ${props => (props.isMobile === "mobile" ? "unset" : "26px")};
    height: ${props => (props.isMobile === "mobile" ? "43px" : "48px")};
    right: ${props => (props.isMobile === "mobile" ? "unset" : "24px")};
    padding: 20px 16px;
    height: fit-content;
  }
  &.desktop&.EjaasLogo&.left {
    animation: ${slideUp} 1s ease-out;
    animation-fill-mode: both;
    will-change: transform, opacity;
  }
  &.mobile&.EjaasLogo&.right {
    animation: ${slideDown} 1s ease-out 0.4s;
    animation-fill-mode: both;
    will-change: transform, opacity;
  }
  &:not(.mobile).EjaasLogo {
    animation: ${slideUp} 0.6s ease-out 0.2s;
    animation-fill-mode: both;
    will-change: transform, opacity;
  }
  &.mobile&.TMDBlogo {
    z-index: 3;
    position: relative;
    padding: 32px 8px 32px 16px;
  }
  &.mobile&.TMDBlogo&.right {
    animation: ${slideIn} 1s ease-out 0.6s;
    animation-fill-mode: both;
    will-change: transform, opacity;
  }
`

const Navigation = styled.nav`
  z-index: 4;
  position: absolute;
  display: flex;
  &.desktop {
    animation: ${slideIn} 0.7s ease-out;
    animation-fill-mode: both;
    flex-direction: column;
    padding: 24px;
    top: 8px;
    left: 0;
    will-change: transform, opacity;
  }
  &.mobile.right {
    animation: ${HeadlineslideIn} 0.7s ease-out 0.5s;
    animation-fill-mode: both;
    padding: 16px;
    bottom: 13px;
    left: 6vw;
    will-change: transform, opacity;
    @media (max-width: 360px) {
      left: 0;
    }
  }
  &.mobile.left {
    bottom: 13px;
    padding: 16px;
    left: 6vw;
    transform: translateY(5px);
  }
  & .ShareIcon path {
    fill: var(--icon-color1);
  }
  & .ShareIcon:hover path {
    fill: var(--icon-hover-color1);
  }
  & .ShareIcon.mobile {
    padding-right: 8px;
    cursor: pointer;
  }
  &.desktopShare {
    right: 1px;
    cursor: pointer;
    padding: 24px;
    animation: ${slideDown} 0.7s ease-out 0.1s;
    animation-fill-mode: both;
  }
`
const Vertical = styled.h2`
  text-orientation: mixed;
  margin-block-start: 0;
  margin-block-end: 0;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  &.desktop {
    transform: translateX(-4px) rotate(180deg);
    writing-mode: vertical-rl;
    margin: 8px 0;
  }
  &.mobile {
    margin: 0 8px;
    transform: translateY(5px);
  }
  &:hover {
    color: var(--icon-hover-color1);
  }
  &.desktop:hover {
    transform: translateX(-4px) rotate(180deg) scale(1.2);
  }
  &.mobile:hover {
    transform: translateY(5px) scale(1.2);
  }
`

const Headline = styled.h1<StyledProps>`
  position: absolute;
  text-shadow: var(--text-shadow-primary);
  z-index: 3;
  will-change: transform, opacity;
  &.desktop {
    left: -48px;
    @media (max-width: 1200px) {
      left: calc((1280px - 100vw) * 0.08);
    }
    bottom: 24px;
    font-size: clamp(3.5rem, -0.7857rem + 11.4286vw, 8rem);
    animation: ${HeadlineslideIn} 0.5s ease-out 0.4s;
    animation-fill-mode: both;
    will-change: transform, opacity;
  }
  &.mobile {
    left: 10%;
    font-size: clamp(5.5rem, 4.4655rem + 4.5977vw, 8rem);
    bottom: 72px;
  }
  body:not(.move) &.mobile&.right {
    animation: ${HeadlineslideIn} 0.5s ease-out;
    animation-fill-mode: both;
    will-change: transform, opacity;
  }
`
const CircleWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  inset: 0;
`

const Circle1 = styled.div<StyledProps>`
  height: 0;
  padding-top: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 12px)" : "calc(166% - 12px)"};
  border: 2px solid #ffffff1a;
  border-radius: 50%;
  width: ${props =>
    props.isMobile === "mobile" ? "calc(280% - 6px)" : "calc(166% - 6px)"};
  right: -76px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  &.desktop {
    animation: ${circleFadeIn} 1s ease-out;
    will-change: transform, opacity;
  }
  &.mobile&.right {
    animation: ${circleFadeIn} 1s ease-out 0.3s;
    animation-fill-mode: both;
    will-change: transform, opacity;
  }
`

interface Section1Props {
  readonly isMobile?: "mobile" | "desktop" | undefined
  index?: number
  hidden?: true | false
  isError: boolean
}

interface EventInterface {
  currentTarget?: HTMLElement
  keyCode?: number
}

const Section1 = ({ isMobile, index, isError }: Section1Props) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const { modalToggle } = useContext(GlobalContext)

  //show error modal message if fetch of API-data fails
  useEffect(() => {
    isError === true ? modalToggle(undefined, "error") : undefined
    //modalToggle(undefined, "error")
  }, [isError])

  const handleEnterKey = (e: EventInterface) => {
    e.currentTarget.click()
  }

  const keyListenersMap = new Map([[13, handleEnterKey]])
  function keyListener(e: EventInterface) {
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode)
    // call the listener if it exists
    return listener && listener(e)
  }

  return (
    <Section
      left
      className={index === 1 ? `${isMobile} right` : `${isMobile} left`}
    >
      {isMobile === "desktop" && (
        <>
          <Navigation
            className={index === 1 ? "desktop right" : "desktop left"}
          >
            <StyledExternalLink
              className={
                index === 1 ? "desktop TMDBlogo right" : "desktop TMDBlogo left"
              }
              href="https://www.themoviedb.org/"
              title="The Movie Database"
            >
              <TMDBlogoVertical width="13" style={{ margin: "8px 0" }} />
            </StyledExternalLink>
            <Vertical
              tabIndex={0}
              onClick={e => modalToggle(e.currentTarget, "about")}
              onKeyPress={e => keyListener(e)}
              className="desktop"
              title={t("MAIN.ABOUT_TITLE")}
            >
              {t("MAIN.ABOUT")}
            </Vertical>
            <Vertical
              tabIndex={0}
              onClick={e => modalToggle(e.currentTarget, "credits")}
              onKeyPress={e => keyListener(e)}
              className="desktop"
              title={t("MAIN.CREDITS_TITLE")}
            >
              {t("MAIN.CREDITS")}
            </Vertical>
          </Navigation>
          <Navigation
            tabIndex={0}
            className="desktopShare"
            onClick={(e: EventInterface) =>
              modalToggle(e.currentTarget, "share")
            }
            onKeyPress={(e: EventInterface) => keyListener(e)}
            title={t("MODAL.SHARE_HEADER")}
          >
            <ShareIcon height="32px" className="ShareIcon" />
          </Navigation>
          <StyledExternalLink
            className="EjaasLogo"
            isMobile={isMobile}
            href={
              language === "da"
                ? "https://larsejaas.com/"
                : "https://larsejaas.com/en/"
            }
            title={t("MAIN.MADE_BY_ALT")}
          >
            <EjaasLogo width="64" />
          </StyledExternalLink>
        </>
      )}
      {isMobile === "mobile" && (
        <>
          <NavTop>
            <StyledExternalLink
              className={
                index === 1 ? "mobile TMDBlogo right" : "mobile TMDBlogo left"
              }
              href="https://www.themoviedb.org/"
              title="The Movie Database"
            >
              <TMDBlogo height="16" />
            </StyledExternalLink>
            <LanguageToggle
              className={index === 1 ? "language right" : "language left"}
            />
            <StyledExternalLink
              className={
                index === 1
                  ? `${isMobile} EjaasLogo right`
                  : `${isMobile} EjaasLogo left`
              }
              isMobile={isMobile}
              href={
                language === "da"
                  ? "https://larsejaas.com/"
                  : "https://larsejaas.com/en/"
              }
              title={t("MAIN.MADE_BY_ALT")}
            >
              <EjaasLogo width="64" />
            </StyledExternalLink>
          </NavTop>
          <Navigation className={index === 1 ? `mobile right` : `mobile left`}>
            <ShareIcon
              title={t("MODAL.SHARE_HEADER")}
              tabIndex={0}
              height="24px"
              className="ShareIcon mobile"
              onClick={(e: EventInterface) =>
                modalToggle(e.currentTarget, "share")
              }
              onKeyPress={(e: EventInterface) => keyListener(e)}
            />
            <Vertical
              tabIndex={0}
              onClick={e => modalToggle(e.currentTarget, "about")}
              onKeyPress={e => keyListener(e)}
              className="mobile"
              title={t("MAIN.ABOUT_TITLE")}
            >
              {t("MAIN.ABOUT")}
            </Vertical>
            <Vertical
              tabIndex={0}
              onClick={e => modalToggle(e.currentTarget, "credits")}
              onKeyPress={e => keyListener(e)}
              className="mobile"
              title={t("MAIN.CREDITS_TITLE")}
            >
              {t("MAIN.CREDITS")}
            </Vertical>
          </Navigation>
        </>
      )}
      <picture
        className={
          index === 1 ? `BruceW ${isMobile} right` : `BruceW ${isMobile} left`
        }
      >
        <source
          type="image/avif"
          srcSet="../286_Bruce_Willis.avif 286w, ../572_Bruce_Willis.avif 572w"
          sizes="(min-width: 572px) 572px, 100vw"
        />
        <source
          type="image/webp"
          srcSet="../286_Bruce_Willis.webp 286w,
../572_Bruce_Willis.webp 572w"
          sizes="(min-width: 572px) 572px, 100vw"
        />
        <img
          sizes="(min-width: 572px) 572px, 100vw"
          loading="eager"
          src="../572_Bruce_Willis.png"
          srcSet="../286_Bruce_Willis.png 286w, ../572_Bruce_Willis.png 572w"
          alt={t("MAIN.PORTRAIT_ALT")}
          style={{ objectFit: "cover", opacity: "1" }}
        />
      </picture>
      <Headline
        className={index === 1 ? `${isMobile} right` : `${isMobile} left`}
        isMobile={isMobile}
      >
        BRUCE
        <br />
        WILLIS
      </Headline>
      <CircleWrapper>
        <Circle1
          isMobile={isMobile}
          className={index === 1 ? `${isMobile} right` : `${isMobile} left`}
        ></Circle1>
      </CircleWrapper>
    </Section>
  )
}

export default Section1
