import { ICar } from "@/types/car-interface";
import classes from "./CarSearchResults.module.css";
import QuickSearch from "@/components/shared/QuickSearch/QuickSearch";
import Cars from "@/components/shared/Cars/Cars";
import { useLocation } from "react-router-dom";

interface IProps {
  carsData?: ICar[];
}

const CarSearchResults: React.FC<IProps> = ({ carsData }) => {
  const { state } = useLocation();

  return (
    <>
      <section className={classes["search"]}>
        <QuickSearch />
      </section>
      <section className={classes["cars"]}>
        {<Cars cars={carsData || state.carsData || []} />}
      </section>
    </>
  );
};

export default CarSearchResults;
