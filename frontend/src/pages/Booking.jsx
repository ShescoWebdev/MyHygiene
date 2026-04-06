// import { useState } from "react";
// import API from "../api";

// function Booking() {
//   const [form, setForm] = useState({
//     service: "",
//     date: "",
//     address: "",
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const createBooking = async () => {
//     try {
//       const { data } = await API.post("/bookings", form);
//       console.log(data);
//       alert("Booking created!");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//     }
//   };

//   return (
//     <div>
//       <input name="service" placeholder="Service" onChange={handleChange} />
//       <input name="date" type="date" onChange={handleChange} />
//       <input name="address" placeholder="Address" onChange={handleChange} />

//       <button onClick={createBooking}>Book Now</button>
//     </div>
//   );
// }

// export default Booking;