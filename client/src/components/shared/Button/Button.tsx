import React from "react";
import classes from "./Button.module.css";

interface IProps {
  children?: string;
  isSubmit?: boolean;
}

const Button: React.FC<IProps> = ({ children, isSubmit }) => {
  return (
    <button
      type={isSubmit ? "submit" : undefined}
      className={classes["button"]}
    >
      {children}
    </button>
  );
};

export default Button;
