import React from "react";
import userIcon from "../../../../assets/icons/userIcon.svg";
import classes from "./UserLink.module.css";

interface IProps {
  modal?: boolean;
}

const UserLink: React.FC<IProps> = ({ modal }) => {
  return (
    <div
      className={
        modal
          ? `${classes["modal"]} ${classes["user-link-icon"]}`
          : classes["user-link-icon"]
      }
    >
      <img src={userIcon} alt="user details" />
    </div>
  );
};

export default UserLink;
