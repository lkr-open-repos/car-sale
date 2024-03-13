import userIcon from "@/assets/icons/userIcon.svg";
import classes from "@/components/layouts/MainNav/atomic/UserLink.module.css";
import { NavLink } from "react-router-dom";

interface IProps {
  modal?: boolean;
  closeToggle?: () => void;
}

const UserLink = ({ modal, closeToggle }: IProps) => {
  return (
    <div
      className={`${modal && classes["modal"]} ${classes["user-link-icon"]}`}
    >
      <NavLink to="/user" onClick={closeToggle}>
        <img src={userIcon} alt="user details" />
      </NavLink>
    </div>
  );
};

export default UserLink;
