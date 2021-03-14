import { useState, useEffect } from "react"

export const DeviceDetectHook = () => {
  const userAgent = typeof window.navigator !== "undefined" ? navigator.userAgent: " ";
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








//   import React, { useState, useEffect} from 'react'

// export const OnlineHook = () => {
//   const online = typeof window !== `undefined` ? window.navigator.onLine : undefined;
//   const [isOnline, setOnline] = useState(online);

//   useEffect(() => {
//     const goOnline = (e) => {
//       setOnline(true);
//     };
//     const goOffline = (e) => {
//       setOnline(false);
//     };

//     window.addEventListener('offline', goOffline);
//     window.addEventListener('online', goOnline);

//     return () => {
//       window.removeEventListener('offline', goOffline);
//       window.removeEventListener('online', goOnline);      
//     }
//   },[])

//   return isOnline
// }

