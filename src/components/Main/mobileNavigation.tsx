import * as React from "react"
import { useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "gatsby-plugin-react-i18next"

const Navigation = styled.nav`
  z-index: 10;
  position: absolute;
  bottom: 28px;
  right: calc(100vw + 24px);
  @media (max-width: 360px) {
    right: calc(100vw + 8px);
  }
`

interface NavBtnProps {
  readonly index: 1 | 2
  readonly id: "1" | "2"
}

const NavBtn = styled.button<NavBtnProps>`
  height: 24px;
  width: 24px;
  border-radius: 50%;
  border: 4px solid var(--icon-color1);
  margin: 0 4px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  background-color: ${props =>
    props.index === parseFloat(props.id) ? "var(--icon-color1)" : "unset"};
`

interface NavigationProps {
  togglePage: Function
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
  index: 1 | 2
  className: string
  id: "1" | "2"
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
