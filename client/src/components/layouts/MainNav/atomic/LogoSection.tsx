import carIcon from "../../../../assets/icons/carIcon.svg";
import classes from "./LogoSection.module.css";

const LogoSection = () => {
  return (
    <div className={classes["logo-section"]}>
      <div className={classes["logo"]}>
        <img src={carIcon} alt="" />
      </div>
      <div className={classes["logo-text"]}>
        <h2>CAR SALE</h2>
      </div>
    </div>
  );
};

export default LogoSection;
