import { useGetCarSearchMutation } from "@/app/api/carsApiSplice";
import classes from "./Cars.module.css";
import { ICarFormInput } from "@/types/car-form-input-interface";
import { ICar } from "@/types/car-interface";
import { useEffect, useState } from "react";
import CarCard from "../CarCard/CarCard";

interface IProps {
  carsSearchData: Partial<ICarFormInput>;
}

const Cars: React.FC<IProps> = ({ carsSearchData }) => {
  const [carsData, setCarsData] = useState<ICar[]>([]);

  const [carSearch] = useGetCarSearchMutation();

  const dataHelper = async (carsSearchData: Partial<ICarFormInput>) => {
    try {
      setCarsData(await carSearch(carsSearchData).unwrap());
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataHelper(carsSearchData);
  }, [carsSearchData]);

  return (
    <div className={`${classes["cars"]} grid`}>
      {carsData ? (
        carsData.map((car: any) => <CarCard key={car.id} car={car} />)
      ) : (
        <p>No Cars Found For Your Search.</p>
      )}
    </div>
  );
};

export default Cars;
