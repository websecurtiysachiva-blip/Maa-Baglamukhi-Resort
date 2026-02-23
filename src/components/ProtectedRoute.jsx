import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // No token = not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Role check (if provided)
  if (allowedRole && !allowedRole.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

