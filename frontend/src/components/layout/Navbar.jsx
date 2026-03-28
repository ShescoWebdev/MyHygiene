import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X } from "lucide-react"

function Navbar() {
  const [open, setOpen] = useState(false)

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 font-bold"
      : "text-black hover:text-blue-600 font-bold"

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#f0b000] px-6 py-4 flex justify-between items-center">
        <div className="text-white font-bold text-lg cursor-pointer">
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
        <div className="hidden md:flex space-x-6">
          <NavLink to="/" className={linkStyle}>Home</NavLink>
          <NavLink to="/about" className={linkStyle}>About Us</NavLink>
          <NavLink to="/services" className={linkStyle}>Services</NavLink>
          <NavLink to="/contact" className={linkStyle}>Contact Us</NavLink>
          <NavLink to="/gallery" className={linkStyle}>Gallery</NavLink>
        </div>


        <div className="hidden md:block">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-4xl border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer">
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

{/* SLIDE MENU */}
<div
  className={`fixed right-0 top-[88.8px] h-[calc(100vh-64px)] w-full bg-[#f0b000] z-50 transform transition-transform duration-500 ${
    open ? "translate-x-0" : "translate-x-full"
  }`}
>
  <div className="flex flex-col justify-between h-full px-6 py-6 pb-20">

    {/* TOP LINKS */}
    <div className="flex flex-col space-y-6 mt-6">
      <NavLink to="/" className={linkStyle} onClick={() => setOpen(false)}>Home</NavLink>
      <NavLink to="/about" className={linkStyle} onClick={() => setOpen(false)}>About</NavLink>
      <NavLink to="/services" className={linkStyle} onClick={() => setOpen(false)}>Services</NavLink>
      <NavLink to="/contact" className={linkStyle} onClick={() => setOpen(false)}>Contact</NavLink>
      <NavLink to="/gallery" className={linkStyle} onClick={() => setOpen(false)}>Gallery</NavLink>
    </div>

    <button
      className="shesco-btn px-6 py-3 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-          transparent hover:text-blue-500 cursor-pointer"
      onClick={() => setOpen(false)}
    >
      Book Now
    </button>

  </div>
</div>    </>
  )
}

export default Navbar