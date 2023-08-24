import Cars from "@/components/shared/Cars/Cars";
import QuickSearch from "@/pages/atomic/QuickSearch";
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
        <QuickSearch />
      </section>
      <section className={classes["cars"]}>{<Cars />}</section>
    </>
  );
};

export default Home;
