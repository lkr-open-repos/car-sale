import { ICar } from "@/types/car-interface";
import classes from "./CarSearchResults.module.css";

interface IProps {
  cars: ICar[];
}

const CarSearchResults: React.FC<IProps> = (cars) => {
  return <div>CarSearchResults</div>;
};

export default CarSearchResults;
