import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import API from "../api";
import PageWrapper from "../components/PageWrapper";

const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', options); 
};

function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null); 
  
  const [visibleCount, setVisibleCount] = useState(10); 

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token"); 

        const { data } = await API.get("/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        let bookingsArray = Array.isArray(data) ? data : (data.bookings || []);
        
        bookingsArray.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        
        setBookings(bookingsArray);
      } catch (error) {
        console.error("Oops, failed to fetch bookings:", error);
        if (error.response && error.response.status === 401) {
             setErrorMessage("Unauthorized! You need Admin privileges.");
        } else {
             setErrorMessage(error.message || "Something went wrong fetching the data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      
      await API.put(`/bookings/${bookingId}/status`, 
        { status: newStatus }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prevBookings) => 
        prevBookings.map((b) => 
          b._id === bookingId ? { ...b, status: newStatus } : b
        )
      );

      // Optional: A little toast notification for success
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Status updated',
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error("Failed to update status:", error);
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Failed to update status. Ensure your backend is running and you are logged in as Admin.',
        confirmButtonColor: '#f0b000'
      });
    }
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  const visibleBookings = bookings.slice(0, visibleCount);

  return (
    <PageWrapper>
    <div className="p-6 mt-8 text-center w-full">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Bookings</h2>

      {isLoading && <p className="text-gray-500 animate-pulse">Fetching bookings... hold tight!</p>}

      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          <p><strong>Error:</strong> {errorMessage}</p>
        </div>
      )}

      {!isLoading && !errorMessage && bookings.length === 0 && (
        <p className="text-gray-500">No bookings found yet. Time to do some marketing!</p>
      )}

      <div className="grid gap-4 mt-6 text-left">
        {visibleBookings.map((b) => (
          <div key={b._id} className="border p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
            <p className="text-lg text-blue-700"><strong>{b.name}</strong></p>
            <p className="text-black"><strong>Service:</strong> <span className="text-gray-600">{b.service}</span></p>
            <p className="text-black"><strong>Address:</strong> <span className="text-gray-600">{b.address}</span></p>
            
            <div className="flex gap-4 mt-3 text-sm text-blue-700/70 font-medium">
              <p><span className="text-black">📅</span> {formatDate(b.date)}</p>
              <p><span className="text-black">⏰</span> {b.time}</p>
            </div>
            
            <select 
              value={b.status}
              onChange={(e) => handleStatusChange(b._id, e.target.value)}
              className={`mt-4 inline-block px-4 py-1.5 rounded-full text-sm font-bold cursor-pointer outline-none border border-transparent hover:border-gray-300 transition-colors
                ${b.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  b.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                  b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 
                  'bg-purple-100 text-purple-800'}`}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        ))}
      </div>

      {visibleCount < bookings.length && (
        <button 
          onClick={loadMore}
          className="mt-8 px-6 py-2 bg-[#f0b000] text-black font-bold rounded-full hover:bg-[#dba102] transition shadow-md"
        >
          See More Bookings
        </button>
      )}
    </div>
    </PageWrapper>
  );
}

export default AdminPage;