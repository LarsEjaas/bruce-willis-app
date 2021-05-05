import * as React from "react"
import styled from "styled-components"
import Backdrop from "./backdrop"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { getWithExpiry } from "../Data/localStorage"
import ExternalLink from "../ExternModal/externalLink"
import Quote from "../../svg/quote.inline.svg"

const StyledBackDrop = styled(Backdrop)`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.7;
  mask-image: linear-gradient(to top, transparent 12%, black 100%);
  -webkit-mask-image: linear-gradient(to top, transparent 12%, black 100%);
  & img {
    width: 100%;
  }
`

interface PropsInterface {
  readonly isMobile: "desktop" | "mobile" | undefined
}

const BruceImage = styled.div<PropsInterface>`
  height: 0;
  float: left;
  transform: rotate(-9deg) translate(-24%, -2%);
  width: ${props => (props.isMobile === "mobile" ? "32%" : "22%")};
  padding-top: ${props => (props.isMobile === "mobile" ? "45%" : "31%")};
  margin-bottom: ${props =>
    props.isMobile === "mobile" ? "calc(130px - 15%)" : "72px"};
  margin-right: ${props => (props.isMobile === "mobile" ? "7%" : "3%")};
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(46.12% 3.09%, 5.06% 112.03%, 66.22% 100.06%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 6%);

  transform-origin: top right;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    border-radius: 22px;
  }
`
const BruceImageDescription = styled.div`
  background: linear-gradient(
    180deg,
    var(--primary-font) 0%,
    var(--primary-font-focused) 100%
  );
  border-radius: 16px;
  transform: rotate(6deg);
  width: 110%;
  z-index: 2;
  margin-left: -5%;
  padding: 12px;
  transform-origin: top right;
  position: relative;
  & a.descUrl {
    display: block;
    position: relative;
    color: var(--border-main);
    line-height: 1;
    max-width: 100%;
  }
  & a.descUrl:hover,
  a.descUrl:active {
    color: var(--movie-header1-color);
  }
  & a.descUrl:focus-visible {
    outline-offset: 0;
  }
`

const GitHubImage = styled.div<PropsInterface>`
  border-radius: 18px;
  position: inline;
  float: left;
  transform: rotate(-9deg) translate(-24%, -60%);
  width: 23%;
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(39.06% 9.55%, 27.45% 69.09%, 83.52% 76.94%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  margin-bottom: -8%;
  margin-top: ${props => (props.isMobile === "mobile" ? "unset" : "5%")};
  padding-top: 23%;
  background-image: linear-gradient(160deg, #dae1ec 0%, #8193b2 100%);
  transform-origin: top right;
  overflow: hidden;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    padding: 10%;
  }
`

const RightImage = styled.div`
  border-radius: 18px;
  position: inline;
  float: right;
  transform: rotate(9deg) translateX(20%);
  width: 23%;
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(62.89% 8.13%, 52.95% 75.87%, 83.52% 76.94%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  margin-left: 3%;
  margin-bottom: 6%;
  margin-top: 10px;
  padding-top: 23%;
  transform-origin: bottom center;
  overflow: hidden;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
`

const Header2 = styled.h2`
  text-shadow: 4px 4px 4px var(--border-main);
  color: var(--movie-header1-color);
  margin: 0;
  margin-block-start: 2em;
  margin-block-end: 0.6em;
  text-align: center;
  position: relative;
  z-index: 2;
  font-size: clamp(1.7rem, -0.1105rem + 9.0526vw, 6rem);
`

const Headline3 = styled.h3`
  font-family: "Passion One", cursive;
  font-weight: 400;
  font-size: clamp(1.8rem, 0.8737rem + 4.6316vw, 4rem);
  margin: 0;
  margin-block-start: 0.4em;
  margin-block-end: 0.2em;
  line-height: 1;
  color: var(--movie-paragraph-color);
  text-shadow: 4px 4px 4px var(--border-main);
`

const Section = styled.div`
  display: block;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  line-height: 1.5;
  margin: 0 auto;
  & h3 {
    text-align: center;
  }
  & div a {
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    border-radius: 18px;
    z-index: 2;
  }
  & div a:focus-visible {
    outline: 5px auto Highlight;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -10px;
  }
  & div a:focus-visible img {
    filter: brightness(130%) saturate(30%);
  }
  & img {
    z-index: -1;
  }
`

const Paragraph = styled.p`
  font-size: 16px;
  color: var(--movie-paragraph-color);
  line-height: 1.5;
  margin-block: 1em;
  white-space: break-spaces;
  display: inline;
`

const ParagraphWithInitial = styled(Paragraph)`
  margin-block: 0.5em;
  display: block;
  &::first-letter {
    font-family: "Passion One", cursive;
    float: left;
    font-size: 98px;
    line-height: 50px;
    padding-top: 16px;
    padding-right: 8px;
    padding-left: 0px;
    text-shadow: 6px 6px 6px var(--border-main);
  }
`
const Copyright = styled(Paragraph)<PropsInterface>`
  font-family: "Passion One", cursive;
  font-weight: 400;
  font-size: clamp(1rem, 0.6364rem + 1.8182vw, 2rem);
  display: block;
  width: fit-content;
  margin-block: ${props =>
    props.isMobile === "mobile" ? "1em 0.5em" : "3em 0"};
  margin-left: 50%;
  transform: translateX(-50%);
`

const Citation = styled.cite`
  font-family: "Passion One", cursive;
  font-weight: 400;
  font-size: clamp(1rem, 0.6364rem + 1.8182vw, 2rem);
  margin: 0;
  margin-block-start: 0.5em;
  margin-inline-end: 0;
  line-height: 1;
  color: var(--movie-paragraph-color);
  text-shadow: 4px 4px 4px var(--border-main);
  font-style: italic;
  letter-spacing: 1px;
  position: relative;
`
const QuoteContainer = styled.div<PropsInterface>`
  margin: ${props => (props.isMobile === "mobile" ? "2em 1em" : "2em 3em")};
`
const StyledQuote = styled(Quote)`
  filter: drop-shadow(6px 6px 6px var(--border-main));
  & path {
    fill: var(--movie-paragraph-color);
  }
`
const StyledQuoteEnd = styled(StyledQuote)`
  transform: translateY(20px);
  margin-top: -20px;
`

const UrlExternalLink = styled(ExternalLink)`
  color: var(--primary-font-focused);
  font-family: "Passion One", cursive;
  font-size: 18px;
  font-weight: 400;
  display: inline;
  transition: color 0.3s ease-in-out;
  text-shadow: none;
  cursor: pointer;
  &:hover,
  &:active {
    color: var(--movie-header1-color);
  }
`

//Bruce Willis has id: 62
const id = 62
const type = "person"

interface AboutViewProps {
  isMobile: "desktop" | "mobile" | undefined
  language: string
}

const CreditsView = ({ isMobile, language }: AboutViewProps) => {
  const { t } = useTranslation()

  const imageId = 395990 //Id is referring to the movie "Death Wish"
  const movieData: Array<object> = getWithExpiry(`movieStorageData-${language}`)

  const movieDetails: InterfaceMovieDetails = !!movieData
    ? movieData.find(findBackgroundImage)
    : null

  function findBackgroundImage(movie: InterfaceMovie) {
    return movie.id === imageId
  }

  return (
    <>
      {movieData && (
        <StyledBackDrop
          isMobile={isMobile}
          original_title={movieDetails.original_title}
          backdrop_path={movieDetails.backdrop_path}
        />
      )}
      <Header2>{t("CREDITS.HEADLINE")}</Header2>
      <ParagraphWithInitial>{t("CREDITS.PARAGRAPH1")}</ParagraphWithInitial>
      <QuoteContainer isMobile={isMobile}>
        <StyledQuote />
        <Citation>{t("CREDITS.CITATION")}</Citation>
        <StyledQuoteEnd />
      </QuoteContainer>
      <Paragraph>{t("CREDITS.PARAGRAPH2")}</Paragraph>
      <Section>
        <Headline3>{t("CREDITS.CREDITS_HEADLINE")}</Headline3>
        <BruceImage isMobile={isMobile}>
          <ExternalLink
            href="http://www.gageskidmore.com/"
            title={t("CREDITS.VISIT_GAGE_SKIDMORE")}
          >
            <picture>
              <source
                media="(max-width: 599px)"
                srcSet={`../w180_Bruce_Willis_by_Gage_Skidmore.jpg`}
              />
              <source
                media="(min-width: 600px)"
                srcSet={`../w300_Bruce_Willis_by_Gage_Skidmore.jpg`}
              />
              <img
                src={`../w300_Bruce_Willis_by_Gage_Skidmore.jpg`}
                alt={t("CREDITS.GAGE_SKIDMORE_PROFILE_ALT")}
              />
            </picture>
          </ExternalLink>
          <BruceImageDescription>
            <UrlExternalLink
              className="descUrl"
              title={`${t("CREDITS.ABOUT_THIS_IMAGE")}Wikimedia Commons`}
              href="https://commons.wikimedia.org/w/index.php?curid=71131203"
            >
              By Gage Skidmore, CC BY-SA 3.0
            </UrlExternalLink>
          </BruceImageDescription>
        </BruceImage>
        <Paragraph>{t("CREDITS.PARAGRAPH3")}</Paragraph>
        <UrlExternalLink
          href="https://www.themoviedb.org/"
          title="The Movie Database (TMDB)"
        >
          www.themoviedb.org
        </UrlExternalLink>
        <RightImage>
          <ExternalLink
            href="https://www.themoviedb.org/"
            title={t("CREDITS.VISIT_TMDB")}
          >
            <img
              src="../w400tmdb_back.png"
              alt="The Movie Database (TMDB) logo"
            />
          </ExternalLink>
        </RightImage>
        <Paragraph>{t("CREDITS.PARAGRAPH4")}</Paragraph>
        <UrlExternalLink
          href="http://www.gageskidmore.com"
          title={t("CREDITS.VISIT_GAGE_SKIDMORE")}
        >
          www.gageskidmore.com
        </UrlExternalLink>
        <Paragraph>{t("CREDITS.PARAGRAPH5")}</Paragraph>
        <UrlExternalLink
          href="https://www.gofundme.com/f/vs2kw-lost-photography-gigs-to-coronavirus-cancellations?utm_campaign=p_cp_url&utm_medium=os&utm_source=customer"
          title={t("CREDITS.DONATE_TO_GAGE_SKIDMORE")}
        >
          gofundme donation
        </UrlExternalLink>
        <Paragraph>{t("CREDITS.PARAGRAPH6")}</Paragraph>
        <UrlExternalLink
          href="https://github.com/LarsEjaas/bruce-willis-app"
          title={t("CREDITS.VISIT_GITHUB")}
        >
          GitHub
        </UrlExternalLink>
        <Paragraph>{t("CREDITS.PARAGRAPH7")}</Paragraph>
        <RightImage>
          <ExternalLink
            href={
              language === "da"
                ? "https://larsejaas.com/"
                : "https://larsejaas.com/en/"
            }
            title={t("CREDITS.VISIT_MY_WEBPAGE")}
          >
            <img src="../w400ejaas_logo.png" alt="Ejaas logo" />
          </ExternalLink>
        </RightImage>
        <Copyright isMobile={isMobile}>© Lars Ejaas 2021</Copyright>
        <GitHubImage isMobile={isMobile}>
          <ExternalLink
            href="https://github.com/LarsEjaas/bruce-willis-app"
            title={t("CREDITS.VISIT_GITHUB")}
          >
            <img src="../Github_logo.svg" alt="Github logo" />
          </ExternalLink>
        </GitHubImage>
      </Section>
    </>
  )
}

export default CreditsView
