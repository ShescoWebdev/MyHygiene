// import { NavLink } from "react-router-dom"
import { Mail, Phone } from "lucide-react"
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp
} from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white px-6 py-10">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* LOGO + NAME */}
        <div className="flex flex-col gap-3">
          <img src="/photos/Logo1.jpeg" alt="MyHygiene Logo" className="w-32 rounded" />
          <p className="text-sm text-gray-400">
            Creating clean, fresh, and healthy living spaces.
          </p>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Contact</h2>

          <a
            href="mailto:myhygieneservices@gmail.com"
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition"
          >
            <Mail size={18} />
            myhygieneservices@gmail.com
          </a>

          <a
            href="tel:08145364748"
            className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition"
          >
            <Phone size={18} />
            08145364748
          </a>
        </div>


    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Quick Links</h2>
      <NavLink to="/" className="text-gray-400 hover:text-yellow-400 transition">Home</NavLink>
      <NavLink to="/about" className="text-gray-400 hover:text-yellow-400 transition">About Us</NavLink>
      <NavLink to="/services" className="text-gray-400 hover:text-yellow-400 transition">Services</NavLink>
      <NavLink to="/contact" className="text-gray-400 hover:text-yellow-400 transition">Contact Us</NavLink>
      <NavLink to="/gallery" className="text-gray-400 hover:text-yellow-400 transition">Gallery</NavLink>
      <NavLink to="/booking" className="text-gray-400 hover:text-yellow-400 transition">Book Now</NavLink>
    </div>


        
        {/* SOCIALS */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Follow Us</h2>

          <div className="flex gap-4 flex-wrap">

            <a
              href="https://www.instagram.com/clean_withmyhygiene"
              target="_blank"
              className="hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="https://www.facebook.com/share/1MTfiwciTR/"
              target="_blank"
              className="hover:text-blue-500 transition"
            >
              <FaFacebook />
            </a>

            <a
              href="https://www.linkedin.com/in/gladys-oriowha-08ba92356"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://www.youtube.com/@Clean_withmyhygiene"
              target="_blank"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>


            {/* WHATSAPP */}
            <a href="https://wa.me/2348145364748" target="_blank"
              className="hover:text-green-500 hover:drop-shadow-[0_0_8px_#22c55e] transition duration-300">
              <FaWhatsapp />
            </a>


            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@clean_withmyhygiene"
              target="_blank"
              className="hover:text-white transition text-sm border px-2 py-1 rounded"
            >
              <FaTiktok />
            </a>


          </div>
        </div>

      </div>

      {/* BOTTOM LINE */}
      <div className="text-center text-gray-500 text-sm mt-10 border-t border-gray-700 pt-5">
        © {new Date().getFullYear()} MyHygiene. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer