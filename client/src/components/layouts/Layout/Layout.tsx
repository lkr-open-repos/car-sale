import React from "react";
import MainNav from "../MainNav/MainNav";
import Footer from "../Footer/Footer";
import classes from "./Layout.module.css";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <MainNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
