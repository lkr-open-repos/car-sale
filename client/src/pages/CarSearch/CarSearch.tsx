import CarForm from "@/components/shared/CarForm/CarForm";
import classes from "./CarSearch.module.css";

const CarSearch = () => {
  return (
    <section className={`${classes["car-search-wrapper"]} flex`}>
      <CarForm>
        <h1>Detailed Search</h1>
      </CarForm>
    </section>
  );
};

export default CarSearch;
