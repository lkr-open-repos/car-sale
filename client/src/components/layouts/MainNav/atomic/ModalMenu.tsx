import React from "react";
import classes from "@/components/layouts/MainNav/atomic/ModalMenu.module.css";
import closeIcon from "@/assets/icons/closeMenuIcon.svg";
import NavLinks from "@/components/shared/NavLinks/NavLinks";
import UserLink from "@/components/layouts/MainNav/atomic/UserLink";

interface IProps {
  closeToggle: (isOpen: boolean) => void;
}

const ModalMenu: React.FC<IProps> = ({ closeToggle }) => {
  const closeToggleHandler = () => {
    closeToggle(false);
  };

  return (
    <div>
      <>
        <div className={classes["backdrop"]}></div>
        <div className={classes["modal-menu_nav"]}>
          <div className={classes["close-modal-menu"]}>
            <img
              src={closeIcon}
              alt="Toggle menu close icon"
              onClick={closeToggleHandler}
            />
          </div>
          <nav className={classes["modal-menu_navigation_links"]}>
            <NavLinks closeToggle={closeToggleHandler} />
          </nav>
          <UserLink modal={true} />
        </div>
      </>
    </div>
  );
};

export default ModalMenu;
