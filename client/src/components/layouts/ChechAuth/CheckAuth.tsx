import { selectCurrentUser, signOut } from "@/app/authSlice";
import { useState } from "react";
// import { useAuth } from "@/hooks/useAuth";
// import { IUserData } from "@/types/user-data-interface";
import { useDispatch, useSelector } from "react-redux";
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
