import Cars from "@/components/shared/Cars/Cars";
import QuickSearch from "@/components/shared/QuickSearch/QuickSearch";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className={`${classes["hero"]} flex`}>
        <h1 className={classes["fade-fast"]}>Buy?</h1>
        <h1>Sell?</h1>
        <h1 className={classes["fade-slow"]}>Your Journey, Our Expertise!</h1>
      </section>
      {/* Search Section */}
      <section className={classes["search"]}>
        <h1>Find Your Dream Car</h1>
        <QuickSearch />
      </section>
      {/* Cars Section */}
      <section className={classes["cars"]}>
        {/* Using empty object as search data to get all cars */}
        {<Cars carsSearchData={{}} />}
      </section>
    </>
  );
};

export default Home;
