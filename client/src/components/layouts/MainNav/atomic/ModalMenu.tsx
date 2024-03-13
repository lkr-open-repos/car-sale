import classes from "@/components/layouts/MainNav/atomic/ModalMenu.module.css";
import closeIcon from "@/assets/icons/closeMenuIcon.svg";
import NavLinks from "@/components/shared/NavLinks/NavLinks";
import UserLink from "@/components/layouts/MainNav/atomic/UserLink";
import Logout from "./Logout";
import { selectCurrentUser } from "@/app/authSlice";
import { useSelector } from "react-redux";

interface IProps {
  closeToggle: (isOpen: boolean) => void;
}

const ModalMenu = ({ closeToggle }: IProps) => {
  const user = useSelector(selectCurrentUser);

  const closeToggleHandler = () => {
    closeToggle(false);
  };

  return (
    <div>
      <>
        <div className={classes["backdrop"]} onClick={closeToggleHandler}></div>
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
          <div>
            <UserLink closeToggle={closeToggleHandler} modal={true} />
            {user && <Logout closeToggle={closeToggleHandler} modal={true} />}
          </div>
        </div>
      </>
    </div>
  );
};

export default ModalMenu;
