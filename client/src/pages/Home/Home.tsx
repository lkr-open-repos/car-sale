import QuickSearch from "../atomic/QuickSearch";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <>
      <section className={classes["search"]}>
        <QuickSearch />
      </section>
      <section className={classes["cars"]}></section>
    </>
  );
};

export default Home;
