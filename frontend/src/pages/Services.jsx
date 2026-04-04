import React from 'react'
import PageWrapper from '../components/PageWrapper'

function Services() {
  return (
    <PageWrapper>
    <div className='services1 mt-7 md:mt-[-1.7rem] px-5 md:px-20 py-10 bg-[#faf6e8]'>

      {/* HEADER */}
      <div className='text-center max-w-3xl mx-auto'>
        <h1 className='text-3xl md:text-5xl font-semibold mb-4'>
          Our Services
        </h1>

        <p className='text-sm md:text-lg text-gray-700 leading-relaxed'>
          We offer a wide range of cleaning and maintenance services to meet your needs.
          Whether you need regular cleaning, deep cleaning, laundry services, or specialized hygiene solutions, we’ve got you covered.
        </p>
      </div>

      {/* MAIN GRID */}
      <div className='mt-12 grid grid-cols-1 md:grid-cols-2 gap-10'>

        {/* SERVICES CARD */}
        <div className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300'>
          <h2 className='text-lg md:text-xl font-bold mb-4 border-b-2 border-[#f0b000] pb-2'>
            Our Services Include
          </h2>

          <ul className='space-y-3 marker:text-[#f0b000] marker:font-bold list-disc list-inside'>
            <li>Residential Cleaning</li>
            <li>Office Cleaning</li>
            <li>Deep Cleaning</li>
            <li>Post-Construction Cleaning</li>
            <li>Fumigation / Pest Control</li>
            <li>Laundry Services (washing, drying, ironing)</li>
            <li>Cleaning Products Sales</li>
            <li>General Maintenance Cleaning</li>
          </ul>
        </div>

        {/* SERVICE AREA CARD */}
        <div className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300'>
          <h2 className='text-lg md:text-xl font-bold mb-4 border-b-2 border-[#f0b000] pb-2'>
            Service Area
          </h2>

          <ul className='space-y-3 marker:text-[#f0b000] marker:font-bold list-disc list-inside'>
            <li>Benin City</li>
            <li>Edo State</li>
            <li>Nearby areas (on request)</li>
          </ul>
        </div>

      </div>

      {/* PRODUCTS SECTION */}
      <div className='services3 mt-14 bg-white p-6 md:p-10 rounded-2xl shadow-md hover:shadow-xl transition duration-300 max-w-4xl mx-auto'>

        <h2 className='text-lg md:text-xl font-bold mb-4 border-b-2 border-[#f0b000] pb-2'>
          Cleaning Products
        </h2>

        <p className='text-sm md:text-lg text-gray-700 mb-4'>
          Explore our range of high-quality cleaning products designed for effective and safe cleaning.
        </p>

        <ul className='space-y-3 marker:text-[#f0b000] marker:font-bold list-disc list-inside'>
          <li>Detergents</li>
          <li>Disinfectants</li>
          <li>Air fresheners</li>
          <li>Cleaning tools</li>
        </ul>

        <p className='text-sm text-gray-500 mt-4'>
          *All products are available for purchase at competitive prices. Contact us for more details via WhatsApp. Chat with us directly to place your order or inquire about our services.  
        </p>

        {/* BUTTON */}
        <div className='mt-6'>
          <a
            href="https://wa.me/2348145364748"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#f0b000] text-black rounded-full border-2 border-[#f0b000] 
                       transition duration-300 hover:bg-transparent hover:text-[#f0b000] hover:scale-105"
          >
            Order Now via WhatsApp
          </a>
        </div>

      </div>

    </div>
    </PageWrapper>
  )
}

export default Services