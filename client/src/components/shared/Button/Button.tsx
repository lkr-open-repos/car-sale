import classes from "./Button.module.css";

interface IProps {
  children?: string;
  isSubmit?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

// Custom button component
const Button = ({ children, isSubmit, onClick, disabled }: IProps) => {
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
