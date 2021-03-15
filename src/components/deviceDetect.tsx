import { useState, useEffect } from "react"

export const DeviceDetectHook = () => {
  const userAgent = typeof window !== "undefined" ? window.navigator.userAgent: " ";
  const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i));
  const [isMobile, setMobile] = useState(mobile? "mobile" : "desktop");

  useEffect(() => {
    const mobile = Boolean(
      userAgent.match(
        /Android|BlackBerry|iPhone|iPod|Opera Mini|IEMobile|WPDesktop/i
      )
    );
    setMobile(mobile? "mobile" : "desktop");
  }, []);

  return isMobile 
}



