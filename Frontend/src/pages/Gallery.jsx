import { useState, useRef, useEffect } from "react"

function Gallery() {

  const photos = [
    "/photos/Home1.jpg",
    "/photos/Home2.jpg",
    "/photos/Home3.jpg",
    "/photos/Home4.jpg",
    "/photos/Home5.jpg",
    "/photos/Home6.jpg"
  ]

  const videos = [
    "/videos/Home-video.mp4",
    "/videos/Home-video.mp4"
  ]

  const [showPhotos, setShowPhotos] = useState(false)
  const [showVideos, setShowVideos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [mode, setMode] = useState(null) // "photo" or "video"

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const videoRefs = useRef([])

  // 👉 NAVIGATION
  const next = () => {
    const list = mode === "photo" ? photos : videos
    setCurrentIndex((prev) => (prev + 1) % list.length)
  }

  const prev = () => {
    const list = mode === "photo" ? photos : videos
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length)
  }

  // 👉 SWIPE (mobile)
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

  //  KEYBOARD (PC)
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

  //  STOP OTHER VIDEOS
  const handlePlay = (index) => {
    videoRefs.current.forEach((vid, i) => {
      if (vid && i !== index) {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }

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
        <h1 className="text-3xl md:text-5xl font-semibold mb-4 ">
          Our Work Gallery
        </h1>

        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto leading-relaxed">
        Step into our world of transformation — where every space tells a story of care, precision, and spotless excellence. 
        From homes to offices, these moments capture the standard we proudly deliver.
        </p>
      </div>

      {/* FEATURED PHOTO */}
      <section className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 flex items-center justify-center w-[300px] m-auto h-8 p-3 bg-[#f0b000] rounded-full">
  
        - Photos -
        </h2>

        <img
          src={photos[0]}
          loading="lazy"
          onClick={() => {
            setMode("photo")
            setCurrentIndex(0)
          }}
          className="mx-auto w-full md:w-[500px] h-[300px] object-cover rounded-xl cursor-pointer hover:scale-105 transition"
        />

        <button
          onClick={() => setShowPhotos(true)}
          className="mt-4 px-6 py-2 bg-[#f0b000] mb-52 rounded-full hover:scale-105 transition cursor-pointer"
        >
          See More Photos
        </button>
      </section>

      {/* FEATURED VIDEO */}
      <section className="text-center">
        <h2 className="text-2xl md:text-3xl font-semibold flex items-center justify-center w-[300px] m-auto h-8 p-3 bg-[#f0b000] rounded-full mb-[-25px] md:mb-5">

        - Videos -
        </h2>

        <video
          src={videos[0]}
          controls
          className="mx-auto w-full md:w-[500px] h-[300px] rounded-xl"
        />

        <button
          onClick={() => setShowVideos(true)}
          className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full hover:scale-105 transition cursor-pointer"
        >
          See More Videos
        </button>
      </section>

      {/* PHOTO MODAL */}
      {showPhotos && (
        <Modal onClose={() => setShowPhotos(false)}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((src, index) => (
              <img
                key={index}
                src={src}
                loading="lazy"
                onClick={() => {
                  setMode("photo")
                  setCurrentIndex(index)
                }}
                className="rounded-lg cursor-pointer hover:scale-105 transition"
              />
            ))}
          </div>
        </Modal>
      )}

      {/* VIDEO MODAL */}
      {showVideos && (
        <Modal onClose={() => setShowVideos(false)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {videos.map((src, index) => (
              <video
                key={index}
                ref={(el) => (videoRefs.current[index] = el)}
                src={src}
                controls
                onPlay={() => handlePlay(index)}
                className="rounded-lg"
              />
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
            className="absolute top-5 right-6 text-white text-3xl font-bold cursor-pointer"
          >
            ✕
          </button>

          {/* LEFT */}
          <button onClick={prev} className="absolute left-5 text-white text-4xl cursor-pointer">
            ‹
          </button>

          {/* CONTENT */}
          {mode === "photo" ? (
            <img
              src={photos[currentIndex]}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="max-w-[90%] max-h-[90%] rounded-xl"
            />
          ) : (
            <video
              src={videos[currentIndex]}
              controls
              autoPlay
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="max-w-[90%] max-h-[90%] rounded-xl"
            />
          )}

          {/* RIGHT */}
          <button onClick={next} className="absolute right-5 text-white text-4xl cursor-pointer">
            ›
          </button>

        </div>
      )}

    </div>
  )
}

// MODAL
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-xl max-w-5xl w-full relative p-10">

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-xl font-bold cursor-pointer"
        >
          ✕
        </button>

        {children}

      </div>
    </div>
  )
}

export default Gallery