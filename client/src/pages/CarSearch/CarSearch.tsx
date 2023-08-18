import { useForm, SubmitHandler } from "react-hook-form";

import classes from "./CarSearch.module.css";
import { ICar } from "../../types/car-interface";
import BrandSelectOptions from "../atomic/BrandSelectOptions";
import ColorSelectOptions from "../atomic/ColorSelectOptions";

interface IFormInput extends ICar {
  minYear: string;
  maxYear: string;
  minMileage: string;
  maxMileage: string;
}

const CarSearch = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (
    formData: Partial<ICar>
  ) => {
    console.log(formData);
  };

  return (
    <section className={`${classes["car-search-wrapper"]} flex`}>
      <h1>Detailed Search</h1>
      <form
        className={`${classes["car-search_form"]} grid`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <select {...register("brand")}>
          <BrandSelectOptions />
        </select>
        <div className={`${classes["used-radio-wrapper"]} flex`}>
          <label>
            <input {...register("used")} type="radio" value="new" />
            New
          </label>
          <label>
            <input {...register("used")} type="radio" value="used" />
            Used
          </label>
        </div>
        <div>
          <input type="text" placeholder="Min Year" {...register("minYear")} />
          <input type="text" placeholder="Max Year" {...register("maxYear")} />
        </div>
        <select {...register("color")}>
          <ColorSelectOptions />
        </select>
        <div>
          <input
            type="text"
            placeholder="Min mileage"
            {...register("minMileage")}
          />
          <input
            type="text"
            placeholder="Max mileage"
            {...register("maxMileage")}
          />
        </div>
        <div className={`${classes["transmission-type-wrapper"]} flex`}>
          <label>
            <input
              {...register("transmissionType")}
              type="radio"
              value="auto"
            />
            Automatic
          </label>
          <label>
            <input
              {...register("transmissionType")}
              type="radio"
              value="manuel"
            />
            Manuel
          </label>
        </div>
        <input type="submit" value="search" />
      </form>
    </section>
  );
};

export default CarSearch;
