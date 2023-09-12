import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const CheckAuth = () => {
  const userId = useAuth();

  console.log(userId);

  return !!userId ? <Outlet /> : <Navigate to="/auth" />;
};

export default CheckAuth;
