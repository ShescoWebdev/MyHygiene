import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import API from "../api";
import Swal from "sweetalert2";
import Skeleton from "../components/Skeleton";
import { AuthContext } from "../context/AuthContext";

function BookingPage() {
  const { user } = useContext(AuthContext);
  console.log("Current user object:", user);

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

  // AUTO-FILL: If user is logged in, fill the data instantly.
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

  // SEPARATED STATES: Drafts (new form entries) vs History (fetched from DB)
  const [draftBookings, setDraftBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const [editDraftIndex, setEditDraftIndex] = useState(null);
  
  const [loadingIndex, setLoadingIndex] = useState(null); 
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const formRef = useRef(null);
  const bookingsRef = useRef(null);

  const quickItems = ["Kitchen", "Bathroom", "Toilet", "Bedroom", "Living Room", "Office Space", "Environnement", "Suits", "Shirts", "Skirts", "Trousers", "Bedspreads", "Others (see other items field below)"];

  useEffect(() => {
    setTimeout(() => setLoading(false), 5000);
  }, []);

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
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return `${dateObj.toLocaleDateString("en-US", options)} • ${form.hour}:${form.minute} ${form.period}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const combinedItems = [...form.selectedItems, form.items].filter(Boolean).join(", ");
    const newBooking = { ...form, items: combinedItems, displayTime: formatDateTime() };

    if (editDraftIndex !== null) {
      const updatedBookings = [...draftBookings];
      updatedBookings[editDraftIndex] = newBooking;
      setDraftBookings(updatedBookings);
      setEditDraftIndex(null);
    } else {
      setDraftBookings([...draftBookings, newBooking]);
    }

    // Reset form but keep the auto-filled user details intact
    setForm({
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      address: user?.address || "",
      service: "",
      items: "",
      selectedItems: [],
      instructions: "",
      date: "",
      hour: "1",
      minute: "00",
      period: "AM",
    });

    setTimeout(() => {
      bookingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleEditDraft = (index) => {
    const booking = draftBookings[index];
    setForm({ ...booking, selectedItems: booking.selectedItems || [] });
    setEditDraftIndex(index);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };
  
  const handleDeleteDraft = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this booking draft!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f0b000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedBookings = draftBookings.filter((_, i) => i !== index);
        setDraftBookings(updatedBookings);
        Swal.fire({ title: "Deleted!", text: "Your booking draft has been removed.", icon: "success", confirmButtonColor: "#f0b000", timer: 1500 });
      }
    });
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      if(!token) return; // Don't fetch if no token
      
      const { data } = await API.get("/bookings/my", {
          headers: { Authorization: `Bearer ${token}` }
      });
      // Set to history, not drafts!
      setHistoryBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // Handle Proceed: Drafts or History
  const handleProceed = (booking, type, index) => {
    Swal.fire({
      title: "Confirm Booking",
      text: "Are you sure you want to send this booking request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f0b000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Save Booking!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoadingIndex(`${type}-${index}`);
        try {
          const token = localStorage.getItem("token");
          
          // In case history booking time format differs from drafts
          const bookingTime = booking.time || `${booking.hour}:${booking.minute} ${booking.period}`;

          const { data } = await API.post(
            "/bookings",
            {
              name: booking.name,
              phone: booking.phone,
              email: booking.email,
              service: booking.service,
              date: booking.date,
              time: bookingTime,
              address: booking.address,
              items: booking.items,
              instructions: booking.instructions,
            },
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
          );

          navigate("/booking-success", { state: { bookingSuccessful: true } });
          
          // Only remove from screen if it was a draft. We leave history alone.
          if (type === "draft") {
            const updatedBookings = draftBookings.filter((_, i) => i !== index);
            setDraftBookings(updatedBookings);
          }

        } catch (err) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.response?.data?.message || "Something went wrong! Please try again.",
            confirmButtonColor: "#f0b000",
          });
        } finally {
          setLoadingIndex(null);
        }
      }
    });
  };

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

        {loading ? (
        <Skeleton className="w-[22.5rem] h-[30rem] md:w-[90vw] md:h-[600vh] mt-10 m-auto rounded-2xl" />
      ) : (
        <div>
        <img 
        src="https://res.cloudinary.com/detg3ravj/image/upload/f_auto,q_auto,w_1200/v1774993815/Pricing_g9poup.jpg" 
        alt="Pricing List" 
        className="m-auto mt-10 rounded-2xl text-sm rounded-b-none border-4 border-yellow-500 shadow-lg"
        loading="lazy"
        decoding="async" />
        </div>
        )}
      </div>

      <div>
        <marquee behavior="smooth" direction="left" className="bg-yellow-500 pt-4 rounded-b-full mt-[-4px] md:mt-[-5px] lg:mt-[-5px] xl:mx-[53.7px] xl:mt-[-5px]">
          <h2 className="text-[18px] font-bold text-gray-800 mb-4">For all your payments, we will contact you to confirm the details once we receive your request. So do well to drop your contact information and be available for our call. For more information, contact us on +234 814 536 4748.</h2>
        </marquee>
      </div>

      {/* INSTRUCTION BANNER FOR LOGGED IN USERS */}
      {user && (
        <div className="max-w-2xl mx-auto mt-12 mb-[-30px]">
          <div className="bg-blue-50 border-l-4 border-[#f0b000] p-5 rounded-r-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Welcome back, {user.name?.split(' ')[0] || 'User'}!
            </h2>
            <p className="text-gray-700 text-sm md:text-base">
              Scroll down below to view your <strong>booking history</strong>, and choose to save bookings directly from there if it suits your needs. Otherwise, proceed with your new booking in the form below.
            </p>
          </div>
        </div>
      )}

      {/* FORM */}
      <div ref={formRef} className="max-w-2xl mx-auto bg-white shadow-xl mt-20 md:mt-24 rounded-2xl p-6 border-t-4 border-[#f0b000]">
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

          <select name="service" value={form.service} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" required>
            <option value="" disabled>Select Service</option>
            <option>Apartment Cleaning</option>
            <option>Laundry Services</option>
            <option>Post-Construction Cleaning</option>
            <option>Office Cleaning</option>
          </select>

          <div>
          <p className="text-sm font-bold text-gray-700 mb-2">Select areas and items to clean (optional, tick all that applies):</p>
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
                  {form.selectedItems.includes(item) && <span className="text-black text-xs">✓</span>}
                </div>
                <span className="text-sm">{item}</span>
              </label>
              ))}
            </div>
          </div>

          <textarea name="items" placeholder="Other areas or items (e.g., 3-bedroom flat, staircase, bags, caps)"
            value={form.items} onChange={handleChange} rows="2"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" />

          <textarea name="instructions" placeholder="Additional instructions (e.g., red gate, call before arrival, opposite the church)"
            value={form.instructions} onChange={handleChange} rows="3"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none" />

          <div>
            <div className="text-sm text-gray-500 mb-1 flex gap-1"><span className="md:hidden">Tap To</span> Select Date:</div>
            <input type="date" name="date" value={form.date} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#f0b000] outline-none cursor-pointer" required />
          </div>

          <div className="flex items-end gap-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">Hr</p>
              <select name="hour" value={form.hour} onChange={handleChange} className="p-2 border rounded-lg cursor-pointer">
                {[...Array(12)].map((_, i) => (<option key={i} value={i + 1}>{i + 1}</option>))}
              </select>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Min</p>
              <select name="minute" value={form.minute} onChange={handleChange} className="p-2 border rounded-lg cursor-pointer">
                {[...Array(60)].map((_, i) => (<option key={i} value={String(i).padStart(2, "0")}>{String(i).padStart(2, "0")}</option>))}
              </select>
            </div>
            <select name="period" value={form.period} onChange={handleChange} className="p-2 border rounded-lg cursor-pointer">
              <option>AM</option>
              <option>PM</option>
            </select>
          </div>

          {form.date && <p className="text-sm text-blue-600 bg-blue-50 p-2 rounded-lg">{formatDateTime()}</p>}

          <button type="submit" className="w-full py-3 rounded-lg font-semibold transition bg-[#f0b000] hover:bg-[#d59c02]">
            {editDraftIndex !== null ? "Update Booking" : "Save Booking Draft"}
          </button>

        </form>
      </div>

      {/* BOOKINGS LISTINGS */}
      <div ref={bookingsRef} className="max-w-2xl mx-auto mt-12 mb-20 space-y-12">
        
        {/* NEW DRAFT BOOKINGS */}
        {(draftBookings.length > 0 || !user) && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your New Bookings</h2>
            {draftBookings.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow text-center border border-gray-100">
                <p className="text-gray-500 text-lg">No new bookings yet 😴</p>
                <p className="text-gray-400 text-sm mt-1">Bookings you create in the form will appear here before you save them.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {draftBookings.map((b, index) => (
                  <div key={`draft-${index}`} className="p-4 rounded-xl border-t-4 border-b-4 border-yellow-500 shadow hover:shadow-md transition bg-white">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-blue-600">{b.name}</h3>
                      <span className="text-sm text-blue-600 font-medium">{b.displayTime}</span>
                    </div>
                    <hr />
                    <p className="text-gray-600 pt-3 pb-3">📞 {b.phone}</p>
                    <hr />
                    <p className="text-gray-600 pt-3 pb-3">📧 {b.email}</p>
                    <hr />
                    <p className="text-gray-600 pt-3 pb-3">📍 {b.address}</p>
                      <hr />
                    {b.service && <p className="text-gray-700 pt-3 pb-3">🧹 {b.service}</p>}
                    <hr />
                    {b.items && <p className="text-gray-70 p-2 rounded pt-3 pb-3">🧽 {b.items}</p>}
                      <hr />
                    {b.instructions && <p className="text-gray-600 pt-3 pb-3">📌 {b.instructions}</p>}
                    <hr />
                    <div className="flex justify-between mt-4">
                      <button onClick={() => handleEditDraft(index)} className="mt-3 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200 transition">Edit</button>

                      <button onClick={() => handleDeleteDraft(index)} className="mt-3 text-sm bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 transition">Delete</button>

                      <button onClick={() => handleProceed(b, "draft", index)} disabled={loadingIndex === `draft-${index}`} className={`mt-3 text-sm px-4 py-1 rounded font-medium transition flex items-center justify-center gap-2 ${loadingIndex === `draft-${index}` ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#f0b000] text-black hover:bg-[#d59c02]"}`}>
                        {loadingIndex === `draft-${index}` ? (<><span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>Saving...</>) : ("Save Final Booking")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* BOOKING HISTORY (ONLY IF LOGGED IN) */}
        {user && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 pt-6 border-t border-gray-300">Your Booking History</h2>
            {historyBookings.length === 0 ? (
              <div className="bg-white p-6 rounded-xl shadow text-center border border-gray-100">
                <p className="text-gray-500 text-lg">No past bookings found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {historyBookings.map((b, index) => (
                  <div key={`history-${index}`} className="p-4 rounded-xl border-t-4 border-b-4 border-gray-400 shadow hover:shadow-md transition bg-white opacity-95">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-gray-700">{b.name}</h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {b.displayTime || (b.date && new Date(b.date).toLocaleDateString()) || "Past Booking"}
                      </span>
                    </div>
                    <hr />
                    <p className="text-gray-600 pt-3 pb-3">📞 {b.phone}</p>
                    <hr />
                    <p className="text-gray-600 pt-3 pb-3">📧 {b.email}</p>
                    <hr />
                    <p className="text-gray-600 pt-3 pb-3">📍 {b.address}</p>
                      <hr />
                    {b.service && <p className="text-gray-700 pt-3 pb-3">🧹 {b.service}</p>}
                    <hr />
                    {b.items && <p className="text-gray-70 p-2 rounded pt-3 pb-3">🧽 {b.items}</p>}
                      <hr />
                    {b.instructions && <p className="text-gray-600 pt-3 pb-3">📌 {b.instructions}</p>}
                    <hr />
                    <div className="flex justify-end mt-4">
                      <button onClick={() => handleProceed(b, "history", index)} disabled={loadingIndex === `history-${index}`} className={`mt-3 text-sm px-4 py-1 rounded font-medium transition flex items-center justify-center gap-2 ${loadingIndex === `history-${index}` ? "bg-gray-400 text-white cursor-not-allowed" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`}>
                        {loadingIndex === `history-${index}` ? (<><span className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"></span>Saving...</>) : ("Save (Re-book this)")}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
    </PageWrapper>
  )
}

export default BookingPage;