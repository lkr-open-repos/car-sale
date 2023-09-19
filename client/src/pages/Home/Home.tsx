import Cars from "@/components/shared/Cars/Cars";
import QuickSearch from "@/components/shared/QuickSearch/QuickSearch";
import classes from "./Home.module.css";
import { ICar } from "@/types/car-interface";
import { useGetAllCarsQuery } from "@/app/api/carsApiSplice";

const Home = () => {
  let carsData: ICar[];

  const { data, isSuccess } = useGetAllCarsQuery();

  isSuccess ? (carsData = data) : (carsData = []);

  return (
    <>
      <section className={`${classes["hero"]} flex`}>
        <h1>Buy?</h1>
        <h1>Sell?</h1>
        <h1>Your Journey, Our Expertise!</h1>
      </section>
      <section className={classes["search"]}>
        <h1>Find Your Dream Car</h1>
        <QuickSearch />
      </section>
      <section className={classes["cars"]}>{<Cars cars={carsData} />}</section>
    </>
  );
};

export default Home;
