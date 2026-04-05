import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingWhatsApp from "../FloatingWhatsApp"
// import InstallButton from "../InstallButton"

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {/* <InstallButton /> */}
    <main className="pt-[59px] md:pt-[7rem]">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}

export default Layout