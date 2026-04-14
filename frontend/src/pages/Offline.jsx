import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Offline() {
  const navigate = useNavigate()
  const [Reconnecting, setReconnecting] = useState(false)
  const [showToast, setShowToast] = useState(false)

  // Check if users are actually online when they try to load this page
  useEffect(() => {
    if (navigator.onLine) {
      // If users have internet, kick them out
      const lastPage = localStorage.getItem("lastPage") || "/"
      // 'replace: true' ensures users can't click the back button to return here
      navigate(lastPage, { replace: true }) 
    }
  }, [navigate])

  //Wait for them to regain connection if they are offline
  useEffect(() => {
    const handleOnline = () => {
      setReconnecting(true)
      setShowToast(true)

      // Wait a bit before redirecting
      setTimeout(() => {
        const lastPage = localStorage.getItem("lastPage") || "/"
        navigate(lastPage, { replace: true })
      }, 6000)
    }

    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("online", handleOnline)
    }
  }, [navigate])

  return (
    <div
      className={`h-screen flex items-center justify-center text-white text-center px-6 transition-all duration-700 ${
        Reconnecting
          ? "bg-[#202124] opacity-100"
          : "bg-[#202124] opacity-100"
      }`}
    >
      {/* Toast */}
      {showToast && (
        <div className="fixed top-6 bg-[#333439] text-gray-300 px-6 py-3 rounded-xl shadow-lg animate-bounce">
            Internet restored! Redirecting...
        </div>
      )}

      <div
        className={`transition-all duration-700 ${
          Reconnecting ? "scale-105 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <h1 className="text-2xl mb-2 text-gray-400">
          No Internet Connection 🚫
        </h1>

        <p className="text-gray-400 mb-3">
          Please check your network and try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="text-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}

export default Offline