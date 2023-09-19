import classes from "./Cars.module.css";
import CarCard from "@/components/shared/CarCard/CarCard";
// import { useGetAllCarsQuery } from "@/app/api/carsApiSplice";
import { ICar } from "@/types/car-interface";

interface IProps {
  cars?: ICar[];
}

const Cars: React.FC<IProps> = ({ cars }) => {
  console.log(cars);

  return (
    <div className={`${classes["cars"]} grid`}>
      {cars ? (
        cars.map((car: any) => <CarCard key={car.id} car={car} />)
      ) : (
        <p>No Cars Found For Your Search.</p>
      )}
    </div>
  );
};

export default Cars;
