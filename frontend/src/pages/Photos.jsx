import { useState, useRef, useEffect } from "react"
import PageWrapper from "../components/PageWrapper"
import Skeleton from "../components/Skeleton"

function Photos() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

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

  const [showPhotos, setShowPhotos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)

  // 👉 Swipe state
  const touchStartX = useRef(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }

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

  useEffect(() => {
    if (showPhotos || currentIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [showPhotos, currentIndex])

  return (
    <PageWrapper>
      <div className="bg-[#faf6e8] min-h-screen pt-16 px-6 md:px-20">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">
            Our Photo Gallery
          </h1>
          <p className="text-gray-600 md:text-lg max-w-2xl mx-auto">
            Take a look at some of our work!
          </p>
        </div>

        {/* FEATURED */}
        <section className="text-center mb-16">
          {loading ? (
            <Skeleton className="w-[22.5rem] h-[19rem] md:w-[32rem] m-auto rounded-2xl" />
          ) : (
            <img
              src={photos[0]}
              onClick={() => setCurrentIndex(0)}
              className="mx-auto w-full md:w-[500px] h-[300px] object-cover rounded-xl cursor-pointer"
            />
          )}

          <button
            onClick={() => setShowPhotos(true)}
            className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full"
          >
            See More Photos
          </button>

          <div className='about3 text-black w-[20rem] m-auto md:w-[75rem] mt-10 p-10 bg-[#f4d171] flex flex-col rounded-3xl'>
            <h1 className='text-center text-2xl md:text-4xl leading-relaxed text-blue-800 font-bold'>
              Enjoy our photo gallery!
            </h1>
          </div>
        </section>

        {/* GRID MODAL */}
        {showPhotos && (
          <Modal onClose={() => setShowPhotos(false)}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  onClick={() => setCurrentIndex(index)}
                  className="aspect-square object-cover rounded-lg cursor-pointer"
                />
              ))}
            </div>
          </Modal>
        )}

        {/* FULLSCREEN SLIDER */}
        {currentIndex !== null && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center overflow-hidden z-50">

            <button
              onClick={() => setCurrentIndex(null)}
              className="fixed top-5 right-6 text-white text-3xl z-50"
            >
              ✕
            </button>

            <div
              className="flex"
              style={{
                transform: `translateX(calc(${-currentIndex * 100}% + ${dragX}px))`,
                transition: isDragging ? "none" : "transform 0.3s ease"
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {photos.map((src, i) => (
                <div key={i} className="min-w-full flex justify-center items-center">
                  <img
                    src={src}
                    className="max-w-[90%] max-h-[90%] rounded-xl"
                  />
                </div>
              ))}
            </div>

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
      <div className="bg-[#fadd8d] rounded-xl max-w-5xl w-full relative p-6 mt-10 mb-10">
        <button
          onClick={onClose}
          className="fixed top-5 right-6 text-black bg-[#f0b000] p-3 text-3xl z-50"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}

export default Photos