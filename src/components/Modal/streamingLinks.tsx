import * as React from "react"
import Skeleton from "react-loading-skeleton"
import styled from "styled-components"
import Television from "../../images/television.inline.svg"
import {
  IconHeadline,
  Headline3,
  StyledTmdbLogo,
  LinkButton,
} from "./movieDetails"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { InterfaceMovieDetails } from "./movieDetails"
import { CastListDataInterface } from "./castList"

const StreamName = styled.p`
  white-space: break-spaces;
  color: var(--movie-paragraph-color);
  text-shadow: 6px 6px 6px var(--border-main), -6px -6px 6px var(--border-main);
  position: inline;
  line-height: 1.5;
  font-size: 16px;
  margin: auto 0 auto 3em;
  margin-left: 3em;
  flex-basis: 250px !important;
`

const StreamLogo = styled.img`
  border-radius: 14px;
  width: 50px;
  height: 50px;
  margin: 0.5em 0;
`

interface HorizontalRuleProps {
  readonly isMobile: "mobile" | "desktop" | undefined
}

const HorizontalRule = styled.hr<HorizontalRuleProps>`
  margin-left: ${props => (props.isMobile === "mobile" ? "1em" : "3em")};
  width: calc(100% - 6em);
  @media (max-width: 455px) {
    width: unset;
    max-width: 300px;
  }
  margin-bottom: 2em;
`

const SpacedText = styled.p`
  padding-bottom: 2em;
`

enum LanguageCodeEnum {
  DK = "DK",
  US = "US",
}

interface resultsByLanguageInterface {
  readonly buy?: buyInterface
  readonly link?: string
  length?: number
}

interface buyArrayInterface {
  readonly logo_path?: string
  readonly provider_name?: string
}

interface buyInterface {
  readonly [index: number]: buyArrayInterface
  readonly map?: Function
}

export interface InterfaceMovieDetailedDataWatchP {
  readonly [index: string]: {
    readonly [results: string]: {
      [key in LanguageCodeEnum]: resultsByLanguageInterface
    }
  }
}

export interface InterfaceMovieDetailedDataCredits {
  readonly credits: { cast: CastListDataInterface }
}

interface StreamLinksProps {
  readonly movieDetailedData:
    | InterfaceMovieDetailedDataWatchP
    | InterfaceMovieDetailedDataCredits
  readonly languageCode: "DK" | "US"
  readonly movieDetails: InterfaceMovieDetails
  readonly isMobile: "mobile" | "desktop" | undefined
  readonly isLoading: boolean
}

const StreamLinks = ({
  movieDetailedData,
  languageCode,
  movieDetails,
  isMobile,
  isLoading,
}: StreamLinksProps) => {
  const { t } = useTranslation()

  const buyLinks = !!movieDetailedData
    ? !!movieDetailedData["watch/providers"]?.results[languageCode]
      ? movieDetailedData["watch/providers"]?.results[languageCode].buy
      : null
    : null

  const buyList: JSX.Element[] = !!buyLinks
    ? buyLinks.map((link: { provider_name: string; logo_path: string }) => (
        <span>
          <StreamName>
            <b>{link.provider_name}</b>
          </StreamName>
          <StreamLogo
            src={`https://www.themoviedb.org/t/p/original${link.logo_path}`}
            alt={`${link.provider_name} logo`}
          />
        </span>
      ))
    : null

  const streamLink = !!movieDetailedData
    ? !!movieDetailedData["watch/providers"]?.results[languageCode]
      ? movieDetailedData["watch/providers"].results[languageCode].link
      : null
    : null

  return (
    <>
      {isLoading ? (
        <IconHeadline fullWidth isMobile={isMobile}>
          <span>
            <Television style={{ top: "0" }} />
            <Headline3>{t("MOVIEDETAILS.BUY_OR_STREAM")}</Headline3>
          </span>
          {Array(...Array(4)).map(() => (
            <Skeleton
              style={{
                fontSize: "1em",
                width: "80%",
                lineHeight: "1",
                marginBlock: "0.7em",
                marginLeft: "3em",
              }}
            />
          ))}
          <HorizontalRule isMobile={isMobile} />
          <Skeleton
            style={{
              fontSize: "1em",
              width: "80%",
              lineHeight: "1",
              marginBlock: "0.7em",
              marginLeft: "3em",
            }}
          />
        </IconHeadline>
      ) : (
        !!buyList && (
          <IconHeadline fullWidth isMobile={isMobile}>
            <span>
              <Television style={{ top: "0" }} />
              <Headline3>{t("MOVIEDETAILS.BUY_OR_STREAM")}</Headline3>
            </span>
            <SpacedText>{t("MOVIEDETAILS.RENT_HERE")}</SpacedText>
            {buyList}
            <HorizontalRule isMobile={isMobile} />
            <span>
              <p>{t("MOVIEDETAILS.VISIT_TMDB")}</p>
              <LinkButton
                tabIndex={0}
                href={streamLink}
                title={`${t("MOVIEDETAILS.TMDB_STRAMING_BUTTON")}${
                  movieDetails.title
                }`}
              >
                <StyledTmdbLogo />
              </LinkButton>
            </span>
          </IconHeadline>
        )
      )}
    </>
  )
}

export default StreamLinks
