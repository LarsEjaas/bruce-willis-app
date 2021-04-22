import * as React from "react"
import { DeviceDetectHook } from "../components/deviceDetect"
import { graphql } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import Layout from "../components/layout"
import { Main } from "../components/main"
import SEO from "../components/seo"
import { useFetchMovieCredits } from "../components/sourceData"
import { getWithExpiry } from "../components/localStorage"

//Bruce Willis has id: 62
const id = "62/movie_credits"
const type = "person"

interface IndexProps {
  location: any
}

const Index = ({ location }: IndexProps) => {
  const { language } = useI18next()

  const [movieData, isLoading, isError] = getWithExpiry(
    `movieStorageData-${language}`
  )
    ? [getWithExpiry(`movieStorageData-${language}`), false, false]
    : useFetchMovieCredits({
        type,
        id,
        language,
      })

  console.log(movieData, isLoading, isError)

  const isMobile = DeviceDetectHook()

  return (
    <>
      <SEO
        title="THIS IS THE TITLE"
        description="THIS IS THE DESCRIPTION"
        pathName={location.pathname}
        image="THIS IS THE IMAGE URL"
        published={location.published}
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

export const query = graphql`
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
