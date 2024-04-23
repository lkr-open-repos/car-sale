import Cars from "@/components/shared/Cars/Cars";
import classes from "./MyCars.module.css";

interface IProps {
  userId?: string;
}

const MyCars = ({ userId }: IProps) => {
  return (
    <div className={`${classes["cars-container"]} flex`}>
      <Cars carsSearchData={{ user: userId }} />
    </div>
  );
};

export default MyCars;
