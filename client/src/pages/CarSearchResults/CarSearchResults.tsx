import classes from "./CarSearchResults.module.css";
import QuickSearch from "@/components/shared/QuickSearch/QuickSearch";
import Cars from "@/components/shared/Cars/Cars";
import { useLocation } from "react-router-dom";

const CarSearchResults = () => {
  const { state } = useLocation();

  return (
    <>
      <section className={classes["search"]}>
        <QuickSearch />
      </section>
      <section className={classes["cars"]}>
        {<Cars carsSearchData={state} />}
      </section>
    </>
  );
};

export default CarSearchResults;
