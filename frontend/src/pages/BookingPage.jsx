import { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper"
import API from "../api";
// import { useNavigate } from "react-router-dom";

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

  const handleSubmit = async (e) => {
  e.preventDefault();

  const combinedItems = [
    ...form.selectedItems,
    form.items
  ].filter(Boolean).join(", ");

  const { data } = await API.post("/bookings", {
  name: form.name,
  phone: form.phone,
  service: form.service,
  date: form.date,
  address: form.address,
  items: combinedItems,
  instructions: form.instructions,
});

  try {
    const { data } = await API.post("/bookings", {
      service: form.service,
      date: form.date,
      address: form.address,
    });

    console.log(data);

    alert("Booking saved to database ✅");

    // OPTIONAL: refresh bookings after save
    fetchBookings();

    // Reset form
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

  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

  const handleEdit = (index) => {
    const booking = bookings[index];
    setForm({ ...booking, selectedItems: [] });
    setEditIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
const handleDelete = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this booking?"
  );

  if (!confirmDelete) return;

  try {
    await API.delete(`/bookings/${id}`);

    alert("Booking deleted ✅");

    fetchBookings(); // refresh list
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
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

// const navigate = useNavigate();
// const handleProceed = (booking) => {
//   navigate("/checkout", { state: booking });
// };

const [successMsg, setSuccessMsg] = useState("");
const showSuccessMessage = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  setSuccessMsg(
    "Thank you for booking with MyHygiene. Your request has been received, and our team will contact you shortly to confirm the details."
  );

  setTimeout(() => {
    setSuccessMsg("");
  }, 10000); // 10 seconds
};

{successMsg && (
  <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg mb-4 text-center font-medium shadow">
    {successMsg}
  </div>
)}

  return (
    <PageWrapper>
        <div className="min-h-screen bg-gray-50 py-10 px-4">

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
        border-4 border-yellow-500
        shadow-lg
        "
        loading="lazy"
        decoding="async" />
      </div>

      <div>
        <marquee behavior="smooth" direction="left" className="bg-yellow-500 pt-4 rounded-b-full mt-[-10px] md:mt-[-12px] lg:mx-20px] lg:mt-[-12px] xl:mx-[53.7px] xl:mt-[-12px]">
          <h2 className="text-[18px] font-bold text-gray-800 mb-4">For all your payments, we will contact you to confirm the details once we receive your request. So do well to drop your contact information, and do well to be available for our call.</h2>
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
                <label className="flex items-center gap-2 cursor-pointer">
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
            <p className="text-sm text-gray-500 mb-1 flex gap-1"><p className="md:hidden">Tap To</p> Select Date:</p>
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

          <button type="submit"
            className="w-full bg-[#f0b000] text-black py-3 rounded-lg font-semibold hover:bg-[#d59c02] transition">
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
              <div key={index} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition">

                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-gray-800">{b.name}</h3>
                  <span className="text-sm text-blue-600 font-medium">{b.displayTime}</span>
                </div>

                <p className="text-gray-600">📞 {b.phone}</p>
                <p className="text-gray-600">📧 {b.email}</p>
                <p className="text-gray-600">📍 {b.address}</p>

                {b.service && (
                  <p className="text-gray-700 mt-1">🧹 {b.service}</p>
                )}

                {b.items && (
                  <p className="text-gray-700 mt-2 bg-gray-50 p-2 rounded">🧽 {b.items}</p>
                )}

                {b.instructions && (
                  <p className="text-gray-600 mt-2">📌 {b.instructions}</p>
                )}

                <div className="flex justify-between mt-4">
                  <button
                  onClick={() => handleEdit(index)}
                  className="mt-3 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                  Edit
                  </button>

                <button
                  onClick={() => handleDelete(b._id)}
                  className="mt-3 text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition"
                >
                  Delete
                </button>

                <button
                  onClick={() => handleProceed(b)}
                  className="mt-3 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition"
                >
                  Save
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
