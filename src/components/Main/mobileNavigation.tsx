import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"

const Navigation = styled.nav`
  z-index: 10;
  position: absolute;
  bottom: 24px;
  right: calc(100vw + 24px);
  @media (max-width: 360px) {
    right: calc(100vw + 8px);
  }
`

interface NavBtnProps {
  readonly index: number
  readonly id: "1" | "2"
}

const NavBtn = styled.button<NavBtnProps>`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 4px solid var(--icon-color1);
  margin: 4px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  padding: 6px;
  background-color: ${props =>
    props.index === parseFloat(props.id) ? "var(--icon-color1)" : "unset"};
`

interface NavigationProps {
  togglePage: Function
  index: number
}

const MobileNavigation = ({ togglePage, index }: NavigationProps) => {
  useEffect(() => {}, [index])
  const { t } = useTranslation()

  return (
    <Navigation className={`position${index}`}>
      <NavBtn
        className={`${index} one`}
        id="1"
        index={index}
        onClick={e => togglePage(e)}
        aria-label={t("NAVIGATE_TO_NEXT_PAGE")}
      />
      <NavBtn
        className={`${index} two`}
        id="2"
        index={index}
        onClick={e => togglePage(e)}
        aria-label={t("NAVIGATE_TO_PREVIOUS_PAGE")}
      />
    </Navigation>
  )
}

export default MobileNavigation
