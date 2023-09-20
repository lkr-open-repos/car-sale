import Cars from "@/components/shared/Cars/Cars";
import QuickSearch from "@/components/shared/QuickSearch/QuickSearch";
import classes from "./Home.module.css";

const Home = () => {
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
      <section className={classes["cars"]}>
        {<Cars carsSearchData={{}} />}
      </section>
    </>
  );
};

export default Home;
