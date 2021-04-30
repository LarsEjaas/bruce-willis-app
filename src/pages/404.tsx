import * as React from "react"
import { DeviceDetectHook } from "../components/Hooks/deviceDetect"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import styled from "styled-components"
import SEO from "../components/seo"
import { useTranslation, useI18next } from "gatsby-plugin-react-i18next"
import { Link } from "gatsby"

interface Main404Props {
  readonly isMobile: "mobile" | "desktop" | undefined
}

const Main404 = styled.div<Main404Props>`
  position: relative;
  background: var(--background1);
  border-radius: ${props => (props.isMobile === "mobile" ? "0" : "40px")};
  height: ${props => (props.isMobile === "mobile" ? "100%" : "unset")};
  grid-column: ${props => (props.isMobile === "mobile" ? "1/2" : "1/3")};
`

const Headline404 = styled.h1`
  position: relative;
  text-shadow: var(--text-shadow-primary);
  font-size: clamp(3.5rem, -0.7857rem + 11.4286vw, 8rem);
  width: fit-content;
  margin: 0 auto;
  margin-block: 0.5em 0.2em;
  color: var(--primary-font-focused);
`

const HeadlineRocks = styled.h2`
  font-size: clamp(1.6rem, 0.8rem + 4vw, 3.5rem);
  color: var(--movie-header1-color);
  text-shadow: 4px 4px 4px var(--border-main);
  width: fit-content;
  margin: 0 auto;
  margin-block: -0.5em 0;
  text-align: right;
  transform: translateX(75%) rotate(-9deg);
`

const Img = styled.img<Main404Props>`
  display: block;
  width: ${props => (props.isMobile === "mobile" ? "80%" : "40%")};
  margin: 0 auto;
  max-width: 400px;
`

const Paragraph = styled.p`
  text-align: center;
  margin: 0.5em 2em;
  font-family: "Passion One", cursive;
  font-size: 20px;
  font-weight: 400;
  color: var(--movie-paragraph-color);
`

const Url = styled(Link)`
  color: var(--primary-font-focused);
  text-align: center;
  margin: 0 auto;
  font-family: "Passion One", cursive;
  font-size: 22px;
  font-weight: 400;
  display: block;
  transition: color 0.3s ease-in-out;
  &:hover,
  &:active {
    color: var(--movie-header1-color);
  }
`

const NotFoundPage = () => {
  const isMobile = DeviceDetectHook()
  const { t } = useTranslation()
  const { language } = useI18next()

  return (
    <>
      <SEO title={t("404.SEO_TITLE")} />
      <Layout>
        <Main404 isMobile={isMobile}>
          <Headline404>
            BRUCE
            <br />
            WILLIS
          </Headline404>
          <HeadlineRocks>Rocks</HeadlineRocks>
          <Img
            isMobile={isMobile}
            src="../404_Bruce_Willis_rocks.png"
            alt={t("LAPTOP_ALT")}
          />
          <Paragraph>{t("404.URL_CHANGED")}</Paragraph>
          <Url to={language === "da" ? "../" : "../../en/"}>
            {t("404.TO_MAIN_PAGE")}
          </Url>
        </Main404>
      </Layout>
    </>
  )
}

export default NotFoundPage

export const queryData = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
