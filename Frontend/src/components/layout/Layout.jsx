import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingWhatsApp from "../FloatingWhatsApp"

function Layout({ children }) {
  return (
    <>
      <Navbar />
    <main className="pt-[59px] md:pt-[7rem]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export default Layout