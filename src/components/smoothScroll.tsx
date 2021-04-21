const easeInOutCubic = function (t: number) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

const scrollingTime: number = 1000

export const smoothScroll = (element: HTMLElement | null) => {
  const sliderContainer: HTMLElement | undefined =
    typeof window !== `undefined`
      ? document.querySelector(".sliderContainer")
      : undefined
  if (element === null || sliderContainer === undefined) return
  const scrollingDistance: number = window.innerHeight * 3
  let startTime: number
  const startPos: number = element.scrollTop
  const clientHeight = element.clientHeight
  const maxScroll: number = element.scrollHeight - clientHeight
  const scrollIntendedDestination: number = startPos + scrollingDistance
  // low and high bounds for possible scroll destinations
  const scrollEndValue: number | null = Math.min(
    Math.max(scrollIntendedDestination, 0),
    maxScroll
  )
  console.log(
    "lets scroll baby!!",
    "startPos: ",
    startPos,
    "clientHeight: ",
    clientHeight,
    "maxScroll: ",
    maxScroll,
    "scrollIntendedDestination: ",
    scrollIntendedDestination,
    "scrollEndValue: ",
    scrollEndValue,
    "sliderContainer: ",
    sliderContainer,
    "startPos !== scrollEndValue: ",
    startPos !== scrollEndValue,
    "element.scrollHeight: ",
    element.scrollHeight,
    window.getComputedStyle(element).overflowY === "visible",
    window.getComputedStyle(element).overflowY !== "hidden"
  )
  // create recursive function to call every frame
  const scroll = function (timestamp: number) {
    console.log("now scrolling")
    if (element === null) return
    startTime = startTime || timestamp
    const elapsed: number = timestamp - startTime
    element.scrollTop =
      startPos +
      (scrollEndValue - startPos) * easeInOutCubic(elapsed / scrollingTime)
    elapsed <= scrollingTime && window.requestAnimationFrame(scroll)
  }
  // call recursive function
  if (startPos !== scrollEndValue) window.requestAnimationFrame(scroll)
}

// const containerEl: HTMLElement | null =
//   typeof document !== undefined
//     ? document.getElementById("scroll-container")
//     : null
