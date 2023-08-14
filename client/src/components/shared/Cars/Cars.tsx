import React, { useEffect, useState } from "react";

import classes from "./Cars.module.css";
import CarCard from "../CarCard/CarCard";
import { useGetAllCarsQuery } from "../../../api/carsApiSlice";

const Cars: React.FC = () => {
  //Reafactor to use rtkquery

  const { data, isSuccess } = useGetAllCarsQuery();

  //error logic

  const cars = data || [];

  return (
    <div className={`${classes["cars"]} grid`}>
      {isSuccess ? cars.map((car) => <CarCard key={car.id} car={car} />) : ""}
    </div>
  );
};

export default Cars;
