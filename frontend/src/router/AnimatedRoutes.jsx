import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"

import Layout from "../components/layout/Layout"
import ScrollToTop from "../components/layout/ScrollToTop"

import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Services from "../pages/Services"
import Gallery from "../pages/Gallery"
import BookingPage from "../pages/BookingPage"
import Photos from "../pages/Photos"
import Videos from "../pages/Videos"
import Offline from "../pages/Offline"
import BookingSuccess from "../pages/BookingSuccess"

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
  if (location.pathname !== "/offline") {
    localStorage.setItem("lastPage", location.pathname)
  }
}, [location])

useEffect(() => {
  if (!navigator.onLine && location.pathname !== "/offline") {
    window.location.href = "/offline"
  }
}, [])

  return (
    <>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/booking" element={<BookingPage />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/photos" element={<Photos />} />
                  <Route path="/videos" element={<Videos />} />
                  <Route path="/booking-success" element={<BookingSuccess />} />
                </Routes>
              </Layout>
            }
          />

          <Route path="/offline" element={<Offline />} />

        </Routes>
      </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes