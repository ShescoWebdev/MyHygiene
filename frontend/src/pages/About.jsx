import React from 'react'
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  return (
    <div className='about1 text-black bg-[#fff5ed] pb-20 md:pb-0 flex flex-col gap-5 justify-between items-center mt-7 md:mt-[-26px] pt-10'>
      <div className='flex items-center flex-col justify-center w-full md:h-[calc(50vh-64px)] text-center'>
        <h1 className='text-3xl md:text-5xl font-[410] pb-4 text-center'> About MyHygiene</h1>
      <p className='text-sm md:text-xl'>MyHygiene is a platform that connects you with skilled and thoroughly vetted professionals for your cleaning needs.</p>

      <button
        onClick={() => navigate("/booking")}
        className="shesco-btn px-6 py-2 m-5 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
      >
        Book Now
      </button>
      </div>

    <div className='p-10 bg-white rounded-2xl'>
      <img src="/photos/Team.jpeg" width={1100} height={600} alt="Our Team" className='rounded-2xl'/>
    </div>


    <div className='about2 text-black p-10 flex flex-col gap-14 justify-between items-center md:flex-row'>
        <div className='order-2 md:order-1'>
          <img src="/photos/B&W.jpg" alt="MyHygiene" width="550" height="50" className='rounded-2xl md:w-[900px] md:h-[500px]'/>
        </div>
        
        <div className='order-1 md:order-2'>
          <h1 className='text-xl md:text-4xl pb-2 font-[410]'>
            <img src="photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
            Who we are -</h1> 
            <p className='text-xs md:text-xl leading-relaxed'>MyHygiene Cleaning & Maintenance Services <br /> is a trusted cleaning company <br /> committed to delivering high-quality cleaning,<br /> laundry, and hygiene solutions.
            <br /><br />Founded in January, 2025, we have quickly established ourselves as a reliable and customer-focused service provider. </p>
        </div>
    </div>

          <div className='about3 w-[20rem] md:w-[75rem] m-5 md:m-16 p-10 pb-16 bg-[#f4d171] flex flex-col items-center rounded-3xl gap-5'>
            <h1 className='text-blue-800 text-xl md:text-3xl font-bold text-center'>“MyHygiene is refining the experience of service delivery.”</h1>
            <button
        onClick={() => navigate("/booking")}
        className="shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
      >
        Book Now
      </button>
          </div>

    <div className='about4 text-black p-10 gap-5 flex flex-col justify-between items-center md:flex-row'>
        <div>
            <h1 className='text-xl md:text-4xl pb-2 font-[410]'>
              <img src="photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
              Our Commitment</h1>
            <p className='text-xs md:text-xl leading-relaxed'>We understand that cleanliness <br /> goes beyond appearance—it affects health, comfort, and productivity. <br /><br /> That’s why we provide reliable and detailed services designed to keep your environment and fabrics fresh, br safe, and spotless. <br /><br />
            Our team is professional, dedicated, <br /> and focused on delivering excellence in every service. <br />
            We don’t just clean—we create healthier living spaces.</p>
        </div>

        <div>
          <img src="/photos/Team1.jpg" alt="MyHygiene"  className='rounded-2xl w-[300px] h-[250px] md:w-[1500px] md:h-[500px]'/>
        </div>
    </div>

        <div className='about3 text-black w-[20rem] md:w-[75rem] m-5 md:m-16 p-10 pb-16 bg-[#f4d171] flex flex-col items-center rounded-3xl gap-5'>
          <h1 className='text-blue-800 text-xl md:text-3xl font-bold text-center'>Location</h1>
          <p className='text-center text-sm md:text-xl leading-relaxed text-blue-800'>You can find us anywhere within Benin City, and nearby areas in Edo State, Nigeria. We hope to meet you soon! </p>
          <button
        onClick={() => navigate("/booking")}
        className="shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
      >
        Book Now
      </button>
            </div>
    </div>
  )
}

export default About
