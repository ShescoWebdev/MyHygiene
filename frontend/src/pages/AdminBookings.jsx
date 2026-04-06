import { useEffect, useState } from "react";
import API from "../api";

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const { data } = await API.get("/bookings");
      setBookings(data);
    };

    fetchAll();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

      {bookings.map((b) => (
        <div key={b._id} className="border p-4 mb-3 rounded">
          <p><strong>{b.name}</strong></p>
          <p>{b.service}</p>
          <p>{b.address}</p>
          <p>{b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;