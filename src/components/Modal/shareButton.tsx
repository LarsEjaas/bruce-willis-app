import * as React from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Facebook from "../../svg/facebook.inline.svg"
import Messenger from "../../svg/messenger.inline.svg"
import Twitter from "../../svg/twitter.inline.svg"
import Mail from "../../svg/mail.inline.svg"
import Pinterest from "../../svg/pinterest.inline.svg"
import LinkedIn from "../../svg/linkedIn.inline.svg"
import Reddit from "../../svg/reddit.inline.svg"
import WhatsApp from "../../svg/whatsApp.inline.svg"
import Telegram from "../../svg/telegram.inline.svg"

interface shareButtonLinkProps {
  readonly isMobile: "mobile" | "desktop" | undefined
  readonly id:
    | "Facebook"
    | "Messenger"
    | "Twitter"
    | "Mail"
    | "Pinterest"
    | "LinkedIn"
    | "Reddit"
    | "WhatsApp"
    | "Telegram"
}

const ShareButtonLink = styled.a<shareButtonLinkProps>`
  display: inline-block;
  text-decoration: none;
  margin: 0.5em;
  & .resp_sharing_button {
    border-radius: 50%;
    transition: 0.2s ease-in;
    padding: 14px;
    box-shadow: var(--icon-shadow);
    border-color: var(--icon-hover-color2);
    border-style: solid;
    border-width: ${props => (props.isMobile === "mobile" ? "2px" : "4px")};
    background: var(--background2);
    position: relative;
  }
  & .resp_sharing_button::after {
    content: "";
    height: 100%;
    width: 100%;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: 0;
    box-shadow: ${props =>
      props.isMobile === "mobile"
        ? "inset -1px 4px 7px 0px var(--background1)"
        : "inset 0px 4px 6px rgb(0 0 0 / 50%), inset 0px 12px 13px rgb(0 0 0 / 34%), inset 0px -3px 5px rgb(0 0 0 / 27%)"};
  }
  & .resp_sharing_button:hover {
    transition: all 0.3s ease-out;
    transform: scale(1.3);
    border-color: var(--movie-paragraph-color);
  }
  & .resp_sharing_button__icon svg {
    width: ${props => (props.isMobile === "mobile" ? "24px" : "48px")};
    height: ${props => (props.isMobile === "mobile" ? "24px" : "48px")};
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

interface ShareButtonProps {
  buttonType:
    | "Facebook"
    | "Messenger"
    | "Twitter"
    | "Mail"
    | "Pinterest"
    | "LinkedIn"
    | "Reddit"
    | "WhatsApp"
    | "Telegram"
  URL: string
  readonly isMobile: "mobile" | "desktop" | undefined
}

const ShareButton = ({ buttonType, URL, isMobile }: ShareButtonProps) => {
  const { t } = useTranslation()
  return (
    <ShareButtonLink
      id={buttonType}
      className="resp_sharing_button__link"
      href={URL}
      target="_blank"
      rel="noopener"
      aria-label={`${t("SHARE_BUTTON_TITLE")}${buttonType}`}
      title={`${t("SHARE_BUTTON_TITLE")}${buttonType}`}
      isMobile={isMobile}
    >
      <div
        className={`resp_sharing_button resp_sharing_button__${buttonType} resp_sharing_button__small`}
      >
        <div
          aria-hidden="true"
          className="resp_sharing_button__icon resp_sharing_button__icon__solid"
        >
          {buttonType === "Facebook" && <Facebook />}
          {buttonType === "Messenger" && <Messenger />}
          {buttonType === "Twitter" && <Twitter />}
          {buttonType === "Mail" && <Mail />}
          {buttonType === "Pinterest" && <Pinterest />}
          {buttonType === "LinkedIn" && <LinkedIn />}
          {buttonType === "Reddit" && <Reddit />}
          {buttonType === "WhatsApp" && <WhatsApp />}
          {buttonType === "Telegram" && <Telegram />}
        </div>
      </div>
    </ShareButtonLink>
  )
}

export default ShareButton
