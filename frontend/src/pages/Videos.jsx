import { useState, useRef, useEffect } from "react"
import PageWrapper from "../components/PageWrapper"
import Skeleton from "../components/Skeleton"
import API, { BASE_URL } from "../api"

// Moved outside component so it doesn't recreate on every render
const hardcodedVideos = [
  "https://res.cloudinary.com/detg3ravj/video/upload/q_auto,w_1200/v1774993190/vid1_watb2r.mp4",
  "https://res.cloudinary.com/detg3ravj/video/upload/q_auto,w_1200/v1774993202/vid2_eaohxp.mp4",
  "https://res.cloudinary.com/detg3ravj/video/upload/q_auto,w_1200/v1774993221/vid3_o6vyno.mp4"
];

function Videos() {
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState([]) // dynamic state
  const [showVideos, setShowVideos] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [featuredVideo, setFeaturedVideo] = useState(null);

  // To fetch dynamic videos from backend and merge with hardcoded ones
  useEffect(() => {
    const fetchDynamicVideos = async () => {
      try {
        const { data } = await API.get("/posts");
        const postsArray = data.posts || data;
        
        // To get all dynamic videos
        const dynamicVideos = postsArray.filter(post => post.mediaType === "video" && post.url);
        
        // To find the featured video from the backend
        const featuredBackend = dynamicVideos.find(post => post.isFeatured);
        
        // To set the featured video fallback to the chosen hardcoded one
        const theFeaturedUrl = featuredBackend ? featuredBackend.url : hardcodedVideos[0];
        setFeaturedVideo(theFeaturedUrl);

        // To combine dynamic videos with hardcoded ones, ensuring no duplicates
        const dynamicUrls = dynamicVideos.map(post => post.url);
        setVideos([...dynamicUrls, ...hardcodedVideos]);

      } catch (error) {
        console.error("Failed to fetch gallery videos:", error);
        setVideos(hardcodedVideos);
        setFeaturedVideo(hardcodedVideos[0]);
      } finally {
        setLoading(false);
      }
    };
    fetchDynamicVideos();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        const meta = document.querySelector("meta[name=viewport]")
        if (meta) {
          meta.setAttribute("content","width=device-width, initial-scale=1, maximum-scale=1")
          setTimeout(() => meta.setAttribute("content","width=device-width, initial-scale=1"), 300)
        }
      }
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const videoRefs = useRef([])
  const fullscreenVideoRef = useRef(null)
  const featuredVideoRef = useRef(null)

  const next = () => setCurrentIndex((prev) => (prev + 1) % videos.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)

  const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].screenX }
  const handleTouchMove = (e) => { touchEndX.current = e.changedTouches[0].screenX }
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
  }, [currentIndex, videos.length])

  const pauseAllVideos = () => {
    videoRefs.current.forEach((vid) => {
      if (vid && typeof vid.pause === "function") {
        try { vid.pause() } catch {}
      }
    })
  }

  const handlePlay = (index) => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return
      if (i !== index) {
        try {
          vid.pause()
          vid.currentTime = 0
        } catch {}
      }
    })
  }

  useEffect(() => {
    if (showVideos && featuredVideoRef.current) {
      try {
        featuredVideoRef.current.pause()
        featuredVideoRef.current.currentTime = 0
      } catch {}
    }
  }, [showVideos])

  useEffect(() => {
    if (currentIndex !== null) {
      pauseAllVideos()
      setTimeout(() => {
        if (fullscreenVideoRef.current) fullscreenVideoRef.current.play().catch(() => {})
      }, 100)
    } else {
      if (fullscreenVideoRef.current) {
        try {
          fullscreenVideoRef.current.pause()
          fullscreenVideoRef.current.currentTime = 0
        } catch {}
      }
    }
  }, [currentIndex])

  useEffect(() => {
    if (showVideos || currentIndex !== null) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => { document.body.style.overflow = "auto" }
  }, [showVideos, currentIndex])

  if (showVideos) { videoRefs.current = [] }

  const getMediaUrl = (url) => {
    if (!url) return "";
    return url.startsWith("http") ? url : `${BASE_URL}/${url}`;
  };

  return (
    <PageWrapper>
      <div className="bg-[#faf6e8] min-h-screen pt-16 px-6 md:px-20 md:pt-16 py-1 md:mt-[-1.7rem]">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-semibold mb-4">Our Video Gallery</h1>
        </div>

        {/* Featured Video */}
        <section className="text-center mb-16">
          {loading ? (
            <Skeleton className="w-[22.5rem] h-[25rem] md:w-[50rem] m-auto rounded-2xl" />
          ) : featuredVideo && (
            <video
              controls
              preload="metadata"
              ref={featuredVideoRef}
              src={getMediaUrl(featuredVideo)}
              onClick={() => {
                if (window.innerWidth < 768) {
                  pauseAllVideos()
                  const idx = videos.indexOf(featuredVideo);
                  setCurrentIndex(idx !== -1 ? idx : 0);
                }
              }}
              className="mx-auto w-full md:w-[800px] h-[450px] object-cover rounded-xl cursor-pointer bg-black"
            />
          )}

          <button onClick={() => setShowVideos(true)} className="mt-4 px-6 py-2 bg-[#f0b000] rounded-full">
            See More Videos
          </button>

          <div className='about3 text-black w-[20rem] m-auto md:w-[70rem] mt-10 p-10 bg-[#f4d171] rounded-3xl'>
            <h1 className='text-center text-2xl md:text-4xl leading-relaxed text-blue-800 font-bold'>
              Enjoy our video gallery
            </h1>
          </div>
        </section>

        {/* Video Grid Modal */}
        {showVideos && (
          <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-start overflow-y-auto">
            <div className="bg-[#fadd8d] rounded-xl max-w-5xl w-full relative p-6 mt-10 mb-10">
              <button onClick={() => setShowVideos(false)} className="fixed top-5 right-6 text-black bg-[#f0b000] p-3 text-3xl z-50">✕</button>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {videos.map((src, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-lg bg-black">
                    <video
                      ref={(el) => { if (el) videoRefs.current[index] = el }}
                      src={getMediaUrl(src)}
                      controls
                      preload="metadata"
                      onPlay={() => handlePlay(index)}
                      onClick={() => {
                        if (window.innerWidth < 768) {
                          handlePlay(index) 
                          setCurrentIndex(index)
                        }
                      }}
                      className="w-full h-full object-cover cursor-pointer md:cursor-default"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen View */}
        {currentIndex !== null && (
          <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
            <button onClick={() => setCurrentIndex(null)} className="fixed top-5 right-6 text-white text-3xl z-50">✕</button>
            <button onClick={prev} className="absolute left-5 text-white text-4xl">‹</button>

            <video
              ref={fullscreenVideoRef}
              src={getMediaUrl(videos[currentIndex])}
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
    </PageWrapper>
  )
}

export default Videos