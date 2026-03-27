import { useState, useEffect } from 'react'
import Testimonials from '../components/layout/Testimonials'

function Home() {
  const images = [
  "/photos/Home2.jpg",
  "/photos/Home3.jpg",
  "/photos/Home7.jpg",
  "/photos/Home13.jpg",
  "/photos/Home10.jpg",
  "/photos/Home5.jpg",
  "/photos/Home8.JPG",
  "/photos/Home9.jpg",
  "/photos/Home11.jpg",
  "/photos/Home14.jpg",
  "/photos/Home1.jpg",
  "/photos/Home6.JPG",
  "/photos/Home4.jpg",
  "/photos/Home12.jpg",
]

const [current, setCurrent] = useState(0)


const nextSlide = () => {
  setCurrent((prev) => (prev + 1) % images.length)
}

const prevSlide = () => {
  setCurrent((prev) => (prev - 1 + images.length) % images.length)
}

useEffect(() => {
  const interval = setInterval(() => {
    nextSlide()
  }, 4000)

  return () => clearInterval(interval)
}, [])
  return (
    <div className='home'>
        <div className="home1">
          <video autoPlay loop muted playsInline className="video-bg">
        <source src="/videos/Home-video.mp4" type="video/mp4" />
        </video>

         <div className="video-overlay"></div>

          <div className="video-content">
            <h1 className='text-3xl md:text-5xl font-bold pb-5'>Beyond Cleaning</h1>
          <p className='text-lg md:text-2xl'>We Create Healthy Living Spaces</p>
          <img src="/photos/Logo4.png" alt="MyHygiene Logo" width="200" height="80" />
          </div>
    </div>

      

      <div className='home2 text-black p-10 pb-20 md:pb-0 flex flex-col gap-5 justify-between items-center md:flex-row md:h-[calc(100vh-64px)]'>
        <div>
          <h1 className='text-xl md:text-4xl font-[410]'>
            <img src="photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
            We provide -</h1> <br /> 
            <p className='text-xl md:text-2xl leading-relaxed'>professional cleaning, <br /> laundry, & hygiene solutions <br /> to keep your home & workplace spotless, fresh, & healthy.</p><br /><br />
        <button className="px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer">
            Book Now
          </button>
        </div>

          <br />
        <div>
          <img src="/photos/Home1.jpg" width={900} alt="Professional Cleaning" className='rounded-2xl'/>
        </div>
      </div>

      <div className='home3 bg-green-100 p-10 pb-20 md:pb-28 flex flex-col gap-5 md:flex-row items-center md:justify-between md:h-[110vh]'>
      <div>
        <h1 className='text-3xl md:text-4xl font-[410] pt-24'>
          <img src="photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
          How it works</h1>
      <p className='text-lg md:text-2xl leading-relaxed'>Booking on MyHygiene is simple & straighforward! <br />
      Get started in these four easy steps:</p> <br /><br />

      <ol className="list-decimal list-inside space-y-3 marker:text-blue-600 marker:font-bold marker:text-lg md:marker:text-xl">
        <li className='text-sm md:text-xl'><b className='text-blue-600'>Select Your Service:</b> Choose from our range of cleaning, <br /> laundry, or hygiene services that best suit your needs.</li>

        <li className='text-sm md:text-xl'><b className='text-blue-600'>Schedule Your Appointment:</b> Pick a date and time that works for you, <br /> and we'll take care of the rest.</li>

        <li className='text-sm md:text-xl'><b className='text-blue-600'>Professional Service:</b> Our trained professionals will arrive on time, <br /> equipped with the necessary tools to provide top-notch service.</li>
        
        <li className='text-sm md:text-xl'><b className='text-blue-600'>Enjoy a Clean Space:</b> Sit back and relax while we transform <br /> your home or workplace into a spotless, fresh, and healthy environment.</li>
      </ol>

      <br />
      <button className="px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer">
            Book Now
          </button>
      </div>


    <div className="relative w-full md:w-[600px] h-full overflow-hidden rounded-2xl">
  <div
    className="flex h-full transition-transform duration-500"
    style={{ transform: `translateX(-${current * 100}%)` }}
  >
    {images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt="Cleaning"
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



      <div className='home4 text-black p-10 flex flex-col items-center gap-22 md:flex-row md:h-[110vh]'>
        <div className='order-2 md:order-1'>
          <img src="/photos/Gladys.jpeg" width={600} height={400} alt="Professional Cleaning" className='rounded-2xl'/>
        </div>

        <div className='order-1 md:order-2'>
          <h1 className='text-xl md:text-4xl leading-relaxed font-[410]'>
            <img src="/photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
            We are here for you!</h1> <br /> 
            <p className='text-xl md:text-[1.25rem] leading-relaxed'>Monday morning? Saturday afternoon? <br />
        Whatever time works for you, MyHygien is available <br /> from Mon - Sat! <br /> Our team can arrive at your home <br /> from 7am - 4pm daily. <br />🎵Oh men, we're active!🎵</p><br /><br />
        <button className="px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer">
            Book Now
          </button>
        </div>
      </div>



      <div className='home5 text-black bg-[#faf6e8] p-10 flex flex-col items-center gap-16 md:flex-row md:h-[125vh]'>
        <div>
          <h1 className='text-xl md:text-4xl leading-relaxed font-[410]'>
            <img src="/photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
            Why Choose MyHygiene?</h1> 
            <p className='text-xl md:text-[1.25rem] leading-relaxed'>We make sure the following is true:</p><br />
            <ul className="list-disc list-inside space-y-3 marker:text-blue-600 marker:font-bold marker:text-lg md:marker:text-xl">
              <li className='text-sm md:text-xl'><b className='text-blue-600'>Professional and reliable team:</b><br /> Our team is background-checked, trained, <br /> and dedicated to providing reliable and high-quality service.</li>
              <li className='text-sm md:text-xl'><b className='text-blue-600'>Attention to detail:</b><br /> We pay close attention to every aspect <br /> of the cleaning process to ensure you get the best results.</li>
              <li className='text-sm md:text-xl'><b className='text-blue-600'>Customer Satisfaction:</b><br /> We prioritize your satisfaction and strive to exceed <br /> your expectations with every service.</li>
              <li className='text-sm md:text-xl'><b className='text-blue-600'>Customer Convenience:</b><br /> Our easy online booking system and flexible <br /> scheduling make it simple to get the cleaning services you need, when you need them.</li>
              <li className='text-sm md:text-xl'><b className='text-blue-600'>Services:</b><br /> We offer a wide range of cleaning services to meet your needs. <br />All-in-one hygiene solution (cleaning, laundry, and products)</li>
            </ul><br />
            <button className="px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer">
            Book Now
          </button>        
        </div>
        

        <div>
          <img src="/photos/Gladys.jpeg" width={600} height={400} alt="Professional Cleaning" className='rounded-2xl'/>
        </div>
      </div>

      <div className='bg-green-100 p-10 pb-20 md:h-[100vh]'>
        <div>
          <h1 className='text-2xl md:text-4xl font-[410] flex flex-col pt-10 mb-10'>
          <img src="photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
          What our customers say about MyHygiene
          </h1>
        </div>

          <div className='mb-20'>
            <button className="px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer">
            Book Now
          </button>
          </div>

          <Testimonials />
      </div>
    </div>

    
  )
}

export default Home
