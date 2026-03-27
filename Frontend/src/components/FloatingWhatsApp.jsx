import { FaWhatsapp } from "react-icons/fa"

function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/2348145364748"
      target="_blank"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg 
                 hover:scale-110 hover:bg-green-600 transition duration-300 z-50"
    >
      <FaWhatsapp size={24} />
    </a>
  )
}

export default FloatingWhatsApp