import { createContext, useState, useEffect } from "react";

// To create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // To check for logged in user when the app first loads
   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    // To check if stored user exists
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

  // To login the user and save their data to local storage
  const login = (userData, token) => {
    // To ensure role is always present, and return to user if not provided
    const finalUser = {
      ...userData,
      role: userData.role || "user" 
    };

    localStorage.setItem("user", JSON.stringify(finalUser));
    localStorage.setItem("token", token);
    setUser(finalUser);
    
    // To save accounts history
    const existingAccountsStr = localStorage.getItem("savedAccounts");
    let savedAccounts = existingAccountsStr ? JSON.parse(existingAccountsStr) : [];

    //To remove existing user from the list if they exist, to avoid duplicates
    savedAccounts = savedAccounts.filter(acc => acc.user.email !== userData.email);
    
  // To add them back to the top of the list, so the most recent login is always at the top
    savedAccounts.unshift({ user: userData, token: token });
    
    // To save the updated list back to local storage
    localStorage.setItem("savedAccounts", JSON.stringify(savedAccounts));

    // To update state
    setUser(userData); 
  };

  // To logout the user
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    
    // To redirect to home page after logout
    window.location.href = "/"; 
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};