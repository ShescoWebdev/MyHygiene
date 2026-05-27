import { Navigate } from "react-router-dom";

// To protect admin routes
const AdminRoute = ({ children }) => {
  // To check if the user is logged in
  const token = localStorage.getItem("token");
  
  // To check if the user is an admin. 
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  // To check if user is not admin or not logged in, redirect to home page or login page
  if (!token || user?.role !== "admin") {
    // Redirect to home page or login page
    return <Navigate to="/"  replace/>; 
  }

  // If user is admin, render the children components
  return children;
};

export default AdminRoute;