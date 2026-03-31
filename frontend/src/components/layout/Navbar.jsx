import { useState, useEffect, useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Menu, X } from "lucide-react"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(false)

  const navigate = useNavigate()

  const desktopDropdownRef = useRef(null)
  const mobileDropdownRef = useRef(null)

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 font-bold"
      : "text-black hover:text-blue-600 font-bold"

  // Active left border style for dropdown links
  const dropdownLinkStyle = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 text-blue-700 border-l-2 border-blue-600 pl-1 font-semibold"
      : "block md:py-2 hover:text-blue-700 border-l-2 border-transparent pl-1 font-semibold"

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setDesktopDropdown(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Close mobile dropdown when clicking outside
  useEffect(() => {
    const handleMobileOutside = (e) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setMobileDropdown(false)
      }
    }

    document.addEventListener("click", handleMobileOutside)

    return () => {
      document.removeEventListener("click", handleMobileOutside)
    }
  }, [])

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#f0b000] px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <div className="cursor-pointer">
          <NavLink to="/">
            <img src="/photos/Logo3.png" alt="MyHygiene Logo" width="130" height="50" />
          </NavLink>
        </div>

        {/* TOGGLE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="text-black md:hidden cursor-pointer focus:outline-none"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/about" className={linkStyle}>About Us</NavLink>
          <NavLink to="/services" className={linkStyle}>Services</NavLink>
          <NavLink to="/contact" className={linkStyle}>Contact Us</NavLink>
        </div>

        {/* GALLERY DROPDOWN */}
          <div className="relative hidden md:block" ref={desktopDropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setDesktopDropdown((prev) => !prev)
              }}
              className="text-blue-700 hover:text-black font-bold flex items-center gap-1"
            >
              Gallery
              <span
                className={`transition-transform duration-300 ${
                  desktopDropdown ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            <div
              className={`absolute top-6 left-0 pl-5 mt-4 bg-[#f0b000] border-t-2 border-b-2 border-blue-600 shadow-lg rounded py-2 w-40 overflow-hidden transition-all duration-300 ease-in-out ${
                desktopDropdown
                  ? "opacity-100 max-h-40 translate-y-0"
                  : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <NavLink 
                to="/photos" 
                onClick={() => setDesktopDropdown(false)}
                className={dropdownLinkStyle}
              >
                Photos
              </NavLink>

              <NavLink 
                to="/videos" 
                onClick={() => setDesktopDropdown(false)}
                className={dropdownLinkStyle}
              >
                Videos
              </NavLink>
            </div>
          </div>

        {/* BOOK BUTTON */}
        <div className="hidden md:block">
          <button
            onClick={() => navigate("/booking")}
            className="shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* BLUR EFFECT */}
      <div
        className={`fixed left-0 right-0 bottom-0 top-[61px] bg-black/40 backdrop-blur-[1.5px] z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* MOBILE MENU */}
      <div
        className={`fixed right-0 top-[88.8px] h-[calc(100vh-64px)] w-full bg-[#f0b000] z-50 transform transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full px-6 py-6 pb-20">

          {/* LINKS */}
          <div className="flex flex-col space-y-6 mt-6">
            <NavLink to="/" className={linkStyle} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink to="/about" className={linkStyle} onClick={() => setOpen(false)}>About</NavLink>
            <NavLink to="/services" className={linkStyle} onClick={() => setOpen(false)}>Services</NavLink>
            <NavLink to="/contact" className={linkStyle} onClick={() => setOpen(false)}>Contact</NavLink>

            {/* MOBILE GALLERY DROPDOWN */}
            <div ref={mobileDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setMobileDropdown((prev) => !prev)
                }}
                className="text-left font-bold text-black hover:text-blue-600 flex items-center gap-1"
              >
                Gallery
                <span
                  className={`transition-transform duration-300 ${
                    mobileDropdown ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  mobileDropdown
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col space-y-2 border-t-2 border-b-2 border-black py-2 pl-5">
                  <NavLink 
                    to="/photos" 
                    onClick={() => {
                      setOpen(false)
                      setMobileDropdown(false)
                    }}
                    className={dropdownLinkStyle}
                  >
                    Photos
                  </NavLink>

                  <NavLink 
                    to="/videos" 
                    onClick={() => {
                      setOpen(false)
                      setMobileDropdown(false)
                    }}
                    className={dropdownLinkStyle}
                  >
                    Videos
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          {/* BOOK BUTTON */}
          <button
            onClick={() => {
              navigate("/booking")
              setOpen(false)
            }}
            className="shesco-btn px-6 py-3 bg-blue-500 text-white border border-blue-500 hover:bg-transparent hover:text-blue-500 transition duration-300 cursor-pointer"
          >
            Book Now
          </button>

        </div>
      </div>
    </>
  )
}

export default Navbar