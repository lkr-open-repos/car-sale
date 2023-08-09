import React, { useState } from "react";
import classes from "./MainNav.module.css";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import ModalMenu from "./atomic/ModalMenu";
import SmallScreenMenu from "./atomic/SmallScreenMenu";
import BigScreenMenu from "./atomic/BigScreenMenu";
import LogoSection from "../../shared/LogoSection/LogoSection";
import UserLink from "./atomic/UserLink";

const MainNav = () => {
  const isBigScreen: boolean = useMediaQuery("(min-width: 1060px)");
  const [isToggleOpen, setIsToggleOpen] = useState<boolean>(false);

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
          <UserLink />
        </>
      )}
    </header>
  );
};

export default MainNav;
