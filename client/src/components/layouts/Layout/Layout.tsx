import React from "react";
import MainNav from "@/components/layouts/MainNav/MainNav";
import Footer from "@/components/layouts/Footer/Footer";
import classes from "@/components/layouts/Layout/Layout.module.css";

interface IProps {
  children: React.ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <div className={classes.layout}>
      <MainNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
