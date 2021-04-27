import { useState, useEffect } from "react"

function debounce(fn: Function, ms: number) {
  let timer: NodeJS.Timeout | null
  //return _ => {
  return () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      fn.apply(undefined, arguments)
      //fn.apply(this, arguments)
    }, ms)
  }
}

export const DeviceDetectHook = () => {
  //const [isMobile, setMobile] = useState("mobile")
  const [isMobile, setMobile] = useState<"mobile" | "desktop" | undefined>(
    undefined
  )

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
