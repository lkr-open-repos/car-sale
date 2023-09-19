import { ICar } from "@/types/car-interface";
import classes from "./CarSearchResults.module.css";
import QuickSearch from "@/components/shared/QuickSearch/QuickSearch";
import Cars from "@/components/shared/Cars/Cars";
import { useLocation } from "react-router-dom";
import { useGetCarSearchMutation } from "@/app/api/carsApiSplice";
import { useEffect, useState } from "react";

const CarSearchResults = () => {
  const { state } = useLocation();
  const [someData, setSomeData] = useState<ICar[]>([]);

  const [carSearch] = useGetCarSearchMutation();

  useEffect(() => {
    const searchHelper = async (state) => {
      try {
        const results = await carSearch(state).unwrap();
        setSomeData(results);
      } catch (err) {
        console.log(err);
      }
    };
    searchHelper(state);
  }, [state]);

  console.log(someData);

  return (
    <>
      <section className={classes["search"]}>
        <QuickSearch />
      </section>

      <section className={classes["cars"]}>{<Cars cars={someData} />}</section>
    </>
  );
};

export default CarSearchResults;
