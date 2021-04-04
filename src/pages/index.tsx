import * as React from "react"
import { DeviceDetectHook } from "../components/deviceDetect"
import Layout from "../components/layout"
import { Main, MainMobile } from "../components/main"
import SEO from "../components/seo"

const Index = ({ location }) => {
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
        <Main isMobile={isMobile} />
      </Layout>
    </>
  )
}

export default Index
