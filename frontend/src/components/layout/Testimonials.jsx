import { useState, useEffect, useRef } from "react"
import { Star } from "lucide-react"

function Testimonials() {

  const data = [
    { id: 1, text: "MyHygiene transformed my home completely.", color: "bg-blue-200" },
    { id: 2, text: "Top-notch service. I felt like royalty!", color: "bg-green-200" },
    { id: 3, text: "Fast and reliable. Highly recommend!", color: "bg-yellow-200" },
    { id: 4, text: "My office has never looked this clean.", color: "bg-purple-200" },
    { id: 5, text: "Absolutely worth every penny.", color: "bg-pink-200" },
    { id: 6, text: "They exceeded my expectations!", color: "bg-orange-200" },
    { id: 7, text: "Very professional staff.", color: "bg-cyan-200" },
    { id: 8, text: "My apartment smells amazing!", color: "bg-lime-200" },
    { id: 9, text: "Quick and detailed cleaning.", color: "bg-rose-200" },
    { id: 10, text: "Best cleaning service ever.", color: "bg-indigo-200" },
  ]

  const [items, setItems] = useState(data)
  const [isSliding, setIsSliding] = useState(false)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const containerRef = useRef()

  const READ_TIME = 3000   // <-- CHANGE THIS (3000 = 3 seconds)
  const FLIP_DELAY = 700   // time before flip starts
  const SLIDE_DURATION = 700 // must match transition duration-700

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return

    const interval = setInterval(() => {

      setActive(0)

      // Flip after slight delay
      setTimeout(() => {
        setIsSliding(false)
      }, FLIP_DELAY)

      // Wait for reading time before sliding
      setTimeout(() => {
        setIsSliding(true)
      }, READ_TIME)

      // After slide animation completes
      setTimeout(() => {
        setItems(prev => {
          const first = prev[0]
          return [...prev.slice(1), first]
        })
        setIsSliding(false)
        setActive(-1)
      }, READ_TIME + SLIDE_DURATION)

    }, READ_TIME + SLIDE_DURATION + 1000)

    return () => clearInterval(interval)
  }, [paused])

  // DRAG / SWIPE
  let isDown = false
  let startX
  let scrollLeft

  const handleMouseDown = (e) => {
    isDown = true
    startX = e.pageX - containerRef.current.offsetLeft
    scrollLeft = containerRef.current.scrollLeft
    setPaused(true)
  }

  const handleMouseLeave = () => {
    isDown = false
    setPaused(false)
  }

  const handleMouseUp = () => {
    isDown = false
    setPaused(false)
  }

  const handleMouseMove = (e) => {
    if (!isDown) return
    e.preventDefault()
    const x = e.pageX - containerRef.current.offsetLeft
    const walk = (x - startX) * 1.5
    containerRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      ref={containerRef}
      className="overflow-x-auto scrollbar-hide"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >

      <div
        className={`flex gap-4 w-max transition-transform duration-700 ${
          isSliding ? "-translate-x-[240px]" : ""
        }`}
      >
        {items.map((item, index) => (
          <Card
            key={item.id}
            data={item}
            isFlipped={index === active}
          />
        ))}
      </div>

    </div>
  )
}


function Card({ data, isFlipped }) {

  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="w-[250px] md:w-[250px] h-[300px] md:h-[300px] shrink-0 perspective cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ${
          isFlipped || hovered ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >

        {/* FRONT */}
        <div
          className={`absolute w-full h-full ${data.color} flex items-center justify-center rounded-xl`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <img src="/photos/Logo3.png" className="w-44" />
        </div>

        {/* BACK */}
        <div
          className="absolute w-full h-full bg-white flex flex-col items-center justify-center p-3 rounded-xl"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden"
          }}
        >
          <div className="flex mb-10">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-yellow-500 fill-yellow-500" />
            ))}
          </div>

          <p className="text-sm text-center">{data.text}</p>
        </div>

      </div>
    </div>
  )
}

export default Testimonials