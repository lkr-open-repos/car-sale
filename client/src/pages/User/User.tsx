import classes from "@/pages/User/User.module.css";
import UserMenu from "./Atomic/UserMenu";
import { useState } from "react";
import Cars from "@/components/shared/Cars/Cars";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";

const User = () => {
  const [tab, setTab] = useState("myCars");
  const user = useSelector(selectCurrentUser);

  const setTabHandler = (value: string) => {
    setTab(value);
  };

  return (
    <section className={`${classes["user-wrapper"]} grid`}>
      <UserMenu setTabHandler={setTabHandler} />
      {tab === "myCars" && (
        <div className={`${classes["cars-container"]} flex`}>
          <Cars carsSearchData={{ user: user?.id }} />
        </div>
      )}
    </section>
  );
};

export default User;
