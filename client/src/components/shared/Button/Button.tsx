import React from "react";
import classes from "./Button.module.css";

interface IProps {
  children?: string;
  isSubmit?: boolean;
  onClick?: () => void;
}

const Button: React.FC<IProps> = ({ children, isSubmit, onClick }) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={classes["button"]}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
