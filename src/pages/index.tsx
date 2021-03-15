import * as React from "react"
import { DeviceDetectHook } from '../components/deviceDetect'
import Layout from "../components/layout"
import { Main, MainMobile } from "../components/main"

const Index = () => {
  const isMobile = DeviceDetectHook();
  console.log(isMobile);

return (
  <Layout>
    {isMobile==='mobile' &&
    <MainMobile isMobile={isMobile}/>
    }
    {isMobile==='desktop' &&
    <Main isMobile={isMobile}/>
    }
  </Layout>
)
}

export default Index
