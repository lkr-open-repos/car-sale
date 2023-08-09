import React, { useEffect, useState } from "react";
import classes from "./Cars.module.css";
import CarCard from "../CarCard/CarCard";
import { ICar } from "../../../types/car-interface";
import axios from "axios";

const Cars = () => {
  //Reafactor to use rtkquery

  const [cars, setCars] = useState<ICar[]>([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL!}/cars`
        );
        setCars(response.data.cars);
      } catch (error) {
        console.log("fetching cars failed", error);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className={`${classes["cars"]} grid`}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default Cars;
