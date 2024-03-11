import { selectCurrentUser } from "@/app/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Component checks if user is authenticated before rendering protected routes
const CheckAuth = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  // Render the child if user is authenticated. Else, redirect user to the auth page.
  return !!user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default CheckAuth;
