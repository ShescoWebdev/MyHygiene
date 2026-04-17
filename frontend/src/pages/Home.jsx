import { useState, useEffect, useRef } from 'react'
import Testimonials from '../components/layout/Testimonials'
import { useNavigate } from "react-router-dom";
import PageWrapper from '../components/PageWrapper';

function Home() {

  const videoRef = useRef(null)

useEffect(() => {
  const video = videoRef.current
  if (!video) return

  video.muted = true
  video.defaultMuted = true
  video.setAttribute("muted", "")
  video.setAttribute("playsinline", "")
  video.setAttribute("webkit-playsinline", "")

  const playVideo = () => {
    const promise = video.play()
    if (promise !== undefined) {
      promise.catch(() => {
        // Try again after slight delay (mobile fix)
        setTimeout(() => {
          video.play().catch(() => {})
        }, 800)
      })
    }
  }

  // Delay play slightly (important for mobile)
  setTimeout(playVideo, 300)

}, [])

  const navigate = useNavigate();


      const images = [
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993489/Home2_xuaqyh.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993532/Home3_b29baz.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993479/Home7_w7t1jt.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993535/Home13_yxjo05.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993544/Home10_jsuc6z.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993497/Home5_lpuors.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993485/Home8_wkfobz.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993538/Home9_bo4zjk.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993533/Home11_q2wzlt.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993559/Home14_axbmti.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993508/Home1_vztsya.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993471/Home6_nirlrl.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993498/Home4_s1gric.jpg",
      "https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993527/Home12_cw51lu.jpg",
    ]

  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Preload only first slider image
  useEffect(() => {
    const img = new Image()
    img.src = images[0]
  }, [])

  return (
      <PageWrapper>
    <div className='home'>

      <div className="home1 bg-yellow-500">
        <video
  ref={videoRef}
  loop
  muted
  playsInline
  autoPlay
  preload="auto"
  poster="https://res.cloudinary.com/detg3ravj/image/upload/v1774993489/Home2_xuaqyh.jpg"
  className="video-bg"
>
  <source
    src="https://res.cloudinary.com/detg3ravj/video/upload/q_auto,w_1200/v1774993190/vid1_watb2r.mp4"
    type="video/mp4"
  />
</video>

        <div className="video-overlay"></div>

        <div className="video-content">
          <h1 className='text-3xl md:text-5xl font-bold pb-5'>Beyond Cleaning</h1>
          <p className='text-lg md:text-2xl'>We Create Healthy Living Spaces</p>
          <img
            src="https://res.cloudinary.com/detg3ravj/image/upload/v1774993804/Logo4_zwdhvr.png"
            alt="MyHygiene Logo"
            width="200"
            height="80"
            loading="lazy"
          />
        </div>
      </div>

      <div className='home2 text-black p-10 pb-20 md:pb-0 flex flex-col gap-5 justify-between items-center md:flex-row md:h-[calc(100vh-64px)]'>
        <div>
          <h1 className='text-2xl md:text-4xl font-semibold'>
            <img 
            src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993795/Logo3_ueigkn.png" 
            className='text-sm' 
            alt="MyHygiene Logo" 
            width="130" 
            height="50" 
            loading="lazy"
            decoding='async' />
            We provide -
          </h1> <br />
          <p className='text-xl md:text-2xl leading-relaxed'>
            professional cleaning, <br />
            laundry, & hygiene solutions <br />
            to keep your home & workplace spotless, fresh, & healthy.
          </p><br /><br />

          <button
            onClick={() => navigate("/book-choice")}
            className="shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        <div>
          <img
            src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993605/Img8_okxli3.jpg"
            width={900}
            alt="Professional Cleaning"
            className='rounded-2xl h-[235px] md:h-full'
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      <div className='home3 bg-green-100 p-10 pb-20 md:pb-28 flex flex-col gap-14 md:flex-row items-center md:h-[120vh]'>
        <div>
          <h1 className='text-3xl md:text-4xl font-semibold md:pt-24'>
            <img 
            src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993795/Logo3_ueigkn.png" className='text-sm' 
            alt="MyHygiene Logo"
             width="130" 
             height="50" 
             loading="lazy" />
            How it works
          </h1>

          <p className='text-xl md:text-2xl pt-4 leading-relaxed'>
            Booking on MyHygiene is simple & straighforward!
            Get started in these four easy steps:
          </p>
          <br />
          <ol className="list-decimal list-inside space-y-3 marker:text-blue-600 marker:font-bold marker:text-lg md:marker:text-xl">
            <li className='text-sm md:text-xl'><b className='text-blue-600'>Select Your Service:</b><br />Click on any of the "Book Now" buttons to take you to the page where you can either book as a guest (without logging in), or create an account and log in (this allows you to save your details for faster booking in the future).</li>
            <li className='text-sm md:text-xl'><b className='text-blue-600'>Schedule Your Appointment:</b><br /> Once you have visited the booking page either as a guest or logged in, choose from our services of cleaning, laundry, or hygiene services that best suit your needs. Pick a date and time that works for you, and we'll take care of the rest.</li>
            <li className='text-sm md:text-xl'><b className='text-blue-600'>Professional Service:</b> Our trained professionals will arrive on time, equipped with the necessary tools to provide top-notch service.</li>
            <li className='text-sm md:text-xl'><b className='text-blue-600'>Enjoy a Clean Space:</b><br /> Sit back and relax while we transform your home or workplace into a spotless, fresh, and healthy environment.</li>
          </ol>

          <br />

          <button
            onClick={() => navigate("/book-choice")}
            className="shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        <div className="relative w-full h-full overflow-hidden rounded-2xl">
          <div
            className="flex h-full transition-transform duration-500"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Cleaning"
                loading="lazy"
                decoding="async"
                className="w-full md:h-full object-cover flex-shrink-0"
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#f0b000]/50 text-black text-2xl font-bold px-3 py-1 rounded cursor-pointer"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#f0b000]/50 text-black text-2xl font-bold px-3 py-1 rounded cursor-pointer"
          >
            ›
          </button>
        </div>
      </div>

      <div className='home4 text-black p-10 flex flex-col items-center gap-10 md:flex-row'>
        <div className='order-2 md:order-1'>
          <img src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993462/Gladys_iqxesq.jpg" 
          alt="Professional Cleaning" 
          className='rounded-2xl
          text-sm 
          md:w-[110rem] md-full md:h-[48rem]' 
          loading="lazy"
          decoding="async" />
        </div>

        <div className='order-1'>
          <h1 className='text-2xl md:text-3xl leading-relaxed font-semibold'>
            <img src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993795/Logo3_ueigkn.png" alt="MyHygiene Logo" className='text-sm' width="130" height="50" loading="lazy" />
            Why Choose MyHygiene?
          </h1>
          <p className='text-[1.20rem] md:text-[1.25rem] pt-2'>
            We make sure that the following are at the core of everything we do:
          </p>
          <ul className='list-disc pl-5 marker:text-blue-600 md:text-[1.25rem]'>
            <li className='pt-4'><b className='text-blue-600'>Professional and reliable team:</b><br /> We understand the importance of punctuality and consistency. You can count on us to arrive on time and deliver exceptional service every time.</li>
            <li className='pt-4'><b className='text-blue-600'>Attention to detail:</b><br /> We pay close attention to every aspect of the cleaning process, ensuring that no area is overlooked.</li>
            <li className='pt-4'><b className='text-blue-600'>Customer Satisfaction:</b><br /> Your satisfaction is our priority. We go above and beyond to ensure that you are happy with our services, and we welcome your feedback to continuously improve.</li>
            <li className='pt-4'><b className='text-blue-600'>Affordable pricing:</b><br /> We offer competitive rates without compromising on quality, making our services accessible to everyone.</li>
            <li className='pt-4'><b className='text-blue-600'>All-in-one hygiene solution (cleaning, laundry, and products):</b><br /> We provide a comprehensive range of hygiene services under one roof. Just call us and we'll take care of everything!</li>
          </ul>
          <br /><br />

          <button
            onClick={() => navigate("/book-choice")}
            className="shesco-btn ml-7 px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>


      <div className='home4 text-black p-10 flex flex-col items-center gap-8 justify-between md:flex-row md:h-[110vh] bg-green-100'>
        <div className='order-1 md:pl-10'>
          <h1 className='text-3xl md:text-4xl leading-relaxed font-semibold'>
            <img 
            src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993795/Logo3_ueigkn.png" alt="MyHygiene Logo" 
            className='text-sm' 
            width="130" height="50" 
            loading="lazy" 
            decoding="async" />
            We are here for you!
          </h1>
          <p className='text-xl md:text-[1.25rem] pt-4 leading-relaxed'>
            Monday morning? Saturday afternoon? <br />
            Whatever time works for you, MyHygien is available <br />
            from Mon - Sat! <br />
            Our team can arrive at your home <br />
            from 7am - 4pm daily.
          </p>
          <br /><br />

          <button
            onClick={() => navigate("/book-choice")}
            className="shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        <div className='order-2'>
          <img 
          src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1775041383/Glad_klpxve.jpg" 
          width={600} height={400} 
          alt="Professional Cleaning" 
          className='rounded-2xl text-sm' 
          loading="lazy" />
        </div>
      </div>


      <div className='p-10 pb-20 md:h-[110vh]'>
        <h1 className='text-2xl md:text-4xl font-[410] flex flex-col pt-10 mb-10'>
          <img 
          src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993795/Logo3_ueigkn.png" alt="MyHygiene Logo" 
          className='text-sm' 
          width="130" height="50" 
          loading="lazy"
          decoding="async" />
          What our customers say about MyHygiene
        </h1>

        <div className='mb-20'>
          <button
            onClick={() => navigate("/book-choice")}
            className="shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
          >
            Book Now
          </button>
        </div>

        <Testimonials />
      </div>

    </div>
    </PageWrapper>
  )
}

export default Home