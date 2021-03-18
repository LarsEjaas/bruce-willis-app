import * as React from "react"
import { useState, useContext } from "react"
import styled, { keyframes, css } from 'styled-components'
import { StaticImage } from "gatsby-plugin-image"
import { GlobalContext } from "./layout"

interface SliderProps {
    left?: boolean;
    right?: boolean;
    isMobile?: "mobile" | "desktop" | undefined;
    index: 1 | 2;
  }


const sliderFadeIn = keyframes`
from {
  opacity: 0;
  transform: translateX(-250px) rotate(9deg);
}
to {
  opacity: 1;
  transform: translateX(calc(8.33% * -1)) rotate(9deg);
}
`;

const sliderFadeInMobile = keyframes`
from {
  opacity: 0;
  transform: translateX(-200px) rotate(9deg);
}
to {
  opacity: 1;
  transform: rotate(9deg);
}
`;

const Slider = styled.div<SliderProps>`
   position: absolute;
   overflow: hidden;
   inset: 0;
   .sliderContainer {
   transform: ${props => props.isMobile==="mobile" ? "rotate(9deg)" : "translateX(calc(8.33% * -1)) rotate(9deg)"};
   display: flex;
   flex-direction: column;
   width: 100%;
   max-width:900px;
   transform-origin: top right;
   padding: 16px 0;
   height: 110%;
   overflow: auto;
   overflow: -moz-scrollbars-none;
   -ms-overflow-style: none;
   }
   .desktop.sliderContainer {
   animation: ${sliderFadeIn} 1s ease-out;
   position:relative;
   }
   .mobile.sliderContainer.left {
   animation: ${sliderFadeInMobile} 1s ease-out 0.2s;
   animation-fill-mode: both;
   position:relative;
   }
   .sliderContainer::-webkit-scrollbar {
   width: 0 !important;
   display: none;
   }`

const MovieCovers = ({ isMobile, index }:SliderProps) => {
  return(
    <Slider isMobile={isMobile}>
     <div className={index===1? `${isMobile} sliderContainer right` : `${isMobile} sliderContainer left`}>
       <Cover1 isMobile={isMobile}/>
       <Cover2 isMobile={isMobile}/>
       <Cover3 isMobile={isMobile}/>
      {/* {covers} */}
     </div>
   </Slider>
   )
  }

export default MovieCovers

interface CoverProps {
  isMobile: "mobile" | "desktop" | undefined;
  left?: boolean;
  right?: boolean;
  active?: boolean; 
}

const CoverCard = styled.div<CoverProps>`
   position: relative;
   width:46.3%;
   height: 0;
   padding-top: 69.44%;
   border-radius: 20px;
   overflow:hidden;
   margin: 10px auto;
   background-color: var(--image-cover-color);
   box-shadow: var(--box-shadow-primary);
   cursor: pointer;
   transition: transform 0.3s ease-in-out;
   transform-origin: center;
   transform:  ${props => props.active === true? "scale(1.1)" : "scale(1)"};
   z-index: 1;
   &:hover {
   transform: scale(1.13); 
   box-shadow: var(--box-shadow-raised);
   z-index: 2;
   }
   & .coverImage {
   border-radius: 20px;
   filter: sepia(1);
   transition: filter 0.3s ease-in-out;
   position: absolute;
   top: 0;
   }
   &:hover .coverImage {
   filter: unset;
   }
   `

const Cover1 = ({ isMobile }:CoverProps) => {
   const [active, setActive] = useState(false);

return(
<CoverCard className={active} aria-label="" title="">

<StaticImage
  className="coverImage"
  isMobile={isMobile}
  src="../images/cover1.jpg"
  alt="portrait of Bruce Willis"
  loading="eager"
  placeholder="none"
  layout="constrained"
  />
</CoverCard>
)
}

const Cover2 = ({ isMobile }:CoverProps) => {
  const [active, setActive] = useState(false);

const { changeModalType, modalToggle, storeClickedElement } = useContext(GlobalContext);

const handleEnterKey = e => {
  console.log(e)
  e.currentTarget.click();
  }

const keyListenersMap = new Map([[13, handleEnterKey]]);
function keyListener(e) {
  console.log(e, e.keyCode)
// get the listener corresponding to the pressed key
const listener = keyListenersMap.get(e.keyCode);
// call the listener if it exists
return listener && listener(e);
}

return(
<CoverCard tabIndex="0" className={active} onClick={(e) => modalToggle(e.currentTarget, "movie")} onKeyPress={(e)=>(keyListener(e))} aria-label="" title="">

<StaticImage
 className="coverImage"
 isMobile={isMobile}
 src="../images/cover2.jpg"
 alt="portrait of Bruce Willis"
 loading="eager"
 placeholder="none"
 layout="constrained"
 />
</CoverCard>
)
}

const Cover3 = ({ isMobile }:CoverProps) => {
  const [active, setActive] = useState(false);

return(
<CoverCard className={active} aria-label="" title="">
{/* <CoverCard activeState={activeState} handleActiveState={handleActiveState} label={data.tag} index={1} aria-label="" title=""> */}
<StaticImage
 className="coverImage"
 isMobile={isMobile}
 src="../images/cover3.jpg"
 alt="portrait of Bruce Willis"
 loading="eager"
 placeholder="none"
 layout="constrained"
 />
</CoverCard>
)
}
