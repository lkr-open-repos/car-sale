import classes from "@/pages/User/Atomic/UserMenu.module.css";

interface IProps {
  setTabHandler: (value: string) => void;
}
const UserMenu: React.FC<IProps> = ({ setTabHandler }) => {
  return (
    <div className={`${classes["user-menu"]} flex`}>
      <h3 onClick={() => setTabHandler("myMessages")}>My Messages</h3>
      <h3 onClick={() => setTabHandler("myCars")}>My Cars</h3>
      <h3 onClick={() => setTabHandler("myFavorites")}>My Favorite Cars</h3>
    </div>
  );
};

export default UserMenu;
