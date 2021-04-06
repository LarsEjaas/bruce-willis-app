import * as React from "react"
import { useEffect } from "react"
import styled, { keyframes } from "styled-components"

interface NavigationProps {
  togglePage: Function
  onClick(event: React.MouseEvent<HTMLButtonElement>): void
  index: 1 | 2
  className: string
  id: "1" | "2"
}

const Navigation = styled.nav`
  z-index: 10;
  position: absolute;
  bottom: 28px;
  right: calc(100vw + 24px);
  @media (max-width: 360px) {
    right: calc(100vw + 8px);
  }
`

const NavBtn = styled.button<NavigationProps>`
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

const MobileNavigation = ({ togglePage, index }: NavigationProps) => {
  useEffect(() => {}, [index])

  return (
    <Navigation className={`position${index}`}>
      <NavBtn
        className={`${index} one`}
        id="1"
        index={index}
        onClick={e => togglePage(e)}
      />
      <NavBtn
        className={`${index} two`}
        id="2"
        index={index}
        onClick={e => togglePage(e)}
      />
    </Navigation>
  )
}

export default MobileNavigation
