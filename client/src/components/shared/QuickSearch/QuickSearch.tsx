import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import classes from "./QuickSearch.module.css";
import Button from "@/components/shared/Button/Button";
import { ICar } from "@/types/car-interface";
import BrandSelectOptions from "@/components/shared/CarForm/BrandSelectOptions";

interface IFormInput extends ICar {
  maxYear: string;
  maxPrice: string;
}

const QuickSearch = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data: Partial<ICar>) => {
    navigate("/searchresults", {
      replace: true,
      state: { ...data },
    });
    reset();
  };

  return (
    <div className={`${classes["quick-search-wrapper"]} flex`}>
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
