// FOUTH VERSION
import { useEffect, useState } from "react";
import API from "../api";

function AdminPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Tracks if data is still fetching
  const [errorMessage, setErrorMessage] = useState(null); // Catches any backend errors

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Grab the token from wherever you saved it during login
        const token = localStorage.getItem("token"); 

        // Pass it in the "headers" so the backend bouncer is let in
        const { data } = await API.get("/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const bookingsArray = Array.isArray(data) ? data : (data.bookings || []);
        setBookings(bookingsArray);
      } catch (error) {
        console.error("Oops, failed to fetch bookings:", error);
        // If it's a 401, we know exactly why it failed!
        if (error.response && error.response.status === 401) {
             setErrorMessage("Unauthorized! You need MyHygiene privileges to see this.");
        } else {
             setErrorMessage(error.message || "Something went wrong fetching the data.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <div className="p-6 mt-8 text-center max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Bookings</h2>

      {/* Show a loading message while waiting for the API */}
      {isLoading && (
        <p className="text-gray-500 animate-pulse">Fetching bookings... hold tight!</p>
      )}

      {/* Show an error message if the API request failed */}
      {errorMessage && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          <p><strong>Error:</strong> {errorMessage}</p>
        </div>
      )}

      {/* Show a friendly message if the API worked, but there are no bookings */}
      {!isLoading && !errorMessage && bookings.length === 0 && (
        <p className="text-gray-500">No bookings found yet. Time to do some marketing!</p>
      )}

      {/* Map through the bookings if we have them */}
      <div className="grid gap-4 mt-6 text-left">
        {bookings.map((b) => (
          <div key={b._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white">
            <p className="text-lg text-gray-900"><strong>{b.name}</strong></p>
            <p className="text-gray-600"><strong>Service:</strong> {b.service}</p>
            <p className="text-gray-600"><strong>Address:</strong> {b.address}</p>
            
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <p>📅 {b.date}</p>
              <p>⏰ {b.time}</p>
            </div>
            
            <p className={`mt-2 inline-block px-3 py-1 rounded-full text-sm font-semibold 
              ${b.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                b.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {b.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;

















// THIRD VERSION
// import { useEffect, useState } from "react";
// import API from "../api";
// import PageWrapper from "../components/PageWrapper";

// function AdminPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get your badge
        
//         const { data } = await API.get("/bookings", {
//           headers: { 
//             Authorization: `Bearer ${token}` // Show the badge to the backend
//           },
//         });
        
//         setBookings(data);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//         setError(err.response?.data?.message || "Failed to load bookings. Are you an Admin?");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   return (
//     <PageWrapper>
//       <div className="max-w-6xl mx-auto p-6 mt-10">
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 border-b-4 border-[#f0b000] inline-block pb-2">
//           Admin Dashboard: All Bookings
//         </h2>

//         {loading && <div className="text-center py-10 font-medium">Checking the database...</div>}
        
//         {error && (
//           <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center mb-6">
//             {error}
//           </div>
//         )}

//         {!loading && bookings.length === 0 && !error && (
//           <p className="text-center text-gray-500">No bookings found. Database is empty! 😴</p>
//         )}

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {bookings.map((b) => (
//             <div key={b._id} className="bg-white shadow-lg rounded-xl p-5 border-t-4 border-[#f0b000] hover:scale-[1.02] transition-transform">
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="font-bold text-blue-600 uppercase text-sm">{b.name}</h3>
//                 <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">
//                   {b.status || "NEW"}
//                 </span>
//               </div>
              
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p><strong>🧹 Service:</strong> {b.service}</p>
//                 <p><strong>📅 Date:</strong> {b.date}</p>
//                 <p><strong>⏰ Time:</strong> {b.time || "Not set"}</p>
//                 <p><strong>📍 Address:</strong> {b.address}</p>
//                 <p><strong>📞 Phone:</strong> {b.phone}</p>
//                 <hr className="my-3" />
//                 <p className="text-xs text-gray-500"><strong>Items:</strong> {b.items || "N/A"}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </PageWrapper>
//   );
// }

// export default AdminPage;









// FIRST VERSION
// import { useEffect, useState } from "react";
// import API from "../api";

// function AdminPage() {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchAll = async () => {
//       const { data } = await API.get("/bookings");
//       setBookings(data);
//     };

//     fetchAll();
//   }, []);

//   return (
//     <div className="p-6 mt-8 text-center">
//       <h2 className="text-2xl font-bold mb-4">All Bookings</h2>

//       {bookings.map((b) => (
//         <div key={b._id} className="border p-4 mb-3 rounded">
//           <p><strong>{b.name}</strong></p>
//           <p>{b.service}</p>
//           <p>{b.address}</p>
//           <p>{b.date}</p>
//           <p>{b.time}</p>
//           <p>{b.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default AdminPage;









// SECOND VERSION
// import { useEffect, useState } from "react";
// import API from "../api";
// import PageWrapper from "../components/PageWrapper"; // Added for consistent layout

// function AdminPage() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Get the badge
        
//         const { data } = await API.get("/bookings", {
//           headers: { Authorization: `Bearer ${token}` }, // Send the badge
//         });
        
//         setBookings(data);
//       } catch (err) {
//         console.error("Admin Fetch Error:", err);
//         setError("Failed to load bookings. Are you logged in as Admin?");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, []);

//   return (
//     <PageWrapper>
//       <div className="max-w-6xl mx-auto p-6 mt-10">
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
//           Admin Dashboard: All Bookings
//         </h2>

//         {loading && <p className="text-center">Loading all records...</p>}
//         {error && <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>}

//         {!loading && bookings.length === 0 && (
//           <p className="text-center text-gray-500">No bookings found in the database.</p>
//         )}

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {bookings.map((b) => (
//             <div key={b._id} className="bg-white shadow-md rounded-xl p-5 border-l-4 border-[#f0b000] hover:shadow-lg transition">
//               <div className="flex justify-between items-start mb-3">
//                 <h3 className="font-bold text-lg text-blue-600">{b.name}</h3>
//                 <span className="text-xs font-bold uppercase px-2 py-1 bg-gray-100 rounded text-gray-600">
//                   {b.status || "Pending"}
//                 </span>
//               </div>
              
//               <div className="space-y-2 text-sm text-gray-700">
//                 <p><strong>🧹 Service:</strong> {b.service}</p>
//                 <p><strong>📍 Address:</strong> {b.address}</p>
//                 <p><strong>📅 Date:</strong> {b.date}</p>
//                 <p><strong>⏰ Time:</strong> {b.time || "Not specified"}</p>
//                 <p><strong>📞 Phone:</strong> {b.phone}</p>
//                 <hr className="my-2" />
//                 <p className="italic text-gray-500">Items: {b.items || "None"}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </PageWrapper>
//   );
// }

// export default AdminPage;