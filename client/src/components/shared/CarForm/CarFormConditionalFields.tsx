import { ICarFormInput } from "@/types/car-form-input-interface";
import { UseFormRegister } from "react-hook-form";

interface ICarFormConditionalFields {
  register: UseFormRegister<ICarFormInput>;
  isCreate: boolean;
  classes: CSSModuleClasses;
}

interface IImageFieldProps extends ICarFormConditionalFields {
  imageThumbnail: string;
  uploadIcon: string;
  setImageThumbnailHandler: (value: any) => void;
}

export const ImageField: React.FC<IImageFieldProps> = ({
  register,
  isCreate,
  imageThumbnail,
  classes,
  uploadIcon,
  setImageThumbnailHandler,
}) => {
  let imageFieldValue;
  if (isCreate) {
    imageFieldValue = (
      <div className={`${classes["image-wrapper"]}`}>
        {imageThumbnail && (
          <img
            className={`${classes["image-thumbnail"]}`}
            src={imageThumbnail}
            alt="car image thumbnail"
          />
        )}
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
            {...register("imageFile", {
              required: "Car image is required",
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                e.target.files &&
                  setImageThumbnailHandler(
                    URL.createObjectURL(e.target.files[0])
                  );
              },
            })}
          />
        </label>
      </div>
    );
  } else {
    imageFieldValue = "";
  }

  return imageFieldValue;
};

export const YearField: React.FC<ICarFormConditionalFields> = ({
  register,
  classes,
  isCreate,
}) => {
  let yearField;

  if (isCreate) {
    yearField = (
      <input
        type="text"
        placeholder="Year"
        {...register("year", {
          required: "Manufacture year is required",
        })}
      />
    );
  } else {
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

  return yearField;
};

export const MileageField: React.FC<ICarFormConditionalFields> = ({
  register,
  classes,
  isCreate,
}) => {
  let mileageField;
  if (isCreate) {
    mileageField = (
      <input
        type="text"
        placeholder="Mileage"
        {...register("mileage", {
          required: "Car milage is required",
        })}
      />
    );
  } else {
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
  }

  return mileageField;
};

export const EngineDispleacementField: React.FC<ICarFormConditionalFields> = ({
  isCreate,
  classes,
  register,
}) => {
  let engineDispleacementField;

  if (isCreate) {
    engineDispleacementField = (
      <input
        {...register("engineDisplacement", {
          required: "Engine displacement is required",
        })}
        type="text"
        placeholder="Engine Displacement"
      />
    );
  } else {
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
  }

  return engineDispleacementField;
};

export const EnginePowerField: React.FC<ICarFormConditionalFields> = ({
  classes,
  register,
  isCreate,
}) => {
  let enginePowerField;

  if (isCreate) {
    enginePowerField = (
      <input
        {...register("enginePower", {
          required: "Engine power is required",
        })}
        type="text"
        placeholder="Engine Power"
      />
    );
  } else {
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
  }

  return enginePowerField;
};

import React from "react";

export const PriceField: React.FC<ICarFormConditionalFields> = ({
  isCreate,
  register,
}) => {
  let priceField;

  if (isCreate) {
    priceField = (
      <input
        type="text"
        placeholder="Price"
        {...register("price", {
          required: "price is required",
        })}
      />
    );
  } else {
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
  }

  return priceField;
};
