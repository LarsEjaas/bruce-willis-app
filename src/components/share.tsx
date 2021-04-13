import * as React from "react"
import styled from "styled-components"
import { globalHistory as history } from "@reach/router"
import { graphql, useStaticQuery } from "gatsby"

const ButtonContainer = styled.div`
  margin: 24px auto;
  width: fit-content;
`

const ShareButtonLink = styled.a`
  display: inline-block;
  text-decoration: none;
  margin: 0.5em;
  & .resp_sharing_button {
    border-radius: 50%;
    transition: 0.2s ease-in;
    padding: 14px;
    box-shadow: var(--icon-shadow);
    border: 2px solid var(--icon-hover-color2);
    background: var(--background2);
  }
  & .resp_sharing_button:hover {
    transition: all 0.3s ease-out;
    transform: scale(1.3);
    border-color: var(--movie-paragraph-color);
  }
  & .resp_sharing_button__icon svg {
    width: 24px;
    height: 24px;
    margin-right: 0.4em;
    vertical-align: top;
  }
  & .resp_sharing_button__small svg {
    margin: 0;
    vertical-align: middle;
  }
  & .resp_sharing_button__icon {
    stroke: var(--icon-hover-color2);
    fill: none;
    transition: all 0.2s ease-in;
  }
  &:hover .resp_sharing_button__icon {
    stroke: var(--movie-paragraph-color);
    fill: none;
    transition: all 0.3s ease-out;
  }
  & .resp_sharing_button__icon__solid,
  .resp_sharing_button__icon__solidcircle {
    fill: var(--icon-hover-color2);
    stroke: none;
    transition: all 0.2s ease-in;
  }
  &:hover .resp_sharing_button__icon__solid,
  .resp_sharing_button__icon__solidcircle {
    fill: var(--movie-paragraph-color);
    stroke: none;
    transition: all 0.3s ease-out;
  }
`

const ShareButtons = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            author
          }
        }
      }
    `
  )

  const removeBackSlashEnd = path => {
    return path.endsWith("/") ? path.slice(0, path.length - 1) : path
  }

  const siteMetadata = data.site.siteMetadata

  const siteUrl = removeBackSlashEnd(siteMetadata.siteUrl)

  const { location } = history
  const url = `${siteUrl}${location.pathname}`
  const thisURL = encodeURIComponent(url)

  const description = document
    .querySelector("meta[name='description']")
    .getAttribute("content")
  const image = document
    .querySelector("meta[property='og:image']")
    .getAttribute("content")
  const descriptionURL = encodeURIComponent(description)
  const title = document
    .querySelector("meta[property='og:title']")
    .getAttribute("content")
  const titleURL = encodeURIComponent(title)
  const facebookBaseURL = "https://facebook.com/sharer/sharer.php?u="
  const facebookURL = facebookBaseURL.concat(thisURL)
  const messengerBaseURL = "fb-messenger://share/?link="
  const messengerURL = messengerBaseURL.concat(thisURL)
  const twitterBaseURL1 = "https://twitter.com/share?text="
  const twitterBaseURL2 = descriptionURL.concat("&url=", thisURL)
  const twitterURL = twitterBaseURL1.concat("", twitterBaseURL2)
  const mailURL = "mailto:?".concat(
    "subject=",
    titleURL.concat("&body=", thisURL.concat("%0A", descriptionURL))
  )
  const pinterestURL = "https://pinterest.com/pin/create/button/?".concat(
    "url=",
    thisURL.concat("&amp;media=", image.concat("&description=", descriptionURL))
  )
  const linkedInURL = "https://www.linkedin.com/shareArticle?mini=true&".concat(
    "url=",
    thisURL.concat("&title=", titleURL.concat("&summary=", descriptionURL))
  )
  const redditURL = "https://reddit.com/submit/".concat(
    "?url=",
    thisURL.concat("&title=", titleURL)
  )
  const whatsAppURL = "whatsapp://send".concat(
    "?text=",
    descriptionURL.concat("%20", thisURL)
  )
  const telegramURL = "https://t.me/share/url?".concat(
    "url=",
    thisURL.concat("&text=", descriptionURL)
  )

  return (
    <ButtonContainer>
      <ShareButtonLink
        className="resp_sharing_button__link"
        href={facebookURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page on facebook"
        title="Share this page on facebook"
      >
        <div className="resp_sharing_button resp_sharing_button__facebook resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              hight="1em"
              viewBox="0 0 24 24"
            >
              <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        id="Messenger"
        className="resp_sharing_button__link"
        href={messengerURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page on Messenger"
        title="Share this page on Messenger"
      >
        <div className="resp_sharing_button resp_sharing_button__messenger resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              width="1em"
              height="1em"
              version="1.1"
              viewBox="5 5 66 75"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m1 58 18-29c3-5 9-6 13-2l14 11c1 1 3 1 4-0.02l19-15c3-2 6 1 4 4l-18 29c-3 5-9 6-13 2l-14-11c-1-1-3-1-4 0.02l-19 15c-3 2-6-1-4-4z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        className="resp_sharing_button__link"
        href={twitterURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page on Twitter"
        title="Share this page on Twitter"
      >
        <div className="resp_sharing_button resp_sharing_button__twitter resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              hight="1em"
              viewBox="0 0 24 24"
            >
              <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        className="resp_sharing_button__link"
        href={mailURL}
        target="_self"
        rel="noopener"
        aria-label="Share this page by email"
        title="Share this page by email"
      >
        <div className="resp_sharing_button resp_sharing_button__email resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              hight="1em"
              viewBox="0 0 24 24"
            >
              <path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.25 14.43l-3.5 2c-.08.05-.17.07-.25.07-.17 0-.34-.1-.43-.25-.14-.24-.06-.55.18-.68l3.5-2c.24-.14.55-.06.68.18.14.24.06.55-.18.68zm4.75.07c-.1 0-.2-.03-.27-.08l-8.5-5.5c-.23-.15-.3-.46-.15-.7.15-.22.46-.3.7-.14L12 13.4l8.23-5.32c.23-.15.54-.08.7.15.14.23.07.54-.16.7l-8.5 5.5c-.08.04-.17.07-.27.07zm8.93 1.75c-.1.16-.26.25-.43.25-.08 0-.17-.02-.25-.07l-3.5-2c-.24-.13-.32-.44-.18-.68s.44-.32.68-.18l3.5 2c.24.13.32.44.18.68z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        className="resp_sharing_button__link"
        href={pinterestURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page on a Pinterest board"
        title="Share this page on a Pinterest board"
      >
        <div className="resp_sharing_button resp_sharing_button__pinterest resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              hight="1em"
              viewBox="0 0 24 24"
            >
              <path d="M12.14.5C5.86.5 2.7 5 2.7 8.75c0 2.27.86 4.3 2.7 5.05.3.12.57 0 .66-.33l.27-1.06c.1-.32.06-.44-.2-.73-.52-.62-.86-1.44-.86-2.6 0-3.33 2.5-6.32 6.5-6.32 3.55 0 5.5 2.17 5.5 5.07 0 3.8-1.7 7.02-4.2 7.02-1.37 0-2.4-1.14-2.07-2.54.4-1.68 1.16-3.48 1.16-4.7 0-1.07-.58-1.98-1.78-1.98-1.4 0-2.55 1.47-2.55 3.42 0 1.25.43 2.1.43 2.1l-1.7 7.2c-.5 2.13-.08 4.75-.04 5 .02.17.22.2.3.1.14-.18 1.82-2.26 2.4-4.33.16-.58.93-3.63.93-3.63.45.88 1.8 1.65 3.22 1.65 4.25 0 7.13-3.87 7.13-9.05C20.5 4.15 17.18.5 12.14.5z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        className="resp_sharing_button__link"
        href={linkedInURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page on LinkedIn"
        title="Share this page on LinkedIn"
      >
        <div className="resp_sharing_button resp_sharing_button__linkedin resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              hight="1em"
              viewBox="0 0 24 24"
            >
              <path d="M6.5 21.5h-5v-13h5v13zM4 6.5C2.5 6.5 1.5 5.3 1.5 4s1-2.4 2.5-2.4c1.6 0 2.5 1 2.6 2.5 0 1.4-1 2.5-2.6 2.5zm11.5 6c-1 0-2 1-2 2v7h-5v-13h5V10s1.6-1.5 4-1.5c3 0 5 2.2 5 6.3v6.7h-5v-7c0-1-1-2-2-2z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        className="resp_sharing_button__link"
        href={redditURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page on Reddit"
        title="Share this page on Reddit"
      >
        <div className="resp_sharing_button resp_sharing_button__reddit resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="4 4 13.5 13.5"
            >
              <path d="m 17.5,10.9 a 1.5,1.5 0 0 0 -2.5,-1.0 7.1,7.1 0 0 0 -3.8,-1.2 l 0.7,-3.1 2.1,0.5 a 1,1 0 1 0 0.1,-0.6 l -2.4,-0.5 a 0.3,0.3 0 0 0 -0.4,0.2 l -0.7,3.5 a 7.1,7.1 0 0 0 -3.9,1.2 1.5,1.5 0 1 0 -1.6,2.4 2.9,2.9 0 0 0 0,0.4 c 0,2.2 2.6,4.1 5.8,4.1 3.2,0 5.8,-1.8 5.8,-4.1 a 2.9,2.9 0 0 0 0,-0.4 1.5,1.5 0 0 0 0.8,-1.3 z m -10,1 a 1,1 0 1 1 1,1 1,1 0 0 1 -1,-1 z m 5.8,2.8 a 3.8,3.8 0 0 1 -2.5,0.8 3.8,3.8 0 0 1 -2.5,-0.8 0.3,0.3 0 0 1 0.4,-0.4 3.3,3.3 0 0 0 2.1,0.6 3.3,3.3 0 0 0 2.1,-0.6 0.3,0.3 0 1 1 0.4,0.4 z m -0.2,-1.7 a 1,1 0 1 1 1,-1 1,1 0 0 1 -1,1 z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        id="whatsApp"
        className="resp_sharing_button__link"
        href={whatsAppURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page in WhatsApp"
        title="Share this page in WhatsApp"
      >
        <div className="resp_sharing_button resp_sharing_button__whatsapp resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              hight="1em"
              viewBox="0 0 24 24"
            >
              <path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>

      <ShareButtonLink
        id="telegram"
        className="resp_sharing_button__link"
        href={telegramURL}
        target="_blank"
        rel="noopener"
        aria-label="Share this page on Telegram"
        title="Share this page on Telegram"
      >
        <div className="resp_sharing_button resp_sharing_button__telegram resp_sharing_button__small">
          <div
            aria-hidden="true"
            className="resp_sharing_button__icon resp_sharing_button__icon__solid"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 -6 69.5 69.5"
              style={{ transform: "translateX(-2px)" }}
            >
              <path d="M4.8 24.8C23.4 16.7 35.9 11.3 42.1 8.7 59.9 1.3 63.6 0 66 0 66.5 0 67.7 0.1 68.5 0.7c0.6 0.5 0.8 1.2 0.9 1.7 0.1 0.5 0.2 1.6 0.1 2.5-1 10.1-5.1 34.7-7.3 46-0.9 4.8-2.7 6.4-4.4 6.6C54.1 57.9 51.3 55.1 47.7 52.8 42.1 49.1 38.9 46.8 33.4 43.2 27.1 39 31.2 36.7 34.8 33 35.7 32 52.1 17.1 52.4 15.7c0-0.2 0.1-0.8-0.3-1.1-0.4-0.3-0.9-0.2-1.3-0.1-0.6 0.1-9.6 6.1-27 17.8-2.6 1.8-4.9 2.6-6.9 2.6-2.3 0-6.7-1.3-9.9-2.4C2.9 31.2-0.3 30.5 0 28.3 0.2 27.2 1.7 26 4.8 24.8Z" />
            </svg>
          </div>
        </div>
      </ShareButtonLink>
    </ButtonContainer>
  )
}
export default ShareButtons
