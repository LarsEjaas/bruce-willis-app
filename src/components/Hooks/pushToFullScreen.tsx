function PushToFullScreen(isMobile: "mobile" | "desktop" | undefined) {
  const fullscreenPossible =
    typeof window !== `undefined` ? document.fullscreenEnabled : null
  if (!fullscreenPossible || isMobile !== "mobile") {
    console.log("not possible to push page to fullscreen")
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
      .then(function () {
        console.log("window was pushed to fullScreen")
      })
      .catch(function (error) {
        console.log(
          `not possible to push page to fullscreen. Returned error: ${error}`
        )
      })
  }
}
export default PushToFullScreen
