import { useState, useRef, useEffect } from "react"

function Photos() {

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

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
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

  // Prevent background scrolling
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
    <div className="bg-[#faf6e8] min-h-screen pt-16 px-6 md:px-20 md:pt-16 py-1 md:mt-[-1.7rem]">

      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Our Photo Gallery
        </h1>
        <p className="text-gray-600 md:text-lg max-w-2xl mx-auto leading-relaxed">
            Take a look at some of our work! And our team photos on some of our journeys. Our photo gallery showcases the quality and professionalism we bring to every project. From sparkling kitchens to pristine bathrooms, see how we transform spaces and deliver exceptional results.
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
          onClick={() => setCurrentIndex(0)}
          className="mx-auto text-sm w-full md:w-[500px] h-[300px] object-cover rounded-xl cursor-pointer hover:scale-105 transition"
        />
        <button
          onClick={() => setShowPhotos(true)}
          className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full hover:scale-105 transition"
        >
          See More Photos
        </button>

        <div className='about3 text-black w-[20rem] m-auto md:w-[75rem] mt-10 p-10 bg-[#f4d171] flex flex-col rounded-3xl'>
          <h1 className='text-center text-2xl md:text-4xl leading-relaxed text-blue-800 font-bold'>Enjoy our video gallery!</h1>
        </div>
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
                  onClick={() => setCurrentIndex(index)}
                  className="w-full h-full object-cover cursor-pointer hover:scale-110 transition"
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

          <img
            src={photos[currentIndex]}
            loading="lazy"
            decoding="async"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />

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

export default Photos