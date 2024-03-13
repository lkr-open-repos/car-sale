import openMenuIcon from "@/assets/icons/openMenuIcon.svg";
import classes from "@/components/layouts/MainNav/atomic/SmallScreenMenu.module.css";

interface IProps {
  openToggle: (isOpen: boolean) => void;
}

const SmallScreenMenu = ({ openToggle }: IProps) => {
  const toggleClickHandler = () => {
    openToggle(true);
  };

  return (
    <div className={classes["small-screen-menu"]}>
      <div>
        <img src={openMenuIcon} alt="Open Menu" onClick={toggleClickHandler} />
      </div>
    </div>
  );
};

export default SmallScreenMenu;
