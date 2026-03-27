import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "../components/layout/Layout"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Services from "../pages/Services"
import ScrollToTop from "../components/layout/scrollToTop"
import Gallery from "../pages/Gallery"

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
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default AppRouter

