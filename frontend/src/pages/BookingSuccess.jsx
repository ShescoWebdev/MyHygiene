import { Link, useLocation, Navigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function BookingSuccess() {
  const location = useLocation();

  // To prevent users from accessing this page directly without going through the booking process
  if (!location.state || !location.state.bookingSuccessful) {
    return <Navigate to="/" replace />;
  }

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border-t-8 border-[#f0b000]">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Sent!</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for booking with <strong>MyHygiene</strong>. Your request has been sent, and a pending confirmation message has been sent to your email. Our team will review your booking and get back to you within 24-48 hours. We look forward to providing you with a sparkling clean home!
          </p>
          <Link
            to="/"
            className="block w-full py-3 bg-[#f0b000] text-black font-semibold rounded-lg hover:bg-[#d59c02] transition"
          >
            Return to Home
          </Link>
          <p className="mt-6 text-sm text-gray-400">
            For more information, contact us on <br />
            <span className="font-semibold text-gray-600">+234 814 536 4748</span>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default BookingSuccess;