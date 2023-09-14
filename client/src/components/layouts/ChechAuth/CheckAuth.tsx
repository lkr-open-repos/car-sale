import { signOut } from "@/app/authSlice";
import { useAuth } from "@/hooks/useAuth";
import { IUserData } from "@/types/user-data-interface";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const CheckAuth = () => {
  const location = useLocation();
  // refresh redirects to auth. maybe useEffect solves.
  const dispatch = useDispatch();
  let userId;
  let storageUserData = localStorage.getItem("userData");
  if (storageUserData) {
    let userData: IUserData = JSON.parse(storageUserData);
    if (
      userData &&
      userData.tokenExpiration &&
      new Date(userData.tokenExpiration) > new Date()
    ) {
      userId = useAuth();
    } else {
      console.log("checkAuth", "removing localstorage");

      localStorage.removeItem("userData");
      dispatch(signOut());
    }
  }

  return !!userId ? (
    <Outlet />
  ) : (
    <Navigate to="/auth" state={{ from: location }} replace />
  );
};

export default CheckAuth;
