import * as React from "react"
import { DeviceDetectHook } from "../components/deviceDetect"
import Layout from "../components/layout"
import { Main, MainMobile } from "../components/main"
import SEO from "../components/seo"
import { useFetchMovieCredits } from "../components/sourceData"

//Bruce Willis has id: 62
const id = "62/movie_credits"
const type = "person"

const Index = ({ location }) => {
  const [movieData, isLoading] = useFetchMovieCredits({ type, id })
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
        <Main isMobile={isMobile} movieData={movieData} isLoading={isLoading} />
      </Layout>
    </>
  )
}

export default Index
