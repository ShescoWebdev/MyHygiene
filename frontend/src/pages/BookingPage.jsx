import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import API from "../api";
import Swal from "sweetalert2";

function BookingPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    service: "",
    items: "",
    selectedItems: [],
    instructions: "",
    date: "",
    hour: "1",
    minute: "00",
    period: "AM",
  });

  const [bookings, setBookings] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  
  const [loadingIndex, setLoadingIndex] = useState(null); 
  const [successMsg, setSuccessMsg] = useState("");

  const quickItems = ["Kitchen", "Bathroom", "Toilet", "Bedroom", "Living Room", "Office Space"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (item) => {
    const exists = form.selectedItems.includes(item);
    if (exists) {
      setForm({
        ...form,
        selectedItems: form.selectedItems.filter((i) => i !== item),
      });
    } else {
      setForm({
        ...form,
        selectedItems: [...form.selectedItems, item],
      });
    }
  };

  const formatDateTime = () => {
    if (!form.date) return "";

    const dateObj = new Date(form.date);

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const formattedDate = dateObj.toLocaleDateString("en-US", options);

    return `${formattedDate} • ${form.hour}:${form.minute} ${form.period}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const combinedItems = [
      ...form.selectedItems,
      form.items
    ].filter(Boolean).join(", ");

    const newBooking = {
      ...form,
      items: combinedItems,
      displayTime: formatDateTime() 
    };

    if (editIndex !== null) {
      const updatedBookings = [...bookings];
      updatedBookings[editIndex] = newBooking;
      setBookings(updatedBookings);
      setEditIndex(null);
    } else {
      setBookings([...bookings, newBooking]);
    }

    setForm({
      name: "",
      phone: "",
      email: "",
      address: "",
      service: "",
      items: "",
      selectedItems: [],
      instructions: "",
      date: "",
      hour: "1",
      minute: "00",
      period: "AM",
    });
  };

  const handleEdit = (index) => {
    const booking = bookings[index];
    setForm({ ...booking, selectedItems: booking.selectedItems || [] });
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  // Alert Confirmation
  const handleDelete = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f0b000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        
        // success pop-up after deleting
        Swal.fire({
          title: "Deleted!",
          text: "Your booking has been removed.",
          icon: "success",
          confirmButtonColor: "#f0b000",
          timer: 1500
        });
      }
    });
  };

  const fetchBookings = async () => {
    try {
      const { data } = await API.get("/bookings/my");
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleProceed = async (booking, index) => {
  setLoadingIndex(index);

  try {
    const token = localStorage.getItem("token");

    const { data } = await API.post(
      "/bookings",
      {
        name: booking.name,
        phone: booking.phone,
        email: booking.email,
        service: booking.service,
        date: booking.date,
        address: booking.address,
        items: booking.items,
        instructions: booking.instructions,
      },
      {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {},
      }
    );

    console.log("SUCCESS:", data);

    showSuccessMessage();

    const updatedBookings = bookings.filter((_, i) => i !== index);
    setBookings(updatedBookings);

  } catch (err) {
    console.error("ERROR:", err.response?.data || err.message);

    Swal.fire({
      icon: "error",
      title: "Oops...",
      text:
        err.response?.data?.message ||
        "Something went wrong! Please try again.",
      confirmButtonColor: "#f0b000",
    });

  } finally {
    setLoadingIndex(null);
  }
};
  const showSuccessMessage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSuccessMsg(
      "Thank you for booking with MyHygiene. Your request has been received, and our team will contact you shortly to confirm the details."
    );

    setTimeout(() => {
      setSuccessMsg("");
    }, 10000); 
  };


  return (
    <PageWrapper>
      <div className="min-h-screen bg-gray-50 py-10 px-4">

        {successMsg && (
          <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-4 text-center font-medium shadow">
            {successMsg}
          </div>
        )}

      {/* HERO */}
      <div>
        <h1 className="text-2xl md:text-5xl pt-10 text-center font-semibold">
          Book Your Service with MyHygiene
        </h1>
        <p className="text-center mt-3 text-gray-600">
          Browse our available services in the pricing table below, then select your preferred date and time to schedule your booking.
        </p>

        <img 
        src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993815/Pricing_g9poup.jpg" 
        alt="Pricing List" 
        className="
        m-auto mt-10 
        rounded-2xl
        text-sm
        rounded-b-none
        border-4 border-yellow-500
        shadow-lg
        "
        loading="lazy"
        decoding="async" />
      </div>

      <div>
        <marquee behavior="smooth" direction="left" className="bg-yellow-500 pt-4 rounded-b-full mt-[-4px] md:mt-[-5px] lg:mx-20px] lg:mt-[-5px] xl:mx-[53.7px] xl:mt-[-5px]">
          <h2 className="text-[18px] font-bold text-gray-800 mb-4">For all your payments, we will contact you to confirm the details once we receive your request. So do well to drop your contact information and be available for our call. For more information, contact us on +234 814 536 4748.</h2>
        </marquee>
      </div>

      {/* FORM */}
      <div className="max-w-2xl mx-auto bg-white shadow-xl mt-20 md:mt-32 rounded-2xl p-6 border-t-4 border-[#f0b000]">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Book a Service</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" required />

          <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" required />

          <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" required />

          <input name="address" placeholder="Your Detailed Address" value={form.address} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" required />

          {/* SERVICE */}
          <select name="service" value={form.service} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" required>
            <option value="" disabled>Select Service</option>
            <option>Apartment Cleaning</option>
            <option>Laundry Services</option>
            <option>Post-Construction Cleaning</option>
            <option>Office Cleaning</option>
          </select>

          {/* QUICK SELECT */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Select areas to clean:</p>
            <div className="flex flex-wrap gap-2">
              {quickItems.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.selectedItems.includes(item)}
                  onChange={() => handleCheckbox(item)}
                  className="hidden"
                />

                <div className={`w-4 h-4 border-2 rounded flex items-center justify-center 
                  ${form.selectedItems.includes(item) ? "bg-[#f0b000] border-black" : "border-[#f0b000] bg-transparent"}`}>
                  
                  {form.selectedItems.includes(item) && (
                    <span className="text-black text-xs">✓</span>
                  )}
                </div>

                <span className="text-sm">{item}</span>
              </label>
              ))}
            </div>
          </div>

          {/* CUSTOM ITEMS */}
          <textarea
            name="items"
            placeholder="Other items (e.g., 3-bedroom flat, staircase)"
            value={form.items}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none"
            rows="2"
          />

          {/* INSTRUCTIONS */}
          <textarea
            name="instructions"
            placeholder="Additional instructions (e.g., red gate, call before arrival)"
            value={form.instructions}
            onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none"
            rows="3"
          />

          <div>
            <div className="text-sm text-gray-500 mb-1 flex gap-1"><span className="md:hidden">Tap To</span> Select Date:</div>
            <input type="date" name="date" value={form.date} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none cursor-pointer" required />
          </div>

          <div className="flex items-end gap-3">

            <div>
              <p className="text-xs text-gray-500 mb-1">Hr</p>
              <select name="hour" value={form.hour} onChange={handleChange}
                className="p-2 border rounded-lg cursor-pointer">
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div>
              <p className="text-xs text-gray-500 mb-1">Min</p>
              <select name="minute" value={form.minute} onChange={handleChange}
                className="p-2 border rounded-lg cursor-pointer">
                {[...Array(60)].map((_, i) => (
                  <option key={i} value={String(i).padStart(2, "0")}>
                    {String(i).padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <select name="period" value={form.period} onChange={handleChange}
              className="p-2 border rounded-lg cursor-pointer">
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>

          {form.date && (
            <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded-lg">
              {formatDateTime()}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold transition bg-[#f0b000] hover:bg-[#d59c02]"
          >
            {editIndex !== null ? "Update Booking" : "Save Booking"}
          </button>

        </form>
      </div>

      {/* BOOKINGS */}
      <div className="max-w-2xl mx-auto mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bookings</h2>

        {bookings.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500 text-lg">No bookings yet 😴</p>
            <p className="text-gray-400 text-sm mt-1">Your bookings will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b, index) => (
              <div key={index} className="p-4 rounded-xl border-t-4 border-b-4 border-yellow-500 shadow hover:shadow-md transition bg-white">
          
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-blue-600">{b.name}</h3>
                  <hr />
                  <span className="text-sm text-blue-600 font-medium">{b.displayTime}</span>
                </div>
                <hr />
                <p className="text-gray-600 pt-3 pb-3">📞 {b.phone}</p>
                <hr />
                <p className="text-gray-600 pt-3 pb-3">📧 {b.email}</p>
                <hr />
                <p className="text-gray-600 pt-3 pb-3">📍 {b.address}</p>
                  <hr />
                {b.service && (
                  <p className="text-gray-700 pt-3 pb-3">🧹 {b.service}</p>
                )}
                <hr />
                {b.items && (
                  <p className="text-gray-70 p-2 rounded pt-3 pb-3">🧽 {b.items}</p>
                )}
                  <hr />
                {b.instructions && (
                  <p className="text-gray-600 pt-3 pb-3">📌 {b.instructions}</p>
                )}
                <hr />
                <div className="flex justify-between mt-4">
                  <button
                  onClick={() => handleEdit(index)}
                  className="mt-3 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                  Edit
                  </button>

                <button
                  onClick={() => handleDelete(index)}
                  className="mt-3 text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleProceed(b, index)}
                  disabled={loadingIndex === index}
                  className={`mt-3 text-sm px-3 py-1 rounded transition flex items-center justify-center gap-2 ${
                    loadingIndex === index 
                      ? "bg-gray-400 text-white cursor-not-allowed" 
                      : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                  }`}
                >
                  {loadingIndex === index ? (
                    <>
                      <span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </PageWrapper>
  )
}

export default BookingPage;