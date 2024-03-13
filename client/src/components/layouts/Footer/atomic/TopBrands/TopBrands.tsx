import { useNavigate } from "react-router-dom";
import classes from "./TopBrands.module.css";

const TopBrands = () => {
  const navigate = useNavigate();

  const clickHandler = (brand: string) => {
    navigate("/searchresults", {
      replace: true,
      state: { brand },
    });
  };

  return (
    <ul className={classes["top-brands"]}>
      <li onClick={() => clickHandler("BMW")}>Bmw</li>
      <li onClick={() => clickHandler("Mercedes")}>Mercedes</li>
      <li onClick={() => clickHandler("Audi")}>Audi</li>
      <li onClick={() => clickHandler("Opel")}>Opel</li>
      <li onClick={() => clickHandler("Citroen")}>Citroen</li>
    </ul>
  );
};

export default TopBrands;
