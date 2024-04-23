import classes from "@/components/layouts/MainNav/atomic/Logout.module.css";
import logoutIcon from "@/assets/icons/logoutIcon.svg";
import { useDispatch } from "react-redux";
import { signOut } from "@/app/authSlice";

interface IProps {
  modal?: boolean;
  closeToggle?: () => void;
}

const Logout = ({ modal, closeToggle }: IProps) => {
  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(signOut);
    localStorage.removeItem("userData");
    closeToggle && closeToggle();
    window.location.reload();
  };

  return (
    <div
      className={`${modal && classes["modal"]} ${
        classes["logout-icon-wrapper"]
      }`}
      onClick={clickHandler}
    >
      <img src={logoutIcon} alt="user details" />
    </div>
  );
};

export default Logout;
