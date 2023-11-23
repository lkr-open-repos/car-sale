import Cars from "@/components/shared/Cars/Cars";
import classes from "./MyCars.module.css";
import React from "react";

interface IProps {
  userId?: string;
}

const MyCars: React.FC<IProps> = ({ userId }) => {
  return (
    <div className={`${classes["cars-container"]} flex`}>
      <Cars carsSearchData={{ user: userId }} />
    </div>
  );
};

export default MyCars;
