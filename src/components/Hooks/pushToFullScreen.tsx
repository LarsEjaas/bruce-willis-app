function PushToFullScreen(isMobile: "mobile" | "desktop" | undefined) {
  const fullscreenPossible =
    typeof window !== `undefined` ? document.fullscreenEnabled : null
  if (!fullscreenPossible || isMobile !== "mobile") {
    return
  }
  const body = document.body
  if (!body) return
  body.addEventListener("click", FullScreenActivate)
  // make the element go to full-screen mode
  function FullScreenActivate() {
    const isBodyInFullScreen = document.fullscreenElement
    if (!!isBodyInFullScreen) return
    body
      .requestFullscreen()
      .then(function () {})
      .catch(function (error) {})
  }
}
export default PushToFullScreen
