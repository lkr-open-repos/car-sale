import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

import classes from "./QuickSearch.module.css";
import Button from "@/components/shared/Button/Button";
import { ICar } from "@/types/car-interface";
import BrandSelectOptions from "@/components/shared/CarForm/BrandSelectOptions";

interface IFormInput extends ICar {
  maxYear: string;
  maxPrice: string;
}
//Dropdown => select !!!!
// brand, model, price, year

const QuickSearch = () => {
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
    <div className={`${classes["quick-search-wrapper"]} flex`}>
      <h1>Find Your Dream Car</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`${classes["quick-search"]} grid`}
      >
        <select {...register("brand")}>
          <BrandSelectOptions />
        </select>
        <input {...register("series")} type="text" placeholder="Series" />
        <input
          type="text"
          placeholder="Maximum Year"
          {...register("maxYear")}
        />
        <input
          type="text"
          placeholder="Maximum Price"
          {...register("maxPrice")}
        />
        <div className={`${classes["search-buttons"]} grid`}>
          <Button isSubmit={true}>Search</Button>
          <Link to="/search">Detailed Search</Link>
        </div>
      </form>
    </div>
  );
};

export default QuickSearch;
