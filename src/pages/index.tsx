import * as React from "react"
import { DeviceDetectHook } from "../components/Hooks/deviceDetect"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import Layout from "../components/layout"
import { Main } from "../components/Main/main"
import SEO from "../components/seo"
import { useFetchMovieCredits } from "../components/Data/sourceData"
import { getWithExpiry } from "../components/Data/localStorage"

//Bruce Willis has id: 62 on TMDB
const id = "62/movie_credits"
const type = "person"

interface IndexProps {
  location: { pathname: string }
  data: any
}

const Index = ({ location, data }: IndexProps) => {
  const { language } = useI18next()
  const siteMetadata = data.site.siteMetadata

  console.log(siteMetadata)

  const [movieData, isLoading, isError] = getWithExpiry(
    `movieStorageData-${language}`
  )
    ? [getWithExpiry(`movieStorageData-${language}`), false, false]
    : useFetchMovieCredits({
        type,
        id,
        language,
      })

  console.log(
    movieData,
    isLoading,
    isError,
    siteMetadata.seo_image_da,
    siteMetadata.seo_image_en
  )

  const isMobile = DeviceDetectHook()

  return (
    <>
      <SEO
        title={
          language === "da" ? siteMetadata.title_da : siteMetadata.title_en
        }
        description={
          language === "da"
            ? siteMetadata.description_da
            : siteMetadata.description_en
        }
        image={
          language === "da"
            ? siteMetadata.seo_image_da
            : siteMetadata.seo_image_en
        }
      />
      <Layout>
        <Main
          isMobile={isMobile}
          movieData={movieData}
          isLoading={isLoading}
          isError={isError}
          location={location}
        />
      </Layout>
    </>
  )
}

export default Index

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
    site {
      siteMetadata {
        title_en
        title_da
        description_en
        description_da
        seo_image_en
        seo_image_da
      }
    }
  }
`
