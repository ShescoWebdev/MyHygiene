import { useState, useRef, useEffect } from "react"

function Videos() {

  const videos = [
    "https://res.cloudinary.com/detg3ravj/video/upload/f_auto,q_auto,w_1200/v1774993190/vid1_watb2r.mp4",
    "https://res.cloudinary.com/detg3ravj/video/upload/f_auto,q_auto,w_1200/v1774993202/vid2_eaohxp.mp4",
    "https://res.cloudinary.com/detg3ravj/video/upload/f_auto,q_auto,w_1200/v1774993221/vid3_o6vyno.mp4"
  ]

  const [showVideos, setShowVideos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const videoRefs = useRef([])
  const fullscreenVideoRef = useRef(null)
  const featuredVideoRef = useRef(null) // ✅ NEW

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) next()
    if (touchEndX.current - touchStartX.current > 50) prev()
  }

  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return

      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "Escape") setCurrentIndex(null)
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [currentIndex])

  // Pause all modal videos
  const pauseAllVideos = () => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }

  // ✅ Pause featured video when opening modal
  useEffect(() => {
    if (showVideos && featuredVideoRef.current) {
      featuredVideoRef.current.pause()
      featuredVideoRef.current.currentTime = 0
    }
  }, [showVideos])

  // Handle fullscreen modal video
  useEffect(() => {
    if (currentIndex !== null) {
      pauseAllVideos()

      setTimeout(() => {
        if (fullscreenVideoRef.current) {
          fullscreenVideoRef.current.play()
        }
      }, 50)
    } else {
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause()
        fullscreenVideoRef.current.currentTime = 0
      }
    }
  }, [currentIndex])

  // Prevent background scrolling
  useEffect(() => {
    if (showVideos || currentIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showVideos, currentIndex])

  // ✅ Fix mobile zoom bug after exiting fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setTimeout(() => {
          window.scrollTo(window.scrollX, window.scrollY)
          document.body.style.transform = "scale(1)"
        }, 50)
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  return (
    <div className="bg-[#faf6e8] min-h-screen pt-16 px-6 md:px-20 md:pt-16 py-1 md:mt-[-1.7rem]">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Our Video Gallery
        </h1>
        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto leading-relaxed">
          Take a look at some of our work in action! And our journey of excellence.
        </p>
      </div>

      {/* FEATURED VIDEO */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold flex justify-center w-[200px] m-auto border-b-4 border-[#f0b000] rounded-full mb-5">
          Videos
        </h2>

        <video
          ref={featuredVideoRef}  // ✅ ADDED
          src={videos[0]}
          controls
          preload="metadata"
          onClick={() => {
            pauseAllVideos()
            setCurrentIndex(0)
          }}
          className="mx-auto w-full md:w-[500px] h-[300px] object-cover rounded-xl cursor-pointer"
        />

        <button
          onClick={() => setShowVideos(true)}
          className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full hover:scale-105 transition"
        >
          See More Videos
        </button>

        <div className='about3 text-black w-[20rem] m-auto md:w-[75rem] mt-10 p-10 bg-[#f4d171] flex flex-col rounded-3xl'>
          <h1 className='text-center text-2xl md:text-4xl leading-relaxed text-blue-800 font-bold'>Enjoy our video gallery!</h1>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {showVideos && (
        <Modal onClose={() => setShowVideos(false)}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {videos.map((src, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg bg-black">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={src}
                  controls
                  preload="metadata"
                  onClick={() => setCurrentIndex(index)}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* FULLSCREEN VIEW */}
      {currentIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

          <button
            onClick={() => setCurrentIndex(null)}
            className="fixed top-5 right-6 text-white text-3xl font-bold z-50"
          >
            ✕
          </button>

          <button onClick={prev} className="absolute left-5 text-white text-4xl">‹</button>

          <video
            ref={fullscreenVideoRef}
            src={videos[currentIndex]}
            controls
            autoPlay
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
          />

          <button onClick={next} className="absolute right-5 text-white text-4xl">›</button>
        </div>
      )}

    </div>
  )
}

export default Videos