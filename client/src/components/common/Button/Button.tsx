import React from "react";
import classes from "./Button.module.css";

interface IProps {
  children: string;
}

const Button: React.FC<IProps> = ({ children }) => {
  return <button className={classes["button"]}>{children}</button>;
};

export default Button;
