import classes from "@/pages/User/User.module.css";
import UserMenu from "./Atomic/UserMenu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import MyFavorites from "./Atomic/MyFavorites/MyFavorites";
import MyCars from "./Atomic/MyCars/MyCars";
import MyMessages from "./Atomic/MyMessages/MyMessages";
import { useLocation } from "react-router-dom";

// Functional component for the user profile page
const User = () => {
  const [tab, setTab] = useState("myMessages");
  const user = useSelector(selectCurrentUser);
  // Getting current location from React Router
  const location = useLocation();
  // Extracting conversation data from location state
  const conversationData = location.state?.conversation || null;

  const setTabHandler = (value: string) => {
    setTab(value);
  };

  return (
    <section className={`${classes["user-wrapper"]} flex`}>
      <UserMenu setTabHandler={setTabHandler} />
      {tab === "myCars" && <MyCars userId={user?.id} />}
      {tab === "myFavorites" && <MyFavorites />}
      {tab === "myMessages" && (
        <MyMessages conversationId={conversationData?.id} />
      )}
    </section>
  );
};

export default User;
