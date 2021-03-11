import React,{ useState, useEffect, useLayoutEffect } from "react"

export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState(undefined);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile? "mobile" : "desktop");
  }, []);

  return { isMobile };
}