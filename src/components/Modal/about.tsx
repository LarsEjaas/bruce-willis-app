import * as React from "react"
import Skeleton from "react-loading-skeleton"
import { useFetchAbout } from "../Data/sourceData"
import styled from "styled-components"
import Backdrop from "./backdrop"
import Profile from "../../images/profile.inline.svg"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { getWithExpiry } from "../Data/localStorage"
import {
  IconHeadline,
  ImdbNavigateButton,
  StyledImdbLogo,
  Note,
} from "./movieDetails"

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

const BruceImage = styled.div`
  border-radius: 22px;
  position: inline;
  float: left;
  transform: rotate(-9deg) translate(-6%, 12%);
  width: 32%;
  max-width: 200px;
  min-width: 100px;
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(59.86% 7.13%, 0.72% 87.62%, 78.24% 81.26%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  @media (max-width: 599px) {
    margin-bottom: 30px;
    padding-top: 32%;
  }
  @media (max-width: 373px) {
    padding-top: 100px;
  }
  @media (min-width: 600px) {
    margin-right: 40px;
    margin-bottom: 70px;
    padding-top: 48%;
  }
  @media (min-width: 678px) {
    padding-top: 300px;
  }
  transform-origin: center center;
  overflow: hidden;
  & img {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
`

const ProfileFrame = styled.div`
  border-radius: 22px;
  position: inline;
  float: left;
  transform: rotate(-9deg) translate(-6%, 12%);
  width: 32%;
  max-width: 200px;
  min-width: 100px;
  z-index: 1;
  -webkit-filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  filter: drop-shadow(12px 12px 6px var(--image-cover-color));
  shape-outside: polygon(59.86% 7.13%, 0.72% 87.62%, 78.24% 81.26%);
  shape-image-threshold: 0.9;
  shape-margin: calc(30px + 2%);
  @media (max-width: 599px) {
    margin-right: 25px;
    margin-bottom: 30px;
    padding-top: 32%;
  }
  @media (min-width: 600px) {
    margin-right: 40px;
    margin-bottom: 70px;
    padding-top: 48%;
  }
  @media (min-width: 678px) {
    padding-top: 300px;
  }
  transform-origin: center center;
  overflow: hidden;
  background-color: var(--image-cover-color);
  & svg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 1%;
    left: 0%;
    margin: 0;
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

const Div = styled.div`
  display: inline-flex;
  width: 60%;
  justify-content: flex-end;
`

const Born = styled.h2`
  font-family: "Passion One", cursive;
  font-weight: 400;
  line-height: 0.8;
  margin-bottom: 0.2em;
  margin-block-start: 0;
  margin-inline-end: 0;
  padding: 4px 8px;
  color: var(--border-main);
  font-size: clamp(1.5rem, 1.0273rem + 2.3636vw, 2.8rem);
  background-color: var(--movie-header1-color);
  box-shadow: 6px 6px 16px var(--border-main);
  border-radius: 0.3em;
  transform: rotate(-4deg);
`

const Paragraph = styled.p`
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
  font-size: 16px;
  margin-block: 1em;
`

//Bruce Willis has id: 62
const id = 62
const type = "person"

interface AboutViewProps {
  isMobile: "desktop" | "mobile" | undefined
  language: string
}

const AboutView = ({ isMobile, language }: AboutViewProps) => {
  const { t } = useTranslation()

  const [data, isLoading] = getWithExpiry(`movieAbout-${language}`)
    ? [getWithExpiry(`movieAbout-${language}`), false]
    : useFetchAbout({
        type,
        id,
        language,
      })

  const imageId = 641790 //Id is referring to the movie "trauma center"
  const movieData: Array<object> = getWithExpiry(`movieStorageData-${language}`)

  const movieDetails: InterfaceMovieDetails = !!movieData
    ? movieData.find(findBackgroundimage)
    : null

  function findBackgroundimage(movie: InterfaceMovie) {
    return movie.id === imageId
  }

  let biographyText =
    data !== null ? data.biography.match(/[^\s.!?]+[^.!?\r\n]+[.!?]*/g) : null
  const birthday = !!data ? new Date(data.birthday) : null
  const localeBirthday = !!data ? birthday.toLocaleDateString(language) : null
  const birthdayString = !!data ? `${t("BORN")} ${localeBirthday}` : null

  biographyText = biographyText !== null ? biographyText.join("\n") : null

  return (
    <>
      {movieData && (
        <StyledBackDrop
          isMobile={isMobile}
          original_title={movieDetails.original_title}
          backdrop_path={movieDetails.backdrop_path}
        />
      )}
      {isLoading ? (
        <ProfileFrame>
          <Skeleton
            width={"100%"}
            height={"100%"}
            style={{
              position: "absolute",
              top: "0",
            }}
          />
          <Profile />
        </ProfileFrame>
      ) : (
        <BruceImage>
          <picture>
            <source
              media="(max-width: 599px)"
              srcSet={`https://www.themoviedb.org/t/p/w180_and_h180_face${data.profile_path}`}
            />
            <source
              media="(min-width: 600px)"
              srcSet={`https://www.themoviedb.org/t/p/w300_and_h450_face${data.profile_path}`}
            />
            <img
              src={`https://www.themoviedb.org/t/p/w300_and_h450_face${data.profile_path}`}
              alt={`${t("MOVIEDETAILS.ALSO_STARRING_ALT")}${data.name}`}
            />
          </picture>
        </BruceImage>
      )}
      {isLoading ? (
        <Skeleton
          style={{
            fontSize: "clamp(1.7rem, -0.1105rem + 9.0526vw, 6rem)",
            margin: "2em 5% 0 15%",
          }}
          width={"40%"}
        />
      ) : (
        <Header1>{data.name}</Header1>
      )}
      {isLoading ? (
        <Skeleton
          width={"28.3%"}
          style={{
            margin: "0 0.2em 0 30%",
            fontSize: "clamp(1.5rem, 1.0273rem + 2.3636vw, 2.8rem)",
            transform: "rotate(-4deg)",
          }}
        />
      ) : (
        !!birthdayString && (
          <Div>
            <Born>{birthdayString}</Born>
          </Div>
        )
      )}
      {isLoading ? (
        <Skeleton style={{ fontSize: 16, marginBlock: "0.2em" }} count={10} />
      ) : (
        <>
          <Paragraph>{biographyText}</Paragraph>
          <IconHeadline fullWidth isMobile={isMobile}>
            <span>
              <p>
                {t("MOVIEDETAILS.READ_MORE_ABOUT")}
                <b>{data.name}</b>
                {`${t("MOVIEDETAILS.AT")}IMDb`}
              </p>
              <ImdbNavigateButton
                tabIndex={0}
                href={`https://www.imdb.com/name/${data.imdb_id}/bio`}
                title={`${t("MOVIEDETAILS.READ_ABOUT")}${data.name}${t(
                  "MOVIEDETAILS.AT"
                )}IMDb`}
              >
                <StyledImdbLogo />
              </ImdbNavigateButton>
            </span>
            {language === "da" && (
              <Note>{t("MOVIEDETAILS.IMDB_ONLY_IN_ENGLISH")}</Note>
            )}
            <Note>&nbsp;</Note>
            <Note>&nbsp;</Note>
          </IconHeadline>
        </>
      )}
    </>
  )
}

export default AboutView
