import React from "react";
import classes from "./Button.module.css";

interface IProps {
  children?: string;
  isSubmit?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<IProps> = ({
  children,
  isSubmit,
  onClick,
  disabled,
}) => {
  return (
    <button
      type={isSubmit ? "submit" : "button"}
      className={classes["button"]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
