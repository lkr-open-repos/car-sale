import NavLinks from "@/components/shared/NavLinks/NavLinks";
import classes from "@/components/layouts/MainNav/atomic/BigScreenMenu.module.css";

const BigScreenMenu = () => {
  return (
    <nav className={classes["big-screen-menu"]}>
      <NavLinks />
    </nav>
  );
};

export default BigScreenMenu;
