import { createContext, useState, useEffect } from "react";

// Create the Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for logged in user when the app first loads
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    // Check if stored user exists AND the string is not "undefined"
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // THE LOGIN FUNCTION
  const login = (userData, token) => {
    // Save to local storage so users stay logged in if they refresh
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    
    
    // Updates the Navbar with the new user data to show the avatar and hide the login banner
    setUser(userData); 
  };

  // THE LOGOUT FUNCTION
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // This forces the app to wipe its memory and go to the home page.
    window.location.href = "/"; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};