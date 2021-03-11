import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import styled from 'styled-components'
import Image from '../components/image'

const Styled = styled.section`
    padding: 2px 5px;
    background: ${props => props.left? "var(--background1)" : "var(--background2)"};
    border-radius: ${props => props.left ? "40px 0 0 40px" : "0 40px 40px 0"};
`

export const Main = ({ siteTitle }) => (
   <>
    <Styled left>
      <Image fileName="Bruce_Willis.png" alt="portrait of Bruce Willis"/>
    </Styled>
    <Styled>

    </Styled>
   </> 
)

Main.propTypes = {
  siteTitle: PropTypes.string,
}

Main.defaultProps = {
  siteTitle: ``,
}


export const MainMobile = ({ siteTitle }) => (
  <>
 <Styled/>
   <div
     style={{
       margin: `0 auto`,
       maxWidth: 960,
       padding: `1.45rem 1.0875rem`,
     }}
   >
     <h1 style={{ margin: 0 }}>
       <Link
         to="/"
         style={{
           color: `white`,
           textDecoration: `none`,
         }}
       >
         {siteTitle}
       </Link>
     </h1>
   </div>
  </> 
)

MainMobile.propTypes = {
 siteTitle: PropTypes.string,
}

MainMobile.defaultProps = {
 siteTitle: ``,
}
