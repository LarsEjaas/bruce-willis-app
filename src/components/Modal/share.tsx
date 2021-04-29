import * as React from "react"
import styled from "styled-components"
import { globalHistory as history } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next"
import ShareButton from "./shareButton"

const removeBackSlashEnd = (path: string) => {
  return path.endsWith("/") ? path.slice(0, path.length - 1) : path
}

const ButtonContainer = styled.div`
  margin: 24px auto;
  width: fit-content;
`

interface ShareButtonProps {
  readonly isMobile: "mobile" | "desktop" | undefined
}

const ShareButtons = ({ isMobile }: ShareButtonProps) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )
  const { language } = useI18next()

  const siteMetadata = data.site.siteMetadata

  const siteUrl = removeBackSlashEnd(siteMetadata.siteUrl)

  const { location } = history
  const url = `${siteUrl}${location.pathname}`
  const thisURL = encodeURIComponent(url)

  const description = siteMetadata[`description_${language}`]
  const image = siteMetadata[`seo_image_${language}`]
  const descriptionURL = encodeURIComponent(description)
  const title = siteMetadata[`title_${language}`]
  const titleURL = encodeURIComponent(title)

  const facebookBaseURL = "https://facebook.com/sharer/sharer.php?u="
  const messengerBaseURL = "fb-messenger://share/?link="
  const messengerURL = `${messengerBaseURL}${thisURL}`
  const twitterBaseURL1 = "https://twitter.com/share?text="
  const twitterBaseURL2 = `${descriptionURL}&url=${thisURL}`

  const facebookURL = `${facebookBaseURL}${thisURL}`
  const twitterURL = `${twitterBaseURL1}${twitterBaseURL2}`
  const mailURL = `mailto:?subject=${titleURL}&body=${thisURL}%0A${descriptionURL}`
  const pinterestURL = `https://pinterest.com/pin/create/button/?url=${thisURL}&amp;media=${image}&description=${descriptionURL}`
  const linkedInURL = `https://www.linkedin.com/shareArticle?mini=true&url=
    ${thisURL}&title=${titleURL}&summary=${descriptionURL}`
  const redditURL = `https://reddit.com/submit/url=${thisURL}&title=${titleURL}`
  const whatsAppURL = `whatsapp://send?text=${descriptionURL}%20${thisURL}`
  const telegramURL = `https://t.me/share/url?url=${thisURL}&text=${descriptionURL}`

  console.log(isMobile)

  return (
    <ButtonContainer>
      <ShareButton buttonType="Facebook" URL={facebookURL} />
      {isMobile === "mobile" && (
        <ShareButton buttonType="Messenger" URL={messengerURL} />
      )}
      <ShareButton buttonType="Twitter" URL={twitterURL} />
      <ShareButton buttonType="Mail" URL={mailURL} />
      <ShareButton buttonType="Pinterest" URL={pinterestURL} />
      <ShareButton buttonType="LinkedIn" URL={linkedInURL} />
      <ShareButton buttonType="Reddit" URL={redditURL} />
      {isMobile === "mobile" && (
        <>
          <ShareButton buttonType="WhatsApp" URL={whatsAppURL} />
          <ShareButton buttonType="Telegram" URL={telegramURL} />
        </>
      )}
    </ButtonContainer>
  )
}
export default ShareButtons
