import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import useDeviceDetect from '../components/deviceDetect'

import Layout from "../components/layout"
import { Main, MainMobile } from "../components/main"
import SEO from "../components/seo"

const IndexPage = () => {
const { isMobile } = useDeviceDetect();

return (
  <Layout>
    {isMobile==='mobile' &&
    <MainMobile/>
    }
    {isMobile==='desktop' &&
    <Main/>
    }
  </Layout>
)
}

export default IndexPage
