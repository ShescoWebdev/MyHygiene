import { Navigate } from "react-router-dom";

// This component acts as a security checkpoint
const AdminRoute = ({ children }) => {
  // Check if the user is logged in (do we have a token?)
  const token = localStorage.getItem("token");
  
  // Check if the user is actually an admin. 
  // (Assuming you save user details in localStorage too)
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // If there's no token, OR the user's role isn't 'admin', kick them to the home page!
  if (!token || user?.role !== "admin") {
    // You can redirect to "/login" or "/"
    return <Navigate to="/" replace />; 
  }

  // If they pass the checks, render the page!
  return children;
};

export default AdminRoute;