import { Link } from "react-router-dom";
import carIcon from "@/assets/icons/carIcon.svg";
import carIconFooter from "@/assets/icons/carIconFooter.svg";
import classes from "./LogoSection.module.css";

interface IProps {
  isFooter?: boolean;
}

const LogoSection = ({ isFooter }: IProps) => {
  return (
    <Link to="/">
      <div className={classes["logo-section"]}>
        <div className={classes["logo"]}>
          <img src={isFooter ? carIconFooter : carIcon} alt="logo icon" />
        </div>
        <div className={classes["logo-text"]}>
          <h2>CAR SALE</h2>
        </div>
      </div>
    </Link>
  );
};

export default LogoSection;
