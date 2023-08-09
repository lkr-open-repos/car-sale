import classes from "./Footer.module.css";
import LogoSection from "../../shared/LogoSection/LogoSection";
import NavLinks from "../../shared/NavLinks/NavLinks";
import TopBrands from "./atomic/TopBrands/TopBrands";

const Footer = () => {
  return (
    <footer className={`${classes["footer"]} grid wrapper`}>
      <LogoSection />
      <TopBrands />
      <NavLinks />
    </footer>
  );
};

export default Footer;
