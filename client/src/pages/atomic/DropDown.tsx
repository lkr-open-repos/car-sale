import React from "react";
import classes from "./DropDown.module.css";

interface IProps {
  valuePairs: { value: string; text: string }[];
}

const DropDown: React.FC<IProps> = ({ valuePairs }) => {
  return (
    <select className={classes["select-menu"]}>
      {valuePairs.map((valuePair) => (
        <option key={valuePair.value} value={valuePair.value}>
          {valuePair.text}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
