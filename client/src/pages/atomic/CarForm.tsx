import { useForm, SubmitHandler } from "react-hook-form";
import { ReactNode } from "react";

import classes from "./CarForm.module.css";
import { ICar } from "../../types/car-interface";
import BrandSelectOptions from "../atomic/BrandSelectOptions";
import ColorSelectOptions from "../atomic/ColorSelectOptions";
import FuelTypeOptions from "../atomic/FuelTypeOptions";
import BodyTypeOptions from "../atomic/BodyTypeOptions";
import CurrencyOptions from "../atomic/CurrencyOptions";
import Button from "../../components/shared/Button/Button";

interface IFormInput extends ICar {
  minYear: string;
  maxYear: string;
  minMileage: string;
  maxMileage: string;
  minPrice: string;
  maxPrice: string;
  minEngineDisplacement: string;
  maxEngineDisplacement: string;
  minEnginePower: string;
  maxEnginePower: string;
}

interface IProps {
  children: ReactNode;
  isCreate?: boolean;
}

const CarForm: React.FC<IProps> = ({ isCreate, children }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (
    formData: Partial<ICar>
  ) => {
    isCreate
      ? console.log("create", formData)
      : console.log("search", formData);
  };

  return (
    <div className={`${classes["car-form-wrapper"]} flex`}>
      {children}
      <form
        className={`${classes["car-form_form"]} grid`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <select {...register("brand")}>
          <BrandSelectOptions />
        </select>
        <div className={`${classes["radio-wrapper"]} flex`}>
          <span></span>
          <label>
            <input {...register("used")} type="radio" value="new" />
            New
          </label>
          <label>
            <input {...register("used")} type="radio" value="used" />
            Used
          </label>
        </div>
        <div className={`${classes["min-max-wrapper"]} flex`}>
          <input type="text" placeholder="Min Year" {...register("minYear")} />
          <input type="text" placeholder="Max Year" {...register("maxYear")} />
        </div>
        <select {...register("color")}>
          <ColorSelectOptions />
        </select>
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input {...register("metallicColor")} type="radio" value="true" />
            metallic
          </label>
          <label>
            <input {...register("metallicColor")} type="radio" value="false" />
            matte
          </label>
        </div>
        <div className={`${classes["min-max-wrapper"]} flex`}>
          <input
            type="text"
            placeholder="Minimum mileage"
            {...register("minMileage")}
          />
          <input
            type="text"
            placeholder="Maximum mileage"
            {...register("maxMileage")}
          />
        </div>
        <div className={`${classes["radio-wrapper"]} flex`}>
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
        <select {...register("fuelType")}>
          <FuelTypeOptions />
        </select>
        <select {...register("bodyType")}>
          <BodyTypeOptions />
        </select>
        <div className={`${classes["min-max-wrapper"]} flex`}>
          <input
            {...register("minEngineDisplacement")}
            type="text"
            placeholder="Minimum Engine Displacement"
          />
          <input
            {...register("maxEngineDisplacement")}
            type="text"
            placeholder="Maximum Engine Displacement"
          />
        </div>
        <div className={`${classes["min-max-wrapper"]} flex`}>
          <input
            {...register("minEnginePower")}
            type="text"
            placeholder="Minimum Engine Power"
          />
          <input
            {...register("maxEnginePower")}
            type="text"
            placeholder="Maximum Engine Power"
          />
        </div>
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input {...register("traction")} type="radio" value="4x2" />
            4x2
          </label>
          <label>
            <input {...register("traction")} type="radio" value="4x4" />
            4x4
          </label>
        </div>
        <label className={`${classes["checkbox_label"]} flex`}>
          <input {...register("paintChanged")} type="checkbox" />
          No Paint Change
        </label>
        <label className={`${classes["checkbox_label"]} flex`}>
          <input {...register("eligibleForTrade")} type="checkbox" />
          Eligible For Trade{" "}
        </label>
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input {...register("seller")} type="radio" value="OWNER" />
            Owner
          </label>
          <label>
            <input {...register("seller")} type="radio" value="GALLERY" />
            Gallery
          </label>
        </div>
        <div className={`${classes["min-max-wrapper"]} flex`}>
          <input
            type="text"
            placeholder="Minimum Price"
            {...register("minPrice")}
          />
          <input
            type="text"
            placeholder="Maximum Price"
            {...register("maxPrice")}
          />
        </div>
        <select {...register("currency")}>
          <CurrencyOptions />
        </select>
        <Button isSubmit={true}>Search</Button>
      </form>
    </div>
  );
};

export default CarForm;
