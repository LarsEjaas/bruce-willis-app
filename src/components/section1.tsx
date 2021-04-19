import * as React from "react"
import { useContext } from "react"
import styled, { keyframes } from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import EjaasLogo from "../svg/ejaas_logo.inline.svg"
import TMDBlogoVertical from "../svg/tmdb_logo_upright.inline.svg"
import TMDBlogo from "../svg/tmdb_logo.inline.svg"
import ShareIcon from "../svg/share-alt.inline.svg"
import ExternalLink from "./externalLink"
import { GlobalContext } from "./layout"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import LanguageToggle from "./languageToggle"

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
  color: var(--primary-font);
  transform: translateX(-120px);
}
to {
  opacity: 1;
  color: var(--primary-font-focused);
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

interface SectionProps {
  readonly left?: boolean
  readonly isMobile?: "mobile" | "desktop" | undefined
}

const Section = styled.section<SectionProps>`
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
  .BruceW.mobile {
    top: 0;
    bottom: 0;
    right: 0;
    width: 90vw;
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
  SVG {
    transition: all 0.2s ease-in-out;
  }
  SVG path {
    fill: var(--icon-color1);
  }
  SVG:hover path {
    fill: var(--icon-hover-color1);
  }
  SVG:hover {
    transform: scale(1.2);
  }
`
interface ExternalLinkProps {
  readonly isMobile: "mobile" | "desktop" | undefined
}

const NavTop = styled.div`
  display: flex;
  justify-content: space-between;
`

const StyledExternalLink = styled(ExternalLink)<ExternalLinkProps>`
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
  }
  &.mobile&.EjaasLogo&.right {
    animation: ${slideDown} 1s ease-out 0.4s;
    animation-fill-mode: both;
  }
  &.mobile&.TMDBlogo {
    z-index: 3;
    position: relative;
    padding: 32px 8px 32px 16px;
  }
  &.mobile&.TMDBlogo&.right {
    animation: ${slideIn} 1s ease-out 0.6s;
    animation-fill-mode: both;
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
  }
  &.mobile.right {
    animation: ${HeadlineslideIn} 0.7s ease-out 0.5s;
    animation-fill-mode: both;
    padding: 16px;
    bottom: 13px;
    left: 6vw;
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

const Headline = styled.h1`
  position: absolute;
  text-shadow: var(--text-shadow-primary);
  z-index: 3;
  will-change: opacity;
  &.desktop {
    left: -48px;
    @media (max-width: 1200px) {
      left: calc((1280px - 100vw) * 0.08);
    }
    bottom: 24px;
    font-size: clamp(3.5rem, -0.7857rem + 11.4286vw, 8rem);
    animation: ${HeadlineslideIn} 1.5s ease-out;
    animation-fill-mode: both;
  }
  &.mobile {
    left: 10%;
    font-size: clamp(5.5rem, 4.4655rem + 4.5977vw, 8rem);
    bottom: 72px;
  }
  &.mobile&.right {
    animation: ${HeadlineslideIn} 1s ease-out 0.7s;
    animation-fill-mode: both;
  }
`
const CircleWrapper = styled.div`
  overflow: hidden;
  position: absolute;
  inset: 0;
`

interface Circle1Props {
  readonly isMobile: "mobile" | "desktop" | undefined
}

const Circle1 = styled.div<Circle1Props>`
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
  }
  &.mobile&.right {
    animation: ${circleFadeIn} 1s ease-out 0.3s;
    animation-fill-mode: both;
  }
`

interface Section1Props {
  readonly isMobile?: "mobile" | "desktop" | undefined
  index: 1 | 2
  hidden: true | false
  className: string
}

const Section1 = ({ isMobile, index, location }: Section1Props) => {
  const { t } = useTranslation()
  const { language } = useI18next()
  const { modalToggle } = useContext(GlobalContext)

  const handleEnterKey = e => {
    console.log(e.currentTarget)
    e.currentTarget.click()
  }

  const keyListenersMap = new Map([[13, handleEnterKey]])
  function keyListener(e) {
    console.log(e, e.keyCode)
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
              tabIndex="0"
              onClick={e => modalToggle(e.currentTarget, "about")}
              onKeyPress={e => keyListener(e)}
              className="desktop"
            >
              {t("MAIN.ABOUT")}
            </Vertical>
            <Vertical
              tabindex="0"
              onClick={e => modalToggle(e.currentTarget, "credits")}
              onKeyPress={e => keyListener(e)}
              className="desktop"
            >
              {t("MAIN.CREDITS")}
            </Vertical>
          </Navigation>
          <Navigation className="desktopShare">
            <ShareIcon
              tabindex="0"
              height="32px"
              className="ShareIcon"
              onClick={e => modalToggle(e.currentTarget, "share")}
              onKeyPress={e => keyListener(e)}
            />
          </Navigation>
          <StyledExternalLink
            className="EjaasLogo"
            isMobile={isMobile}
            href="https://larsejaas.com/"
            title="Made by Lars Ejaas"
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
              location={location}
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
              title="Made by Lars Ejaas"
            >
              <EjaasLogo width="64" />
            </StyledExternalLink>
          </NavTop>
          <Navigation className={index === 1 ? `mobile right` : `mobile left`}>
            <ShareIcon
              tabindex="0"
              height="24px"
              className="ShareIcon mobile"
              onClick={e => modalToggle(e.currentTarget, "share")}
              onKeyPress={e => keyListener(e)}
            />
            <Vertical
              tabIndex="0"
              onClick={e => modalToggle(e.currentTarget, "about")}
              onKeyPress={e => keyListener(e)}
              className="mobile"
            >
              {t("MAIN.ABOUT")}
            </Vertical>
            <Vertical
              tabIndex="0"
              onClick={e => modalToggle(e.currentTarget, "credits")}
              onKeyPress={e => keyListener(e)}
              className="mobile"
            >
              {t("MAIN.CREDITS")}
            </Vertical>
          </Navigation>
        </>
      )}
      <StaticImage
        className={
          index === 1 ? `BruceW ${isMobile} right` : `BruceW ${isMobile} left`
        }
        src="../images/Bruce_Willis.png"
        alt="portrait of Bruce Willis"
        loading="eager"
        placeholder="none"
        layout="constrained"
        formats={["auto", "webp", "avif"]}
        width={572}
      />
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