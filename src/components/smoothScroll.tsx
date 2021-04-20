const easeInOutCubic = function (t: number) {
  return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

const scrollingTime: number = 1000

const scrollingDistance: number = window.innerHeight * 3

export const smoothScroll = (element: HTMLElement | null) => {
  if (element === null) return
  let startTime: number
  const startPos: number = element.scrollTop
  const clientHeight = element.clientHeight
  const maxScroll: number = element.scrollHeight - clientHeight
  const scrollIntendedDestination: number = startPos + scrollingDistance
  console.log(
    "lets scroll baby!!",
    startPos,
    clientHeight,
    maxScroll,
    scrollIntendedDestination
  )
  // low and high bounds for possible scroll destinations
  const scrollEndValue: number | null = Math.min(
    Math.max(scrollIntendedDestination, 0),
    maxScroll
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
  if (startPos != scrollEndValue) window.requestAnimationFrame(scroll)
}

// const containerEl: HTMLElement | null =
//   typeof document !== undefined
//     ? document.getElementById("scroll-container")
//     : null
