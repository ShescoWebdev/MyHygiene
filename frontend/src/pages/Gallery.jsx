import { useState, useRef, useEffect } from "react"
import PageWrapper from "../components/PageWrapper"

function Gallery() {

  const photos = [
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993567/Img1_djwcln.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993779/Img52_pu7tzn.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993566/Img2_r8cmmw.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993605/Img8_okxli3.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993620/Img5_r9mt3t.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993713/Img43_qmpmkx.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993716/Img45_lz2rqp.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993681/Img28_dasjvl.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993669/Img22_rte0f2.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993673/Img23_pkzk4p.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993577/Img3_wdfuwr.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993666/Img26_zw5bgt.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993625/Img6_jc4ak9.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993612/Img7_v67kic.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993583/Img9_pqoywv.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993588/Img10_gcjyaq.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993622/Img11_bktmvm.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993620/Img12_lzdntt.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993650/Img13_xgyfbt.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993644/Img14_nsmz02.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993627/Img15_iwuxvn.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993631/Img16_l3ofdd.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993628/Img17_ffnopc.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993646/Img18_hfxunm.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993644/Img19_sdvzze.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993660/Img20_wwicne.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993641/Img21_gjwp7x.jpg",
    "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993656/Img25_knxzvp.jpg",
  ]


  const videos = [
    "https://res.cloudinary.com/detg3ravj/video/upload/f_auto,q_auto,w_1200/v1774993190/vid1_watb2r.mp4",
    "https://res.cloudinary.com/detg3ravj/video/upload/f_auto,q_auto,w_1200/v1774993202/vid2_eaohxp.mp4",
    "https://res.cloudinary.com/detg3ravj/video/upload/f_auto,q_auto,w_1200/v1774993221/vid3_o6vyno.mp4"
  ]

  const [showPhotos, setShowPhotos] = useState(false)
  const [showVideos, setShowVideos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [mode, setMode] = useState(null)

  const featuredVideoRef = useRef(null)

  // 👉 PHOTO SWIPE STATE
  const touchStartX = useRef(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const videoRefs = useRef([])
  const fullscreenVideoRef = useRef(null)

  const next = () => {
    const list = mode === "photo" ? photos : videos
    setCurrentIndex((prev) => (prev + 1) % list.length)
  }

  const prev = () => {
    const list = mode === "photo" ? photos : videos
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length)
  }

  // 👉 PHOTO SWIPE
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const currentX = e.touches[0].clientX
    setDragX(currentX - touchStartX.current)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    if (dragX < -80) next()
    else if (dragX > 80) prev()

    setDragX(0)
  }

  // VIDEO CONTROL
  const handlePlay = (index) => {
    videoRefs.current.forEach((vid, i) => {
      if (vid && i !== index) {
        try { vid.pause() } catch {}
      }
    })
  }

  const pauseAllModalVideos = () => {
    videoRefs.current.forEach((vid) => {
      if (vid) {
        vid.pause()
        vid.currentTime = 0
      }
    })
  }

  // Pause featured video when modal opens
  useEffect(() => {
    if (showVideos && featuredVideoRef.current) {
      try {
        featuredVideoRef.current.pause()
        featuredVideoRef.current.currentTime = 0
      } catch {}
    }
  }, [showVideos])

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

  // FULLSCREEN VIDEO
  useEffect(() => {
    if (currentIndex !== null && mode === "video") {
      pauseAllModalVideos()
      setTimeout(() => {
        fullscreenVideoRef.current?.play().catch(() => {})
      }, 50)
    } else {
      if (fullscreenVideoRef.current) {
        fullscreenVideoRef.current.pause()
        fullscreenVideoRef.current.currentTime = 0
      }
    }
  }, [currentIndex, mode])

  useEffect(() => {
  if (showPhotos || showVideos || currentIndex !== null) {
    // Lock scroll
    const scrollY = window.scrollY

    document.body.style.position = "fixed"
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = "0"
    document.body.style.right = "0"
    document.body.style.width = "100%"
  } else {
    // Restore scroll
    const scrollY = document.body.style.top

    document.body.style.position = ""
    document.body.style.top = ""
    document.body.style.left = ""
    document.body.style.right = ""
    document.body.style.width = ""

    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }
}, [showPhotos, showVideos, currentIndex])

  return (
    <PageWrapper>
      <div className="bg-[#faf6e8] min-h-screen px-6 md:px-20 py-16">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Our Work Gallery
          </h1>
        </div>

        {/* PHOTOS */}
        <section className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl mb-6 border-b-4 border-[#f0b000] w-[200px] m-auto">
            Photos
          </h2>

          <img
            src={photos[0]}
            onClick={() => {
              setMode("photo")
              setCurrentIndex(0)
            }}
            className="mx-auto w-full md:w-[500px] h-[300px] object-cover rounded-xl cursor-pointer"
          />

          <button
            onClick={() => setShowPhotos(true)}
            className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full"
          >
            See More Photos
          </button>
        </section>

        {/* VIDEOS */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl mb-5 border-b-4 border-[#f0b000] w-[200px] m-auto">
            Videos
          </h2>

          <video
            ref={featuredVideoRef}
            src={videos[0]}
            controls
            onClick={() => {
              pauseAllModalVideos()
              setMode("video")
              setCurrentIndex(0)
            }}
            className="mx-auto w-full md:w-[500px] h-[300px] object-cover rounded-xl"
          />

          <button
            onClick={() => setShowVideos(true)}
            className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full"
          >
            See More Videos
          </button>

          <div className='about3 text-black w-[20rem] m-auto md:w-[75rem] mt-10 p-10 bg-[#f4d171] flex flex-col rounded-3xl'>
            <h1 className='text-center text-2xl md:text-4xl leading-relaxed text-blue-800 font-bold'>
              Enjoy our work gallery!
            </h1>
          </div>
        </section>

        {/* PHOTO MODAL */}
        {showPhotos && (
          <Modal onClose={() => setShowPhotos(false)}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  onClick={() => {
                    setMode("photo")
                    setCurrentIndex(index)
                  }}
                  className="aspect-square object-cover rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </Modal>
        )}

        {/* VIDEO MODAL */}
        {showVideos && (
          <Modal onClose={() => setShowVideos(false)}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {videos.map((src, index) => (
                <video
                  key={index}
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={src}
                  controls
                  onPlay={() => handlePlay(index)}
                  onClick={() => {
                    setMode("video")
                    setCurrentIndex(index)
                  }}
                  className="aspect-square object-cover rounded-lg"
                />
              ))}
            </div>
          </Modal>
        )}

        {/* FULLSCREEN */}
        {currentIndex !== null && (
          <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden z-50">

            <button
              onClick={() => setCurrentIndex(null)}
              className="fixed top-5 right-6 text-white text-3xl z-[999] pointer-events-auto"
            >
              ✕
            </button>

            {mode === "photo" ? (
              <div
                className="flex md:m-10"
                style={{
                  transform: `translateX(calc(${-currentIndex * 100}% + ${dragX}px))`,
                  transition: isDragging ? "none" : "0.3s ease"
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {photos.map((src, i) => (
                  <div key={i} className="min-w-full flex justify-center items-center">
                    <img
                      src={src}
                      className="max-w-[90%] max-h-[90%] rounded-xl pointer-events-none"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <video
                ref={fullscreenVideoRef}
                src={videos[currentIndex]}
                controls
                autoPlay
                className="max-w-[90%] max-h-[90%]"
              />
            )}

          </div>
        )}

      </div>
    </PageWrapper>
  )
}

/* MODAL */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start overflow-y-auto">
      <div className="bg-[#fadd8d] rounded-xl max-w-5xl w-full p-6 mt-10 mb-10">
        <button
          onClick={onClose}
          className="fixed top-5 right-6 text-black bg-[#f0b000] p-3 text-3xl z-[999]"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export default Gallery