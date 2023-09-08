import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "@/app/authSlice";

export const useAuth = () => {
  const user = useSelector(selectCurrentUser);

  return user?.id || null;
};
