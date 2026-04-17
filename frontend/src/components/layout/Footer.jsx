import { Mail, Phone, ChevronDown } from "lucide-react"
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaWhatsapp
} from "react-icons/fa"
import { useNavigate, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function Footer() {
  const navigate = useNavigate();

  const [quickOpen, setQuickOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  const quickRef = useRef(null);

  // CLOSE ALL
  const closeAll = () => {
    setQuickOpen(false);
    setGalleryOpen(false);
  };

  // CLICK OUTSIDE TO CLOSE
  useEffect(() => {
    function handleClickOutside(e) {
      if (quickRef.current && !quickRef.current.contains(e.target)) {
        closeAll();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const localStorage.setItem("user", JSON.stringify(data.user)); 
  // Save user details for role checks in the AdminPage after fetching user data. This allows us to check the user's role in the Footer and conditionally render admin links.
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  

  return (
    <footer className="bg-gray-900 text-white px-6 py-10 w-full">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">

        {/* LOGO + NAME */}
        <div className="flex flex-col gap-3">
          <img src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993793/Logo1_rity18.jpg" 
          alt="MyHygiene Logo" 
          className="
          w-32 rounded
          text-sm"
          loading="lazy"
          decoding="async" />
          <p className="text-sm text-gray-400">
            Creating clean, fresh, and healthy living spaces.
          </p>

          {user?.role === "admin" && (
          <NavLink to="/admin/dashboard">
            <hr className="border-gray-700"/>
            MyHygiene Dashboard
            <hr className="border-gray-700"/>
          </NavLink>
          
         )}

        
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


        {/* QUICK LINKS */}
        <div className="flex flex-col gap-3" ref={quickRef}>
          <h2
            className="text-lg font-semibold flex items-center gap-4 cursor-pointer md:cursor-default select-none"
            onClick={() => setQuickOpen(prev => !prev)}
          >
            Quick Links
            <ChevronDown
              size={30}
              className={`md:hidden transition-transform duration-300 ease-in-out ${quickOpen ? "rotate-180" : ""}`}
            />
          </h2>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex md:flex-col gap-2">
            <NavLink to="/" className="text-gray-400 hover:text-yellow-400 transition">Home</NavLink>
            <NavLink to="/about" className="text-gray-400 hover:text-yellow-400 transition">About Us</NavLink>
            <NavLink to="/services" className="text-gray-400 hover:text-yellow-400 transition">Services</NavLink>
            <NavLink to="/contact" className="text-gray-400 hover:text-yellow-400 transition">Contact Us</NavLink>
            <NavLink to="/gallery" className="text-gray-400 hover:text-yellow-400 transition">Gallery</NavLink>
            <NavLink to="/booking" className="text-gray-400 hover:text-yellow-400 transition">Book Now</NavLink>
          </div>

          {/* MOBILE DROPDOWN WITH SMOOTH ANIMATION */}
          <div
            className={`
              md:hidden overflow-hidden transition-all duration-300 ease-in-out
              ${quickOpen ? "max-h-[800px] opacity-100 mt-2" : "max-h-0 opacity-0"}
            `}
          >
            <div className="flex flex-col gap-2">
              <NavLink onClick={closeAll} to="/" className="text-gray-400 hover:text-yellow-400 transition">Home</NavLink>
              <hr className="pb-3"/>
              <NavLink onClick={closeAll} to="/about" className="text-gray-400 hover:text-yellow-400 transition">About Us</NavLink>
              <hr className="pb-3"/>
              <NavLink onClick={closeAll} to="/services" className="text-gray-400 hover:text-yellow-400 transition">Services</NavLink>
              <hr className="pb-3"/>
              <NavLink onClick={closeAll} to="/contact" className="text-gray-400 hover:text-yellow-400 transition">Contact Us</NavLink>
              <hr className="pb-8"/>

              {/* GALLERY DROPDOWN */}
              <div>
                <div
                  onClick={() => setGalleryOpen(prev => !prev)}
                  className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 cursor-pointer transition select-none"
                >
                  Gallery
                  <ChevronDown
                    size={25}
                    className={`transition-transform duration-300 ease-in-out ${galleryOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${galleryOpen ? "max-h-60 opacity-100 mt-2" : "max-h-0 opacity-0"}
                  `}
                >
                  <div className="flex flex-col pl-4 gap-2">
                    <NavLink onClick={closeAll} to="/photos" className="text-gray-400 hover:text-yellow-400 transition border rounded-2xl p-2">
                      Photos
                    </NavLink>
                    <NavLink onClick={closeAll} to="/videos" className="text-gray-400 hover:text-yellow-400 transition border rounded-2xl p-2">
                      Videos
                    </NavLink>
                  </div>
                </div>
              </div>

              <NavLink onClick={closeAll} to="/booking" className="text-gray-400 hover:text-yellow-400 transition">
                Book Now
              </NavLink>
            </div>
          </div>
        </div>


        {/* SOCIALS */}
        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-semibold">Follow Us</h2>

          <div className="flex gap-4 flex-wrap">
            <a href="https://www.instagram.com/clean_withmyhygiene" target="_blank" className="hover:text-pink-400 transition">
              <FaInstagram />
            </a>

            <a href="https://www.facebook.com/share/1MTfiwciTR/" target="_blank" className="hover:text-blue-500 transition">
              <FaFacebook />
            </a>

            <a href="https://www.linkedin.com/in/gladys-oriowha-08ba92356" target="_blank" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>

            <a href="https://www.youtube.com/@Clean_withmyhygiene" target="_blank" className="hover:text-red-500 transition">
              <FaYoutube />
            </a>

            <a href="https://wa.me/2348145364748" target="_blank"
              className="hover:text-green-500 hover:drop-shadow-[0_0_8px_#22c55e] transition duration-300">
              <FaWhatsapp />
            </a>

            <a href="https://www.tiktok.com/@clean_withmyhygiene" target="_blank"
              className="hover:text-white transition text-sm border px-2 py-1 rounded">
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