import { useState, useEffect } from "react"

function debounce(fn, ms) {
  let timer
  return _ => {
    clearTimeout(timer)
    timer = setTimeout(_ => {
      timer = null
      fn.apply(this, arguments)
    }, ms)
  }
}

export const DeviceDetectHook = () => {
  // const userAgent = ""
  // typeof window !== "undefined" ? window.navigator.userAgent : " "
  // const mobile = Boolean(
  //   userAgent.match(
  //     /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
  //   )
  // )

  const [isMobile, setMobile] = useState("mobile")

  useEffect(() => {
    const userAgent =
      typeof window !== "undefined" ? window.navigator.userAgent : "Android"
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    )

    setMobile(window.innerWidth < 600 || mobile ? "mobile" : "desktop")

    const debouncedHandleResize = debounce(function handleResize() {
      const mobile = Boolean(
        userAgent.match(
          /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
      )
      setMobile(window.innerWidth < 600 || mobile ? "mobile" : "desktop")
    }, 1000)

    window.addEventListener("resize", debouncedHandleResize)

    return () => {
      window.removeEventListener("resize", debouncedHandleResize)
    }
  }, [])
  if (typeof window !== undefined) {
    console.log(isMobile)
  }
  return isMobile
}
