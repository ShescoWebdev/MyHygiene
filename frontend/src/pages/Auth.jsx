import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import PageWrapper from "../components/PageWrapper";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();

  // Grab the login function from our global brain (AuthContext)
  const { login } = useContext(AuthContext); 

  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect") || "/booking";

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "", 
  });

  // Auto-fill email if we remember this user from a past session!
  useEffect(() => {
    const savedUserStr = localStorage.getItem("user");
    
    // Only parse if it exists AND is not the literal string "undefined"
    if (savedUserStr && savedUserStr !== "undefined") {
      try {
        const savedUser = JSON.parse(savedUserStr);
        if (savedUser && savedUser.email) {
          setForm(prev => ({ ...prev, email: savedUser.email }));
        }
      } catch (error) {
        console.error("Failed to parse user data in Auth.jsx:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccessMsg(""); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLogin && form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // --- LOGIN FLOW ---
        const { data } = await API.post("/auth/login", {
          email: form.email,
          password: form.password,
        });

        // console.log("LOGIN RESPONSE FROM BACKEND:", data);
        // console.log("FRESH LOGIN DATA:", user);

        // 1. Package the flat data into a clean user object (now including phone and address)
        const loggedInUser = {
          _id: data._id,
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          profilePic: data.profilePic || null,
          role: data.role || "user"
        };

        // 2. Pass the packaged user AND the token to the context
        login(loggedInUser, data.token);

        // 3. Navigate to booking
        navigate(redirectUrl);
      } else {
        // --- REGISTER FLOW ---
        const { data } = await API.post("/auth/register", {
          name: form.name,
          email: form.email,
          phone: form.phone,      
          address: form.address,
          password: form.password,
        });

        // If backend auto-logs them in upon registration and sends a token back:
        if (data.token) {
           const userData = data.user || { 
             _id: data._id, 
             name: form.name, 
             email: form.email, 
             phone: form.phone, 
             address: form.address,
             profilePic: data.profilePic || null,
             role: data.role || "user"
           };
           
           // Use the context login function here too
           login(userData, data.token);
           
           navigate(redirectUrl); 
           return; // Stop here, they are going to the booking page
        }

        // Otherwise, switch to login mode and keep the email filled
        setIsLogin(true);
        setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
        setSuccessMsg("Account created! Please log in with your password.");
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.response?.data || "An error occurred.";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccessMsg("");
  };

  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 md:mt-[-5vh] md:pt-10 pt-5">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg space-y-8 transition-all duration-300">
        
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Log in to manage your bookings." : "Join us to save your details for faster booking."}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          {successMsg && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="text-sm text-green-700">{successMsg}</p>
            </div>
          )}

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={form.name}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="John Doe"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  name="phone"
                  type="text"
                  required={!isLogin}
                  value={form.phone}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="+234 814..."
                />
              </div>
            )}

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
                <input
                  name="address"
                  type="text"
                  required={!isLogin}
                  value={form.address}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="Your full address..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {isLogin ? "Password" : "Create Password"}
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                >
                  {showPassword ? "👁️‍🗨️" : "👁️"} 
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required={!isLogin}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  >
                   {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-900 bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? "Processing..." : (isLogin ? "Log In" : "Sign Up")}
            </button>
          </div>
        </form>

        <div className="text-center mt-4 text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={toggleMode}
            className="font-medium text-yellow-700 hover:text-yellow-600"
          >
            {isLogin ? "Sign up here." : "Log in."}
          </button>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}