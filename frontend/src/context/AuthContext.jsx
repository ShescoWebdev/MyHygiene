import { createContext, useState, useEffect } from "react";

// Create the Context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // THIS IS THE STATE THE NAVBAR IS WATCHING!
  const [user, setUser] = useState(null);

  // Check for logged-in user when the app first loads
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    // Check if storedUser exists AND isn't the string "undefined"
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // THE LOGIN FUNCTION
  const login = (userData, token) => {
    // Save to local storage so they stay logged in if they refresh
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
    // It solves 99% of "it only works the first time" bugs!
    window.location.href = "/"; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};