import * as React from "react"
import styled from "styled-components"
import Television from "../images/television.inline.svg"
import TmdbLogo from "../images/tmdb.inline.svg"
import { IconHeadline, Headline3, StyledTmdbLogo } from "./movieDetails"
import ExternalLink, { NavigateButton } from "./externalLink"
import { useTranslation } from "gatsby-plugin-react-i18next"

const addHyphen = (title: string) => {
  title = title.replace(" ", "-");
  return title
}

const domainLanguage = (language:string) => {
  language = language === "da"? "dk" : "us"
  return language
}

const MatchStreamProvider = (provider_name:string, language: string, title: string, year: string, languageCode:string) => {
  if (provider_name === "Google Play Movies") return `xxx`;
  else if (provider_name === "Viaplay") return `https://viaplay.${domainLanguage(language)}/store/${addHyphen(title)}-${year}`;
  else if (provider_name === "Rakuten TV") return `https://rakuten.tv/movies/${addHyphen(title)}&uct_country=${languageCode}`;
  else if (provider_name === "Microsoft Store") return `https://www.microsoft.com/${language}-${domainLanguage(language)}/p/${addHyphen(title)}/8d6kgwxn6qfn?activetab=pivot:overviewtab`;
  else if (provider_name === "Apple Itunes") return `https://tv.apple.com/${language}/movie/ID`;
  else return null
}

const StreamName = styled.p `
white-space: break-spaces;
    color: var(--movie-paragraph-color);
    text-shadow: 6px 6px 6px var(--border-main),
      -6px -6px 6px var(--border-main);
    position: inline;
    line-height: 1.5;
    font-size: 16px;
    margin: auto 0 auto 3em;
    margin-block-start: auto !important;
    margin-block-end: auto !important;
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
margin: 0 auto;
`

interface StreamLinksProps {
  movieDetailedData: object | null
  language: "da" | "en"
  languageCode: "DK" | "US"
  movieDetails: object | null
  movieYear: string | null
}

const StreamLinks = ({movieDetailedData, language, languageCode,movieYear, movieDetails}: StreamLinksProps) => {

const { t } = useTranslation()

const buyLinks =
    movieDetailedData !== null?
    (movieDetailedData.data.["watch/providers"].results.[languageCode] !== undefined
      ? movieDetailedData.data.["watch/providers"].results.[languageCode].buy : null)
      : null

      console.log(buyLinks, movieDetailedData !== null? movieDetailedData.data.["watch/providers"]:null, movieDetailedData !== null? movieDetailedData.data.["watch/providers"].results.[languageCode] : null)

const buyList = buyLinks !== null? buyLinks.map(link =>
  <span><StreamName><b>{link.provider_name}</b></StreamName><StreamLogo src={`https://www.themoviedb.org/t/p/original${link.logo_path}`} alt={`${link.provider_name} logo`}/></span>)
    : null

  console.log(buyList);

  const streamLink =
  movieDetailedData !== null
      ? (movieDetailedData.data.["watch/providers"].results.[languageCode] !== undefined? movieDetailedData.data.["watch/providers"].results.[languageCode].link: null)
      : null

    console.log(streamLink)

    console.log(movieDetailedData !== null
    ? buyLinks: null, movieDetailedData !== null
    ? streamLink: null,  movieDetailedData !== null
    ? movieDetailedData.data : null)

    const justWatchLink = `https://www.justwatch.com/${languageCode}/movie/${addHyphen(movieDetails.title)}`

      return (
        <>
        {buyList && (
          <IconHeadline fullWidth>
            <span>
              <Television style={{ top: "0" }} />
              <Headline3>{t("MOVIEDETAILS.BUY_OR_STREAM")}</Headline3>
            </span>
            <p>Du kan i øjeblikket leje eler købe titlen med danske undertekster her:</p>
            {buyList}
            <HorizontalRule/>
            <span>
              <p>Besøg TMDB for direkte links til køb og leje af denne titel:</p>
              <StyledExternalLink href={streamLink} title={`Go to TMDb.com to get streaming links for ${movieDetails.title}`}><NavigateButton><StyledTmdbLogo /></NavigateButton></StyledExternalLink>
            </span>
          </IconHeadline>
        )}
        </>
      )

}

export default StreamLinks