import classes from "./CreateCar.module.css";
import CarForm from "@/components/shared/CarForm/CarForm";

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
