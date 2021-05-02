import * as React from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "../Data/sourceData"
import styled from "styled-components"
import Backdrop from "./backdrop"
import Profile from "../../images/profile.inline.svg"
import Quote from "../svg/quote.inline.svg"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { getWithExpiry } from "../Data/localStorage"
import {
  IconHeadline,
  ImdbNavigateButton,
  StyledImdbLogo,
  Note,
} from "./movieDetails"
import ExternalLink from "../ExternModal/externalLink"

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

const TmdbImage = styled.div`
  border-radius: 22px;
  position: inline;
  float: right;
  transform: rotate(9deg) translateX(6%);
  width: 32%;
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(39.06% 9.55%, 27.45% 69.09%, 83.52% 76.94%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  margin-left: 2%;
  margin-bottom: 6%;
  padding-top: 32%;
  transform-origin: bottom center;
  overflow: hidden;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
`

const BruceImage = styled.div`
  border-radius: 22px;
  position: inline;
  float: left;
  transform: rotate(-9deg) translate(-24%, 2%);
  width: 32%;
  /* min-width: 100px; */
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(59.86% 7.13%, 0.72% 87.62%, 78.24% 81.26%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 6%);
  margin-right: 8%;
  margin-bottom: 5%;
  padding-top: 45%;
  transform-origin: top right;
  overflow: hidden;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
`

const GitHubImage = styled.div`
  border-radius: 18px;
  position: inline;
  float: left;
  transform: rotate(-9deg) translateX(-24%);
  width: 23%;
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(39.06% 9.55%, 27.45% 69.09%, 83.52% 76.94%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  margin-bottom: 6%;
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

const EjaasImage = styled.div`
  border-radius: 18px;
  position: inline;
  float: right;
  transform: rotate(9deg) translateX(20%);
  width: 23%;
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(39.06% 9.55%, 27.45% 69.09%, 83.52% 76.94%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  margin-left: 2%;
  margin-bottom: 6%;
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

const Header1 = styled.h1`
  text-shadow: 4px 4px 4px var(--border-main);
  color: var(--movie-header1-color);
  margin: 0;
  margin-block-start: 2em;
  margin-block-end: 0;
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
  margin-block-start: 0.8em;
  margin-block-end: 0.5em;
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
  color: var(--movie-paragraph-color);
  line-height: 1.5;
  margin-block: 1em;
  &::first-letter {
    font-family: "Passion One", cursive;
    float: left;
    font-size: 98px;
    line-height: 50px;
    padding-top: 16px;
    padding-right: 8px;
    padding-left: 0px;
    /* margin-left: calc(10px - 4%); */
    text-shadow: 6px 6px 6px var(--border-main);
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
  console.log(id, type)

  const imageId = 395990 //Id is referring to the movie "Death Wish"
  const movieData: Array<object> = getWithExpiry(`movieStorageData-${language}`)

  const movieDetails: InterfaceMovieDetails = !!movieData
    ? movieData.find(findBackgroundImage)
    : null

  function findBackgroundImage(movie: InterfaceMovie) {
    return movie.id === imageId
  }

  console.log(movieDetails.backdrop_path)

  return (
    <>
      {movieData && (
        <StyledBackDrop
          isMobile={isMobile}
          original_title={movieDetails.original_title}
          backdrop_path={movieDetails.backdrop_path}
        />
      )}
      <Header1>{t("CREDITS.HEADLINE")}</Header1>
      <Paragraph>{t("CREDITS.PARAGRAPH1")}</Paragraph>
      <Section>
        <Headline3>{t("CREDITS.CREDITS_HEADLINE")}</Headline3>
        <TmdbImage>
          <ExternalLink
            href="https://www.themoviedb.org/"
            title={t("CREDITS.VISIT_TMDB")}
          >
            <img
              src="../w400tmdb_back.png"
              alt="The Movie Database (TMDB) logo"
            />
          </ExternalLink>
        </TmdbImage>
        <Paragraph>{t("CREDITS.PARAGRAPH1")}</Paragraph>
      </Section>
      <Section>
        <BruceImage>
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
        </BruceImage>
        <Headline3>{t("CREDITS.CREDITS_HEADLINE")}</Headline3>
        <Paragraph>{t("CREDITS.PARAGRAPH1")}</Paragraph>
      </Section>
      <Section>
        <GitHubImage>
          <ExternalLink
            href="https://github.com/LarsEjaas/bruce-willis-app"
            title={t("CREDITS.VISIT_GITHUB")}
          >
            <img src="../Github_logo.svg" alt="Github logo" />
          </ExternalLink>
        </GitHubImage>
        <EjaasImage>
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
        </EjaasImage>
      </Section>
    </>
  )
}

export default CreditsView
