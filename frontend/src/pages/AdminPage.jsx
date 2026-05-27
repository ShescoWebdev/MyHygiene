import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Swal from 'sweetalert2';
import API from "../api";
import PageWrapper from "../components/PageWrapper";
import SafeNavLink from "../components/SafeNavLink";

// To format the date in a more readable way
const formatDate = (dateString) => {
  if (!dateString) return "Not specified";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const d = new Date(dateString);
  return d.toLocaleDateString('en-US', options); 
};

// To format the exact time the booking was received by the server
const formatReceivedTime = (dateString) => {
  if (!dateString) return "";
  const d = new Date(dateString);
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

// To view and manage all bookings & activities
function AdminPage() {
  const navigate = useNavigate(); 
  
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null); 
  const [visibleCount, setVisibleCount] = useState(10);
  const [openMenuId, setOpenMenuId] = useState(null); 
  
  const [selectedUserKey, setSelectedUserKey] = useState(null);
  
  // State to toggle between the main inbox and the activity timeline
  const [activeView, setActiveView] = useState('bookings'); // 'bookings' | 'activity'

  // Live state for our database activities
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token"); 

        // Fetch Bookings
        const { data: bookingsData } = await API.get("/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        let bookingsArray = Array.isArray(bookingsData) ? bookingsData : (bookingsData.bookings || []);
        bookingsArray.sort((a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date));
        setBookings(bookingsArray);

        // Fetch Activities
        const { data: activityData } = await API.get("/activities", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setActivities(activityData);

      } catch (error) {
        console.error("Oops, failed to fetch data:", error);
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

      Swal.fire({
        toast: true, position: 'top-end', icon: 'success', title: 'Status updated', showConfirmButton: false, timer: 1500
      });

    } catch (error) {
      console.error("Failed to update status:", error);
      Swal.fire({
        icon: 'error', title: 'Update Failed', text: 'Failed to update status.', confirmButtonColor: '#f0b000'
      });
    }
  };

  const loadMore = () => setVisibleCount(prev => prev + 10);

  const groupedBookingsMap = bookings.reduce((acc, curr) => {
    const key = curr.email || curr.phone || curr.name || 'Unknown';
    if (!acc[key]) acc[key] = [];
    acc[key].push(curr);
    return acc;
  }, {});

  const masterList = Object.entries(groupedBookingsMap).map(([key, group]) => {
    return { key, latestBooking: group[0], count: group.length, allBookings: group };
  });

  const visibleMasterList = masterList.slice(0, visibleCount);

  // Unread notification count
  const unreadCount = activities.filter(a => !a.isRead).length;

  const handleViewActivities = async () => {
    setActiveView('activity');
    setSelectedUserKey(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If there are unread notifications, mark them read in the DB and UI
    if (unreadCount > 0) {
      try {
        const token = localStorage.getItem("token");
        await API.put("/activities/mark-read", {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Update local state instantly so the red badge disappears
        setActivities((prev) => prev.map(a => ({ ...a, isRead: true })));
      } catch (error) {
        console.error("Failed to mark activities as read:", error);
      }
    }
  };

  // To delete a single notification
  const handleDeleteActivity = async (activityId) => {
    setOpenMenuId(null); 

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(`/activities/${activityId}`);
          setActivities((prev) => prev.filter((item) => item._id !== activityId));
          Swal.fire("Deleted!", "Notification removed.", "success");
        } catch (error) {
          Swal.fire("Error!", "Could not delete this item.", "error");
        }
      }
    });
  };

  // To clear all notifications
  const handleClearAllActivities = async () => {
    setOpenMenuId(null);
    Swal.fire({
      title: "Clear all logs?",
      text: "This will permanently wipe your entire notification history!",
      icon: "error", 
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, clear all!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete("/activities");
          setActivities([]); 
          Swal.fire("Cleared!", "All activity logs have been wiped clean.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to clear activity logs.", "error");
        }
      }
    });
  };

  return (
    <PageWrapper>
      <div className="fixed top-0 left-0 w-full z-50 bg-[#000] backdrop-blur-lg shadow-md border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:py-4 py-5 flex justify-between items-center">
          
          <h2 className="text-xl sm:text-2xl font-bold text-white break-words">
            {activeView === 'activity' ? "Activity Log" : selectedUserKey ? "Booking Details" : "All Bookings"}
          </h2>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Notification Bell Icon */}
            <button 
              onClick={handleViewActivities}
              className="relative p-1 text-[#f0b000] scale-90 hover:scale-100 transition-transform duration-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7 hover:fill-[#f0b000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Back Navigation */}
            {activeView === 'activity' ? (
               <button 
                 onClick={() => {
                   setActiveView('bookings');
                   window.scrollTo({ top: 0, behavior: 'smooth' }); 
                 }}
                 className="text-sm font-bold text-[#f0b000] hover:text-[#dba102] underline whitespace-nowrap"
               >
                 &larr; Back to Bookings
               </button>
            ) : !selectedUserKey ? (
              <SafeNavLink to="/">
                <button className="text-sm font-bold text-blue-400 hover:text-blue-300 underline whitespace-nowrap">
                  &larr; Back to Homepage
                </button>
              </SafeNavLink>
            ) : (
              <button 
                onClick={() => {
                  setSelectedUserKey(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' }); 
                }}
                className="text-sm font-bold text-blue-400 hover:text-blue-300 underline whitespace-nowrap"
              >
                &larr; Back to Inbox
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto pb-12 pt-10 md:pt-7 px-4 sm:px-6 relative text-center">
          
        {isLoading && <p className="text-gray-500 animate-pulse">Fetching data... hold tight!</p>}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-left">
            <p><strong>Error:</strong> {errorMessage}</p>
          </div>
        )}

        {/* ACTIVITY LOG TIMELINE */}
        {activeView === 'activity' && (
           <div className="w-full text-left bg-white rounded-lg shadow-sm border p-4 sm:p-6 mt-4 md:mt-0 relative">
             
             {openMenuId !== null && (
               <div 
                 className="fixed inset-0 z-40 bg-transparent cursor-default" 
                 onClick={(e) => {
                   e.stopPropagation(); 
                   setOpenMenuId(null);
                 }} 
               />
             )}

             <h3 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Recent Platform Reactions</h3>
             
             {activities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No recent activity to show.</p>
             ) : (
                <div className="relative space-y-2 md:space-y-0">
                  {activities.map((activity) => (
                    
                    <div 
                      key={activity._id} 
                      onClick={() => {
                        // Routes directly to the post detail view if it exists
                        if (activity.postId) {
                          navigate(`/hub/${activity.postId}`); 
                        } else {
                          navigate('/hub'); // Fallback route for older notification cards
                        }
                      }}
                      className="relative md:pl-8 flex gap-2 md:gap-4 hover:bg-gray-100 p-2 md:p-7 rounded transition justify-between items-start cursor-pointer group"
                    >
                      {/* Avatar / Dot */}
                      <div className="flex-shrink-0 mr-4">
                        {activity.profilePic ? (
                          <img
                            src={activity.profilePic} 
                            alt={activity.user} 
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-sm border border-gray-300">
                            {activity.user === "A Website Visitor" ? "WV" : activity.user?.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      
                      {/* Activity Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 break-all overflow-hidden text-sm md:text-base leading-relaxed">
                          <span className="font-bold text-blue-900 mr-1.5">{activity.user}</span> 
                          {activity.action}
                        </p>
                        <span className="text-xs text-gray-400 block mt-1">
                          {new Date(activity.createdAt).toLocaleString()}
                        </span>
                      </div>

                      {/* 3-Dots Menu Container */}
                      <div className="relative z-50">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); 
                            setOpenMenuId(openMenuId === activity._id ? null : activity._id);
                          }}
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-200 rounded-full transition focus:outline-none"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        {openMenuId === activity._id && (
                          <div 
                            onClick={(e) => e.stopPropagation()} 
                            className="absolute right-0 md:right-12 bottom-0 md:top-auto w-32 bg-white border border-gray-200 rounded-md shadow-xl z-50 overflow-hidden"
                          >
                            <button 
                              onClick={() => handleDeleteActivity(activity._id)}
                              className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-100 transition rounded-none text-red-600"
                            >
                              Delete Log
                            </button>

                            <button 
                              onClick={() => handleClearAllActivities()}
                              className="w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-100 transition rounded-none text-red-600"
                            >
                              Delete All Logs
                            </button>

                            <button 
                              onClick={() => setOpenMenuId(null)}
                              className="w-full text-left px-4 py-2.5 text-xs text-gray-500 hover:bg-gray-100 transition border-t border-gray-100 rounded-none"
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {/* Unread Indicator */}
                      {!activity.isRead && (
                        <div className="h-7 w-7 rounded-full bg-blue-600 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
             )}
           </div>
        )}

        {/* BOOKINGS (Inbox / Detailed) */}
        {activeView === 'bookings' && (
          <>
            {!isLoading && !errorMessage && bookings.length === 0 && (
              <p className="text-gray-500">No bookings found yet. Time to do some marketing!</p>
            )}

            {/* Main inbox view */}
            {!selectedUserKey && visibleMasterList.length > 0 && (
              <div className="grid gap-3 text-left w-full mt-4">
                {visibleMasterList.map((group) => (
                  <div 
                    key={group.key} 
                    onClick={() => {
                      setSelectedUserKey(group.key);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="border p-4 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 transition cursor-pointer bg-white w-full overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-base sm:text-lg text-blue-800 font-bold flex items-center gap-2 flex-wrap break-words">
                        {group.latestBooking.name}
                        {group.count > 1 && (
                          <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
                            {group.count}
                          </span>
                        )}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 font-medium break-words">
                        {formatReceivedTime(group.latestBooking.createdAt || group.latestBooking.date)}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 break-words whitespace-normal">
                      {group.latestBooking.service} • {group.latestBooking.address}
                    </p>
                  </div>
                ))}

                {visibleCount < masterList.length && (
                  <button 
                    onClick={loadMore}
                    className="mt-6 px-6 py-2 bg-[#f0b000] text-black font-bold rounded-full hover:bg-[#dba102] transition shadow-md w-full sm:w-max mx-auto"
                  >
                    See More Bookings
                  </button>
                )}
              </div>
            )}

            {/* Detailed booking view */}
            {selectedUserKey && (
              <div className="grid gap-6 text-left w-full mt-4">
                {groupedBookingsMap[selectedUserKey].map((b) => (
                  <div key={b._id} className="border p-4 sm:p-6 rounded-lg shadow-md bg-white w-full overflow-hidden">
                    
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-3 mb-4 gap-2">
                      <h3 className="text-lg sm:text-xl text-blue-800 font-bold break-words">Booking Request</h3>
                      <span className="text-xs sm:text-sm text-gray-500 font-medium break-words">
                        Received: {formatDate(b.createdAt || b.date)} at {formatReceivedTime(b.createdAt || b.date)}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 text-black mb-6 text-sm sm:text-base w-full">
                      <p className="break-words"><strong>Name:</strong> <span className="text-gray-600">{b.name || "N/A"}</span></p>
                      <p className="break-words"><strong>Email:</strong> <span className="text-gray-600">{b.email || "N/A"}</span></p>
                      <p className="break-words"><strong>Phone:</strong> <span className="text-gray-600">{b.phone || "N/A"}</span></p>
                      <p className="break-words"><strong>Address:</strong> <span className="text-gray-600">{b.address || "N/A"}</span></p>
                      <p className="break-words"><strong>Service:</strong> <span className="text-gray-600">{b.service || "N/A"}</span></p>
                      <p className="break-words"><strong>Items:</strong> <span className="text-gray-600">{b.items || "None specified"}</span></p>
                      
                      <div className="sm:col-span-2 w-full">
                        <p><strong>Instructions:</strong></p>
                        <p className="text-gray-600 bg-gray-50 p-3 rounded mt-1 border break-words whitespace-normal">
                          {b.instructions || "No special instructions provided."}
                        </p>
                      </div>

                      <div className="sm:col-span-2 flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 text-sm text-blue-700/70 font-medium bg-blue-50 p-3 rounded w-full">
                        <p className="break-words"><span className="text-black">📅 Cleaning Date:</span> {formatDate(b.date)}</p>
                        <p className="break-words"><span className="text-black">⏰ Cleaning Time:</span> {b.time || "N/A"}</p>
                      </div>
                    </div>
                    
                    <div className="border-t pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                      <span className="font-bold text-gray-700 text-sm sm:text-base">Manage Status:</span>
                      <select 
                        value={b.status || 'Pending'}
                        onChange={(e) => handleStatusChange(b._id, e.target.value)}
                        disabled={b.status === 'Completed'} 
                        className={`w-full sm:w-auto px-4 py-2 rounded-full text-sm font-bold cursor-pointer outline-none border transition-colors
                          ${b.status === 'Pending' || !b.status ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 
                            b.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-300 opacity-70 cursor-not-allowed' : 
                            b.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 border-blue-300' : 
                            'bg-purple-100 text-purple-800'}`}
                      >
                        <option value="Pending" disabled>Pending</option>
                        <option value="Confirmed" disabled={b.status === 'Confirmed' || b.status === 'Completed'}>Confirmed</option>
                        <option value="Completed" disabled={b.status === 'Pending' || !b.status || b.status === 'Completed'}>Completed</option>
                      </select>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </PageWrapper>
  );
}

export default AdminPage;