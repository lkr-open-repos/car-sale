import React, { useEffect } from "react";

import classes from "./Cars.module.css";
import CarCard from "@/components/shared/CarCard/CarCard";
import { useGetAllCarsQuery } from "@/app/api/carsApiSplice";
import { ICar } from "@/types/car-interface";

interface IProps {
  cars?: ICar[];
}

const Cars: React.FC<IProps> = ({ cars }) => {
  const { data, isSuccess } = useGetAllCarsQuery();

  //error logic

  cars = data || [];

  return (
    <div className={`${classes["cars"]} grid`}>
      {isSuccess && cars.map((car: any) => <CarCard key={car.id} car={car} />)}
    </div>
  );
};

export default Cars;
