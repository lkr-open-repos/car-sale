import { selectCurrentUser } from "@/app/authSlice";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const CheckAuth = () => {
  const location = useLocation();
  const user = useSelector(selectCurrentUser);

  return !!user ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default CheckAuth;
