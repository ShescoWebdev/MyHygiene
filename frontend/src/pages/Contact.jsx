import { Phone, Mail } from "lucide-react"
import { FaWhatsapp, FaBroom, FaHome, FaBuilding, FaPumpSoap } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Contact() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#faf6e8] min-h-screen px-6 md:px-20 py-16 md:mt-[-1.7rem]">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-semibold mb-4">
          Get In Touch With Us ✨
        </h1>
        <p className="text-gray-600 md:text-lg">
          Choose how you want to reach us — fast, simple, and stress-free.
        </p>
      </div>

      {/* QUICK CONTACT OPTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

        {/* CALL */}
        <a href="tel:08145364748"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center">
          <Phone size={30} className="text-blue-500 mb-3" />
          <h2 className="font-bold text-lg">Call Us</h2>
          <p className="text-gray-500 text-sm">Instant response</p>
        </a>

        {/* WHATSAPP */}
        <a href="https://wa.me/2348145364748" target="_blank"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center">
          <FaWhatsapp size={30} className="text-green-500 mb-3" />
          <h2 className="font-bold text-lg">WhatsApp</h2>
          <p className="text-gray-500 text-sm">Chat with us directly</p>
        </a>

        {/* EMAIL */}
        <a href="mailto:myhygieneservices@gmail.com"
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition hover:scale-105 flex flex-col items-center text-center">
          <Mail size={30} className="text-red-500 mb-3" />
          <h2 className="font-bold text-lg">Email</h2>
          <p className="text-gray-500 text-sm">Send detailed requests</p>
        </a>

      </div>

      {/* SERVICE SELECTION */}
      <div className="mt-16 max-w-5xl mx-auto">

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-center">
          What do you need help with?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          <ServiceCard icon={<FaHome />} title="Home Cleaning?" />
          <ServiceCard icon={<FaBuilding />} title="Office Cleaning?" />
          <ServiceCard icon={<FaBroom />} title="Deep Cleaning?" />
          <ServiceCard icon={<FaPumpSoap />} title="Fumigation?" />

        </div>

      </div>


      <div className="mt-16 text-center bg-white p-8 md:p-12 rounded-2xl shadow-md max-w-3xl mx-auto">

  <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
    Ready to get started? Reach out and book your preferred service with ease using the button below.
  </p>

  <a
    href="/booking" onClick={() => navigate("/booking")} 
    className="block w-full md:w-auto px-10 py-4 bg-[#f0b000] text-black text-lg font-semibold 
               rounded-full border-2 border-[#f0b000] transition duration-300 
               hover:bg-transparent hover:text-[#f0b000] hover:scale-105"
  >
    Book Your Preferences Here
  </a>

</div>

    </div>
  )
}

function ServiceCard({ icon, title }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center text-center 
                    hover:shadow-xl hover:scale-105 transition cursor-pointer">

      <div className="text-2xl text-[#f0b000] mb-2">
        {icon}
      </div>

      <p className="text-sm font-medium">{title}</p>

    </div>
  )
}

export default Contact