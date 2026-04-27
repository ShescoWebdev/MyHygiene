import { useState, useEffect, useRef, useContext } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Menu, X, Camera, Upload, LogOut, UserPlus } from "lucide-react"
import SafeNavLink from "../SafeNavLink"
import { AuthContext } from "../../context/AuthContext"
import Swal from "sweetalert2"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [desktopDropdown, setDesktopDropdown] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(false)

  const navigate = useNavigate()

  const desktopDropdownRef = useRef(null)
  const mobileDropdownRef = useRef(null)

  // Grab user, login, and logout from our Global Brain
  const { user, login, logout, loading } = useContext(AuthContext)
  
  // States for the profile dropdowns
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [picMenuOpen, setPicMenuOpen] = useState(false); 
  
  // NEW: State to hold history of saved accounts
  const [savedAccounts, setSavedAccounts] = useState([]);

  const profileRef = useRef(null);
  
  // Separate references: one for files, one for the direct camera! 📸
  const fileInputRef = useRef(null); 
  const cameraInputRef = useRef(null); 

  // Load saved accounts from localStorage whenever the dropdown opens or user changes
  useEffect(() => {
    const accountsStr = localStorage.getItem("savedAccounts");
    if (accountsStr) {
      try {
        setSavedAccounts(JSON.parse(accountsStr));
      } catch (error) {
        console.error("Failed to parse saved accounts", error);
      }
    }
  }, [user, profileDropdown]);

  // Filter out the currently active user so they don't show up in the "Other Accounts" list
  const otherAccounts = savedAccounts.filter(acc => acc.user.email !== user?.email);

  // Closes the profile dropdowns if the user clicks anywhere else
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
        setPicMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-600 border-b-2 border-blue-600 font-bold"
      : "text-black hover:text-blue-600 font-bold"

  const dropdownLinkStyle = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 text-blue-700 border-l-2 border-blue-600 pl-1 font-semibold"
      : "block md:py-2 hover:text-blue-700 border-l-2 border-transparent pl-1 font-semibold"

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto"
  }, [open])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setDesktopDropdown(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleMobileOutside = (e) => {
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setMobileDropdown(false)
      }
    }
    document.addEventListener("click", handleMobileOutside)
    return () => {
      document.removeEventListener("click", handleMobileOutside)
    }
  }, [])

  const handleSmartBooking = () => {
    const token = localStorage.getItem("token");
    if (token && user) {
      navigate("/booking");
      setOpen(false); 
    } else if (!token && user) {
      navigate("/auth?redirect=/booking");
      setOpen(false);
    } else {
      navigate("/book-choice");
      setOpen(false);
    }
  };

  // Switch Account Handler
  const handleSwitchAccount = (account) => {
    login(account.user, account.token);
    setProfileDropdown(false);
    
    Swal.fire({
      title: `Switched to ${account.user.name.split(' ')[0]}`,
      icon: "success",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });
  };

  const handleLogoutClick = () => {
    setProfileDropdown(false); 
    setOpen(false); 
    
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f0b000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out"
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  // NEW: Updated to actually send the file to the backend
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Close the tiny picture menu
    setPicMenuOpen(false);

    // Show loading alert so the user knows it's working
    Swal.fire({
      title: 'Uploading...',
      text: 'Saving your profile picture securely.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Prepare the file to be sent via HTTP
    const formData = new FormData();
    formData.append("image", file); // Must match 'upload.single("image")' in your backend route

    try {
      const token = localStorage.getItem("token");
      
      // Make sure this URL matches your backend setup! 
      // e.g., http://localhost:5000/api/profile-pic or wherever your route is mounted
      const response = await fetch("https://myhygiene-backend.onrender.com/api/auth/profile-pic", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}` // Send token to pass the 'protect' middleware
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Update global state with new user info (which includes the new Cloudinary profilePic URL)
        login(data, data.token); 
        Swal.fire({
            title: "Success!",
            text: "Profile picture updated beautifully.",
            icon: "success",
            confirmButtonColor: "#f0b000"
        });
      } else {
        Swal.fire("Upload Failed", data.message || "Could not save the image.", "error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("Error", "Something went wrong. Check your internet connection or server.", "error");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50">
        
        <nav className="bg-[#f0b000] px-4 md:px-6 py-4 flex justify-between items-center shadow-md w-full">

          <div className="flex items-center gap-3 md:gap-0">
            <button
              onClick={() => setOpen(!open)}
              className="text-black md:hidden cursor-pointer focus:outline-none"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
            
            <div className="cursor-pointer">
              <SafeNavLink to="/">
                <img src="https://res.cloudinary.com/detg3ravj/image/upload/v1774993795/Logo3_ueigkn.png" alt="MyHygiene Logo" width="130" height="50" />
              </SafeNavLink>
            </div>
          </div>

          <div className="hidden md:flex space-x-6 items-center">
            <SafeNavLink to="/" className={linkStyle}>Home</SafeNavLink>
            <SafeNavLink to="/about" className={linkStyle}>About Us</SafeNavLink>
            <SafeNavLink to="/services" className={linkStyle}>Services</SafeNavLink>
            <SafeNavLink to="/contact" className={linkStyle}>Contact Us</SafeNavLink>

            <div className="relative hidden md:block" ref={desktopDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setDesktopDropdown((prev) => !prev)
                }}
                className="text-blue-700 hover:text-black font-bold flex items-center gap-1 cursor-pointer"
              >
                Gallery
                <span className={`transition-transform duration-300 ${desktopDropdown ? "rotate-180" : "rotate-0"}`}>▼</span>
              </button>

              <div
                className={`absolute top-6 left-0 pl-5 mt-4 bg-[#f0b000] border-t-2 border-b-2 border-blue-600 shadow-lg rounded py-2 w-40 overflow-hidden transition-all duration-300 ease-in-out ${
                  desktopDropdown
                    ? "opacity-100 max-h-40 translate-y-0"
                    : "opacity-0 max-h-0 -translate-y-2 pointer-events-none"
                }`}
              >
                <SafeNavLink to="/photos" onClick={() => setDesktopDropdown(false)} className={dropdownLinkStyle}>Photos</SafeNavLink>
                <SafeNavLink to="/videos" onClick={() => setDesktopDropdown(false)} className={dropdownLinkStyle}>Videos</SafeNavLink>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-5">
            <button
              onClick={handleSmartBooking}
              className="hidden md:block shesco-btn px-6 py-2 bg-blue-500 text-white border border-blue-500 transition duration-300 hover:bg-transparent hover:text-blue-500 hover:scale-105 cursor-pointer rounded-md font-semibold"
            >
              Book Now
            </button>

            {user ? (
              <div className="relative md:border-l-2 md:border-black/20 md:pl-5 flex items-center" ref={profileRef}>
                
                <button 
                  onClick={() => { setProfileDropdown(!profileDropdown); setPicMenuOpen(false); }}
                  className="focus:outline-none transition-transform hover:scale-105"
                >
                  <img 
                    src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&bold=true`} 
                    alt="Profile" 
                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                  />
                </button>

          <div className={`absolute top-14 right-0 w-80 pb-0 bg-[#1f1f1f] text-gray-200 rounded-[24px] shadow-2xl py-4 z-50 transition-all duration-300 transform origin-top-right border border-gray-700 overflow-hidden ${
            profileDropdown
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
      <button 
        onClick={() => setProfileDropdown(false)} 
        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
      >
        <X size={20} />
      </button>

      <div className="text-center text-xs text-gray-400 mb-4 px-4 pr-10 truncate">
        {user.email || "user@email.com"}
      </div>

      <div className="flex flex-col items-center mb-4 px-4 relative">
      <div className="relative cursor-pointer group" onClick={() => setPicMenuOpen(!picMenuOpen)}>
        <img 
          src={user.profilePic || `https://ui-avatars.com/api/?name=${user.name}&background=0D8ABC&color=fff&bold=true`} 
          alt="Profile" 
          className="w-20 h-20 rounded-full border border-gray-600 mb-2 object-cover group-hover:opacity-80 transition" 
        />
        <div className="absolute bottom-2 right-0 bg-gray-800 p-1.5 rounded-full border border-gray-600">
          <Camera size={14} className="text-white" />
        </div>
      </div>

      {picMenuOpen && (
        <div className="absolute top-20 bg-[#2d2d2d] rounded-xl shadow-xl border border-gray-600 w-52 py-3 z-50">
          <button 
            onClick={(e) => { e.stopPropagation(); setPicMenuOpen(false); }} 
            className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
          
          <input 
            type="file" 
            accept="image/jpeg, image/png, image/webp, image/heic, image/heif" 
            hidden 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
          />
          <input type="file" 
          accept="image/*" 
          capture="user" 
          hidden ref={cameraInputRef} 
          onChange={handleFileUpload} />
          
          <div className="mt-3">
            <button onClick={() => fileInputRef.current.click()} className="w-full text-left px-4 py-2 mt-5 rounded-none hover:bg-gray-700 transition flex items-center gap-3 text-sm">
              <Upload size={16} /> Upload from Device
            </button>
            <button onClick={() => cameraInputRef.current.click()} className="w-full text-left px-4 py-2 rounded-none hover:bg-gray-700 transition flex items-center gap-3 text-sm">
              <Camera size={16} /> Take a Picture
            </button>
          </div>
        </div>
      )}

      <h3 className="text-xl font-medium text-white truncate w-full text-center">
        Hi, {user.name ? user.name.split(' ')[0] : 'There'}!
      </h3>
    </div>

    {/* FIXED: Removed side margins, added full-width hover, and strict borders between every item */}
    <div className="flex flex-col w-full">
      <div className="border-t border-gray-700"></div>

      {otherAccounts.length > 0 && (
        <div className="">
          {otherAccounts.map((acc, index) => (
            <button
              key={index}
              onClick={() => handleSwitchAccount(acc)}
              // Added border-b to every account row to separate them
              className="w-full text-left px-5 py-3 hover:bg-gray-700 rounded-none transition flex items-center gap-3 border-b border-gray-700"
            >
              <img
                src={acc.user.profilePic || `https://ui-avatars.com/api/?name=${acc.user.name}&background=6B7280&color=fff&bold=true`}
                alt={acc.user.name}
                className="w-8 h-8 rounded-full border border-gray-600 object-cover"
              />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-medium text-gray-200 truncate">{acc.user.name}</span>
                <span className="text-xs text-gray-500 truncate">{acc.user.email}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* FIXED: Removed px-2 wrapper, letting the hover fill the whole rectangle */}
      <button 
        onClick={() => {
          navigate("/sign-in");
          setProfileDropdown(false);
        }} 
        className="w-full text-left px-5 py-3.5 hover:bg-gray-700 rounded-none transition flex items-center gap-3 text-sm text-gray-300 font-medium"   >
        <UserPlus size={18} className="text-gray-400" /> Add another account
      </button>

      <div className="border-t border-gray-700"></div>

      <button
        onClick={handleLogoutClick}
        className="w-full text-left px-5 py-3.5 hover:bg-gray-700 rounded-none transition flex items-center gap-3 text-sm text-red-400 hover:text-red-300 font-medium"
      >
        <LogOut size={18} /> Sign out
      </button>
    </div>
  </div>
    </div>
        ) : (
            <button 
              onClick={() => navigate("/sign-in")} 
                className="bg-black text-white px-4 py-2 rounded-lg text-sm font-bold md:bg-transparent md:text-black md:p-0 md:rounded-none md:border-l-2 md:border-black/20 md:pl-5 hover:text-blue-700 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>

          {!user && (
            <div className="bg-blue-200 text-blue-800 text-end pr-3 md:pr-10 text-xs md:text-sm py-1.5 w-full shadow-sm">
              <Link to="/sign-in" className="font-semibold underline hover:text-blue-600 transition">
                Login to have a better experience in booking!
              </Link>
            </div>
          )}
        </header>

        <div
          className={`fixed left-0 right-0 bottom-0 top-[100px] bg-black/40 backdrop-blur-[1.5px] z-40 transition-opacity duration-300 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpen(false)}
        />

        <div
          className={`fixed left-0 top-[87px] h-[calc(100vh-100px)] w-[75%] bg-[#f0b000] z-50 transform transition-transform duration-[800ms] shadow-2xl ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col justify-between h-full px-6 py-6 pb-10 overflow-y-auto">

            <div className="flex flex-col space-y-6 mt-2">
              <SafeNavLink to="/" className={linkStyle} onClick={() => setOpen(false)}>Home</SafeNavLink>
              <SafeNavLink to="/about" className={linkStyle} onClick={() => setOpen(false)}>About</SafeNavLink>
              <SafeNavLink to="/services" className={linkStyle} onClick={() => setOpen(false)}>Services</SafeNavLink>
              <SafeNavLink to="/contact" className={linkStyle} onClick={() => setOpen(false)}>Contact</SafeNavLink>

              <div ref={mobileDropdownRef}>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setMobileDropdown((prev) => !prev)
                  }}
                  className="text-left font-bold text-black hover:text-blue-600 flex items-center gap-1 cursor-pointer"
                >
                  Gallery
                  <span className={`transition-transform duration-300 ${mobileDropdown ? "rotate-180" : "rotate-0"}`}>▼</span>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileDropdown ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="flex flex-col space-y-2 border-t-2 border-b-2 border-black py-2 pl-5">
                    <SafeNavLink to="/photos" onClick={() => { setOpen(false); setMobileDropdown(false); }} className={dropdownLinkStyle}>Photos</SafeNavLink>
                    <SafeNavLink to="/videos" onClick={() => { setOpen(false); setMobileDropdown(false); }} className={dropdownLinkStyle}>Videos</SafeNavLink>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 mt-10">
              <button
                onClick={handleSmartBooking}
                className="shesco-btn w-full mb-10 py-4 bg-blue-500 text-white font-bold text-lg rounded-xl border border-blue-500 hover:bg-transparent hover:text-blue-700 transition duration-300 cursor-pointer shadow-md"
              >
                Book Now
              </button>
            </div>

          </div>
        </div>
      </>
    )
  }

  export default Navbar