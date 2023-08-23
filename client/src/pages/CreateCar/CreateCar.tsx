import classes from "./CreateCar.module.css";
import CarForm from "../atomic/CarForm";

const CreateCar = () => {
  return (
    <section className={`${classes["create-car-wrapper"]}`}>
      <CarForm isCreate={true}>
        <h1>About Your Car</h1>
      </CarForm>
    </section>
  );
};

export default CreateCar;
