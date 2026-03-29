import { useState, useRef, useEffect } from "react"

function Gallery() {

  const photos = [
    "/photos/Home1.jpg",
    "/photos/Home2.jpg",
    "/photos/Home3.jpg",
    "/photos/Home4.jpg",
    "/photos/Home5.jpg",
    "/photos/Home6.JPG",
    "/photos/Img1.jpg",
    "/photos/Img2.jpg",
    "/photos/Img3.jpg",
    "/photos/Img4.jpg",
    "/photos/Img5.jpg",
    "/photos/Img6.jpg",
    "/photos/Img7.jpg",
    "/photos/Img8.jpg",
    "/photos/Img9.JPG",
    "/photos/Img10.JPG",
    "/photos/Img11.jpg",
    "/photos/Img12.jpg",
    "/photos/Img13.jpg",
    "/photos/Img14.jpg",
    "/photos/Img15.JPG",
    "/photos/Img16.JPG",
    "/photos/Img17.JPG",
    "/photos/Img18.jpg",
    "/photos/Img19.jpg",
    "/photos/Img20.jpg",
    "/photos/Img21.JPG",
  ]

  const videos = [
    "/videos/vid1.mp4",
    "/videos/vid2.mp4",
    "/videos/vid3.mp4"
  ]

  const [showPhotos, setShowPhotos] = useState(false)
  const [showVideos, setShowVideos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [mode, setMode] = useState(null)

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const videoRefs = useRef([]) // modal videos refs
  const fullscreenVideoRef = useRef(null) // fullscreen video ref

  const next = () => {
    const list = mode === "photo" ? photos : videos
    setCurrentIndex((prev) => (prev + 1) % list.length)
  }

  const prev = () => {
    const list = mode === "photo" ? photos : videos
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length)
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
  }, [currentIndex, mode])

  // Pause all modal videos
  const pauseAllModalVideos = () => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }

  // When fullscreen opens
  useEffect(() => {
    if (currentIndex !== null && mode === "video") {
      // Pause modal videos
      pauseAllModalVideos()
      // Play fullscreen video automatically after render
      setTimeout(() => {
        if (fullscreenVideoRef.current) {
          fullscreenVideoRef.current.play()
        }
      }, 50)
    } else {
      // When fullscreen closes, stop fullscreen video
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause()
        fullscreenVideoRef.current.currentTime = 0
      }
    }
  }, [currentIndex, mode])

  // Prevent background scrolling
  useEffect(() => {
    if (showPhotos || showVideos || currentIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showPhotos, showVideos, currentIndex])

  return (
    <div className="bg-[#faf6e8] min-h-screen px-6 md:px-20 py-16 md:mt-[-1.7rem]">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Our Work Gallery
        </h1>
        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto leading-relaxed">
          Step into our world of transformation — where every space tells a story of care, precision, and spotless excellence.
        </p>
      </div>

      {/* FEATURED PHOTO */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex justify-center w-[200px] m-auto border-b-4 border-[#f0b000] rounded-full">
          Photos
        </h2>
        <img
          src={photos[0]}
          loading="lazy"
          decoding="async"
          onClick={() => {
            setMode("photo")
            setCurrentIndex(0)
          }}
          className="mx-auto w-full md:w-[500px] h-[300px] object-cover rounded-xl cursor-pointer hover:scale-105 transition"
        />
        <button
          onClick={() => setShowPhotos(true)}
          className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full hover:scale-105 transition"
        >
          See More Photos
        </button>
      </section>

      {/* FEATURED VIDEO */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold flex justify-center w-[200px] m-auto border-b-4 border-[#f0b000]  rounded-full mb-5">
          Videos
        </h2>
        <video
          src={videos[0]}
          controls
          preload="metadata"
          onClick={() => {
            pauseAllModalVideos() // ensure no background play
            setMode("video")
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
      </section>

      {/* PHOTO MODAL */}
      {showPhotos && (
        <Modal onClose={() => setShowPhotos(false)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((src, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={src}
                  loading="lazy"
                  decoding="async"
                  onClick={() => {
                    setMode("photo")
                    setCurrentIndex(index)
                  }}
                  className="w-full h-full object-cover cursor-pointer hover:scale-110 transition"
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

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
                  onClick={() => {
                    setMode("video")
                    setCurrentIndex(index)
                  }}
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

          {/* CLOSE */}
          <button
            onClick={() => setCurrentIndex(null)}
            className="fixed top-5 right-6 text-white text-3xl font-bold z-50"
          >
            ✕
          </button>

          <button onClick={prev} className="absolute left-5 text-white text-4xl">‹</button>

          {mode === "photo" ? (
            <img
              src={photos[currentIndex]}
              loading="lazy"
              decoding="async"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="max-w-[90%] max-h-[90%] rounded-xl"
            />
          ) : (
            <video
              ref={fullscreenVideoRef}
              src={videos[currentIndex]}
              controls
              autoPlay
              className="max-w-[90%] max-h-[90%] object-contain rounded-xl"
            />
          )}

          <button onClick={next} className="absolute right-5 text-white text-4xl">›</button>
        </div>
      )}

    </div>
  )
}

/* MODAL */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start overflow-y-auto">
      <div className="bg-[#fadd8d] rounded-xl max-w-5xl w-full relative p-6 mt-10 mb-10">
        <button
          onClick={onClose}
          className="fixed top-5 right-6 text-black bg-[#f0b000] p-3 text-3xl font-bold z-50"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export default Gallery