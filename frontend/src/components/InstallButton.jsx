// import { useEffect, useState } from "react"

// function InstallButton() {
//   const [deferredPrompt, setDeferredPrompt] = useState(null)

//   useEffect(() => {
//     const handler = (e) => {
//       e.preventDefault()
//       setDeferredPrompt(e)
//     }

//     window.addEventListener("beforeinstallprompt", handler)

//     return () => window.removeEventListener("beforeinstallprompt", handler)
//   }, [])

//   const installApp = async () => {
//     if (!deferredPrompt) {
//       alert("App already installed or not supported on this device")
//       return
//     }

//     deferredPrompt.prompt()
//     await deferredPrompt.userChoice
//     setDeferredPrompt(null)
//   }

//   return (
//     <button
//       onClick={installApp}
//       className="fixed top-[59px] md:top-[5rem] left-0 w-full bg-blue-500 rounded-none text-white z-50 text-center font-semibold"
//     >
//       Install MyHygiene App
//     </button>
//   )
// }

// export default InstallButton