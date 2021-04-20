import * as React from "react"
import { useState, useContext } from "react"
import styled, { keyframes } from "styled-components"
import { GlobalContext } from "./layout"

const LabelContainer = styled.div<CoverProps>`
  height: fit-content;
  width: fit-content;
  display: block;
  position: absolute;
  right: 24px;
  bottom: 16px;
  z-index: 25;
  & h2 {
  }
  & h3 {
  }
`

interface MovieLabelProps {}

const MovieLabel = ({}: MovieLabelProps) => {
  const [active, setActive] = useState<boolean>(false)

  const { modalToggle } = useContext(GlobalContext)
  const handleEnterKey = e => {
    console.log(e)
    e.currentTarget.click()
  }

  const keyListenersMap = new Map([[13, handleEnterKey]])
  function keyListener(e) {
    console.log(e, e.keyCode)
    // get the listener corresponding to the pressed key
    const listener = keyListenersMap.get(e.keyCode)
    // call the listener if it exists
    return listener && listener(e)
  }

  return (
    <LabelContainer>
      <h2></h2>
      <h3></h3>
    </LabelContainer>
  )
}

export default MovieLabel
