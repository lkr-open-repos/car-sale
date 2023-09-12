import { useForm, SubmitHandler } from "react-hook-form";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "@/app/authSlice";

import classes from "./CarForm.module.css";
import { ICar } from "@/types/car-interface";
import BrandSelectOptions from "./BrandSelectOptions";
import ColorSelectOptions from "./ColorSelectOptions";
import FuelTypeOptions from "./FuelTypeOptions";
import BodyTypeOptions from "@/components/shared/CarForm/BodyTypeOptions";
import CurrencyOptions from "./CurrencyOptions";
import Button from "@/components/shared/Button/Button";
import uploadIcon from "@/assets/icons/uploadIcon.svg";
import { useCreateCarMutation } from "@/app/api/carsApiSplice";
import { appendFormDataHelper } from "@/utils/appendFormDataHelper";

export interface IFormInput extends ICar {
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
  imageFile: FileList;
}

interface IProps {
  children?: ReactNode;
  isCreate?: boolean;
}

const CarForm: React.FC<IProps> = ({ isCreate, children }) => {
  const [createCar, { error }] = useCreateCarMutation();
  const user = useSelector(selectCurrentUser);

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (
    data: Partial<IFormInput>
  ) => {
    if (isCreate) {
      if (data.imageFile) {
        setImageFile(data.imageFile[0]);
      }
      const formData = appendFormDataHelper(data, user, imageFile);
      await createCar(formData).unwrap();
    }
  };

  let imageField;
  let yearField;
  let mileageField;
  let engineDispleacementField;
  let enginePowerField;
  let priceField;
  let detailsField;

  if (isCreate) {
    detailsField = (
      <textarea cols={30} rows={8} {...register("details")}></textarea>
    );
    imageField = (
      <div className={`${classes["image-wrapper"]}`}>
        <label
          className={`${classes["upload-image-label"]} flex`}
          htmlFor="upload"
        >
          <img src={uploadIcon} alt="" />
          Upload Car Image
          <input
            type="file"
            id="upload"
            className={classes["upload-image"]}
            accept="image/*"
            {...register("imageFile")}
          />
        </label>
      </div>
    );
    yearField = <input type="text" placeholder="Year" {...register("year")} />;
    mileageField = (
      <input type="text" placeholder="Mileage" {...register("mileage")} />
    );
    engineDispleacementField = (
      <input
        {...register("engineDisplacement")}
        type="text"
        placeholder="Engine Displacement"
      />
    );
    enginePowerField = (
      <input
        {...register("enginePower")}
        type="text"
        placeholder="Engine Power"
      />
    );
    priceField = (
      <input type="text" placeholder="Price" {...register("price")} />
    );
  } else {
    imageField = "";
    priceField = (
      <>
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
      </>
    );
    enginePowerField = (
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
    );
    engineDispleacementField = (
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
    );
    mileageField = (
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
    );
    yearField = (
      <div className={`${classes["min-max-wrapper"]} flex`}>
        <input
          type="text"
          placeholder="Minimum Year"
          {...register("minYear")}
        />
        <input
          type="text"
          placeholder="Maximum Year"
          {...register("maxYear")}
        />
      </div>
    );
  }

  return (
    <div className={`${classes["car-form-wrapper"]} flex`}>
      {children || ""}
      <form
        className={`${classes["car-form_form"]} grid`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {imageField}
        <select {...register("brand")}>
          <BrandSelectOptions />
        </select>
        <input {...register("series")} type="text" placeholder="Series" />
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input {...register("used")} type="radio" value="false" />
            New
          </label>
          <label>
            <input {...register("used")} type="radio" value="true" />
            Used
          </label>
        </div>
        {yearField}
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
        {mileageField}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("transmissionType")}
              type="radio"
              value="AUTOMATIC"
            />
            Automatic
          </label>
          <label>
            <input
              {...register("transmissionType")}
              type="radio"
              value="MANUAL"
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
        {engineDispleacementField}
        {enginePowerField}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input {...register("traction")} type="radio" value="2x4" />
            2x4
          </label>
          <label>
            <input {...register("traction")} type="radio" value="4x4" />
            4x4
          </label>
        </div>
        <label className={`${classes["checkbox_label"]} flex`}>
          <input {...register("paintChanged")} type="checkbox" />
          Paint Change
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
          {priceField}
          <select {...register("currency")}>
            <CurrencyOptions />
          </select>
        </div>
        {detailsField}
        <Button isSubmit={true}>{isCreate ? "SELL" : "SEARCH"}</Button>
      </form>
    </div>
  );
};

export default CarForm;
