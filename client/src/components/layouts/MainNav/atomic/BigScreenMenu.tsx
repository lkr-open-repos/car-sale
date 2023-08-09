import NavLinks from "../../../shared/NavLinks/NavLinks";
import classes from "./BigScreenMenu.module.css";

const BigScreenMenu = () => {
  return (
    <nav className={classes["big-screen-menu"]}>
      <NavLinks />
    </nav>
  );
};

export default BigScreenMenu;
