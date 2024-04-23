import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "@/app/authSlice";

// Custom hook for handling authentication-related functionality
export const useAuth = () => {
  // Accessing the user data from the Redux store using the 'selectCurrentUser' selector
  const user = useSelector(selectCurrentUser);

  // Returning the user's ID if it exists, otherwise returning null
  return user?.id || null;
};
