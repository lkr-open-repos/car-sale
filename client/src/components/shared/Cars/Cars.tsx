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
  const [carsData, setCarsData] = useState<{
    cars: ICar[];
    totalPages: number;
  }>({ cars: [], totalPages: 0 });

  const [currentPage, setCurrentPage] = useState(1);

  const [carSearch] = useGetCarSearchMutation();

  const dataHelper = async (carsSearchData: Partial<ICarFormInput>) => {
    try {
      setCarsData(
        await carSearch({ searchData: carsSearchData, currentPage }).unwrap()
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    dataHelper(carsSearchData);
  }, [carsSearchData, currentPage]);

  const pageButtons = [];

  if (carsData.totalPages > 1) {
    pageButtons.push(
      <button
        disabled={currentPage === 1}
        onClick={() => {
          setCurrentPage((prevState) => prevState - 1);
        }}
      >
        Prev
      </button>
    );
    for (let i = 0; i < carsData.totalPages; i++) {
      pageButtons.push(
        <button
          disabled={currentPage === i + 1}
          onClick={() => {
            setCurrentPage(i + 1);
          }}
        >
          {i + 1}
        </button>
      );
    }
    pageButtons.push(
      <button
        disabled={currentPage === carsData.totalPages}
        onClick={() => {
          setCurrentPage((prevState) => prevState + 1);
        }}
      >
        Next
      </button>
    );
  }

  return (
    <>
      <div className={`${classes["cars-wrapper"]} grid`}>
        {carsData.cars && carsData.cars.length > 0 ? (
          carsData.cars.map((car: any) => <CarCard key={car.id} car={car} />)
        ) : (
          <h2>No Cars Found For Your Search.</h2>
        )}
      </div>
      <div className={`${classes["pagination-wrapper"]} flex`}>
        {carsData.totalPages > 1 && pageButtons.map((button) => button)}
      </div>
    </>
  );
};

export default Cars;
