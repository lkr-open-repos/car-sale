import classes from "@/components/layouts/Footer/Footer.module.css";
import LogoSection from "@/components/shared/LogoSection/LogoSection";
import NavLinks from "@/components/shared/NavLinks/NavLinks";
import TopBrands from "@/components/layouts/Footer/atomic/TopBrands/TopBrands";

// Footer section component with logo, nav links and top brands areas
const Footer = () => {
  return (
    <footer className={`${classes["footer"]} grid wrapper`}>
      <LogoSection isFooter={true} />
      <NavLinks />
      <TopBrands />
    </footer>
  );
};

export default Footer;
