import { useState } from "react";
import classes from "@/components/layouts/MainNav/MainNav.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import ModalMenu from "@/components/layouts/MainNav/atomic/ModalMenu";
import SmallScreenMenu from "@/components/layouts/MainNav/atomic/SmallScreenMenu";
import BigScreenMenu from "@/components/layouts/MainNav/atomic/BigScreenMenu";
import LogoSection from "@/components/shared/LogoSection/LogoSection";
import UserLink from "@/components/layouts/MainNav/atomic/UserLink";
import Logout from "./atomic/Logout";
import { selectCurrentUser } from "@/app/authSlice";
import { useSelector } from "react-redux";

// Main navigation component
const MainNav = () => {
  const isBigScreen: boolean = useMediaQuery("(min-width: 1060px)");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

  const user = useSelector(selectCurrentUser);

  return (
    <header className={`${classes.header} flex wrapper`}>
      <LogoSection />
      {!isBigScreen && <SmallScreenMenu openToggle={setIsToggleOpen} />}
      {!isBigScreen && isToggleOpen && (
        <ModalMenu closeToggle={setIsToggleOpen} />
      )}
      {isBigScreen && (
        <>
          <BigScreenMenu />
          <div className="flex">
            <UserLink />
            {user && <Logout />}
          </div>
        </>
      )}
    </header>
  );
};

export default MainNav;
