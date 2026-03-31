import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../components/layout/Layout"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Services from "../pages/Services"
import Gallery from "../pages/Gallery"
import ScrollToTop from "../components/layout/ScrollToTop"
import BookingPage from "../pages/BookingPage"
import Photos from "../pages/Photos"
import Videos from "../pages/Videos"

function AppRouter() {
  return (
    <BrowserRouter>
    <ScrollToTop />
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
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter




