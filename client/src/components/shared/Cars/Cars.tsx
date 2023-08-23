import React, { useEffect } from "react";

import classes from "./Cars.module.css";
import CarCard from "../CarCard/CarCard";
import { useGetAllCarsQuery } from "../../../app/api/carsApiSplice";
import { ICar } from "../../../types/car-interface";

const Cars: React.FC = () => {
  const { data, isSuccess } = useGetAllCarsQuery();

  //error logic

  const cars = data || [];

  useEffect(() => {
    console.log(cars);
  }, [cars]);

  return (
    <div className={`${classes["cars"]} grid`}>
      {isSuccess
        ? cars.map((car: any) => <CarCard key={car.id} car={car} />)
        : ""}
    </div>
  );
};

export default Cars;
