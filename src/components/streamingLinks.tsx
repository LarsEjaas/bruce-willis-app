import * as React from "react"
import styled from "styled-components"
import Television from "../images/television.inline.svg"
import { IconHeadline, Headline3, StyledTmdbLogo } from "./movieDetails"
import ExternalLink, { NavigateButton } from "./externalLink"
import { useTranslation } from "gatsby-plugin-react-i18next"

const StreamName = styled.p `
white-space: break-spaces;
    color: var(--movie-paragraph-color);
    text-shadow: 6px 6px 6px var(--border-main),
      -6px -6px 6px var(--border-main);
    position: inline;
    line-height: 1.5;
    font-size: 16px;
    margin: auto 0 auto 3em;
    margin-left: 3em;
    flex-basis: 250px !important;
`

const StreamLogo = styled.img `
border-radius: 14px;
width: 50px;
height: 50px;
margin: 0.5em 0;
`

const HorizontalRule = styled.hr`
    margin-left: 3em;
    width: calc(100% - 6em);
    @media (max-width: 455px) {
      width: unset;
      max-width: 300px;
    }
    margin-bottom: 2em;
`

const StyledExternalLink = styled(ExternalLink)`
margin: auto;
`

const CenteredText = styled.p`
    line-height: 1;
    margin-block-start: auto;
    margin-block-end: auto;
`

interface StreamLinksProps {
  movieDetailedData: object | null
  language: string
  languageCode: "DK" | "US"
  movieDetails: object | null
  movieYear: string | null
}

const StreamLinks = ({movieDetailedData, language, languageCode,movieYear, movieDetails}: StreamLinksProps) => {

const { t } = useTranslation()

const buyLinks =
    movieDetailedData !== null?
    (movieDetailedData.["watch/providers"].results.[languageCode] !== undefined
      ? movieDetailedData.["watch/providers"].results.[languageCode].buy : null)
      : null

      console.log(buyLinks, movieDetailedData !== null? movieDetailedData.["watch/providers"]:null, movieDetailedData !== null? movieDetailedData.["watch/providers"].results.[languageCode] : null)

const buyList = buyLinks !== null? buyLinks.map(link =>
  <span><StreamName><b>{link.provider_name}</b></StreamName><StreamLogo src={`https://www.themoviedb.org/t/p/original${link.logo_path}`} alt={`${link.provider_name} logo`}/></span>)
    : null

  console.log(buyList);

  const streamLink =
  movieDetailedData !== null
      ? (movieDetailedData.["watch/providers"].results.[languageCode] !== undefined? movieDetailedData.["watch/providers"].results.[languageCode].link: null)
      : null

    console.log(streamLink)

    console.log(movieDetailedData !== null
    ? buyLinks: null, movieDetailedData !== null
    ? streamLink: null,  movieDetailedData !== null
    ? movieDetailedData : null)

    // const justWatchLink = `https://www.justwatch.com/${languageCode}/movie/${addHyphen(movieDetails.title)}`

      return (
        <>
        {buyList && (
          <IconHeadline fullWidth>
            <span>
              <Television style={{ top: "0" }} />
              <Headline3>{t("MOVIEDETAILS.BUY_OR_STREAM")}</Headline3>
            </span>
            <CenteredText>Du kan i øjeblikket leje eler købe titlen med danske undertekster her:</CenteredText>
            {buyList}
            <HorizontalRule/>
            <span>
              <CenteredText>Besøg TMDB for direkte links til køb og leje af denne titel:</CenteredText>
              <StyledExternalLink tabIndex="-1" href={streamLink} title={`Go to TMDb.com to get streaming links for ${movieDetails.title}`}><NavigateButton><StyledTmdbLogo /></NavigateButton></StyledExternalLink>
            </span>
          </IconHeadline>
        )}
        </>
      )

}

export default StreamLinks