import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Adjust path as needed
import { Mail, Lock, User, Phone, MapPin, ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"; // Added Phone and MapPin
import API from "../api"; // Adjust to your axios/fetch instance
import Swal from "sweetalert2";

export default function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state for password toggle
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",     // Added phone
    address: "",   // Added address
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const { data } = await API.post(endpoint, formData);

      // Now extracting phone and address from backend response
      const userData = {
        _id: data._id,
        name: data.name,
        email: data.email,
        phone: data.phone,       // Catching phone
        address: data.address,   // Catching address
        profilePic: data.profilePic || null,
      };

      login(userData, data.token);

      Swal.fire({
        icon: "success",
        title: isLogin ? "Welcome Back!" : "Account Created!",
        text: "Redirecting you to the home page...",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Authentication Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    // Changed to flex-col for mobile, md:flex-row for desktop, and added gap-10
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center md:justify-between md:px-40 px-6 py-24 gap-10">
      
      {/* Header Section - Now outside the card and flexed to the left on desktop */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
          {isLogin ? "Welcome Back" : "Join Us Today"}
        </h2>
        <p className="text-black/70 text-lg">
          {isLogin 
            ? "Sign in to easily manage your hygiene bookings and view your history." 
            : "Create an account for a better, faster, and more personalized experience."}
        </p>
      </div>

      {/* Form Section - Flexed to the right on desktop */}
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Field (Only for Sign Up) */}
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f0b000] focus:outline-none transition"
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f0b000] focus:outline-none transition"
                onChange={handleChange}
              />
            </div>

            {/* NEW: Phone Field (Only for Sign Up) */}
            {!isLogin && (
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required={!isLogin}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f0b000] focus:outline-none transition"
                  onChange={handleChange}
                />
              </div>
            )}

            {/* NEW: Address Field (Only for Sign Up) */}
            {!isLogin && (
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                <input
                  type="text"
                  name="address"
                  placeholder="Residential Address"
                  required={!isLogin}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f0b000] focus:outline-none transition"
                  onChange={handleChange}
                />
              </div>
            )}

            {/* Password Field with Eye Icon */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type={showPassword ? "text" : "password"} // Dynamic type based on state
                name="password"
                placeholder="Password"
                required
                // Added pr-12 so text doesn't type under the eye icon
                className="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#f0b000] focus:outline-none transition"
                onChange={handleChange}
              />
              {/* Toggle Password Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-black transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Forgotten Password Link */}
            {isLogin && (
              <div className="text-right">
                <button 
                  type="button"
                  onClick={() => Swal.fire('Coming Soon', 'Password reset functionality requires backend email setup.', 'info')}
                  className="text-sm text-blue-600 hover:underline font-medium"
                >
                  Forgotten Password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#f0b000] hover:bg-black hover:text-white text-black py-3 font-bold rounded-xl transition duration-300 flex items-center justify-center gap-2 group shadow-md"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Toggle Between Login/Register */}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-blue-600 font-medium hover:underline focus:outline-none"
              >
                {isLogin ? "Create one now" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}