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
  const [queryError, setQueryError] = useState<string>("");

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
      await createCar(formData)
        .unwrap()
        .catch((error) => {
          setQueryError(error.data.message);
        });
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
            {...register("imageFile", {
              required: "Car image is required",
            })}
          />
        </label>
      </div>
    );
    yearField = (
      <input
        type="text"
        placeholder="Year"
        {...register("year", {
          required: "Manufacture year is required",
        })}
      />
    );
    mileageField = (
      <input
        type="text"
        placeholder="Mileage"
        {...register("mileage", {
          required: "Car milage is required",
        })}
      />
    );
    engineDispleacementField = (
      <input
        {...register("engineDisplacement", {
          required: "Engine displacement is required",
        })}
        type="text"
        placeholder="Engine Displacement"
      />
    );
    enginePowerField = (
      <input
        {...register("enginePower", {
          required: "Engine power is required",
        })}
        type="text"
        placeholder="Engine Power"
      />
    );
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
        {errors.imageFile && (
          <p className={`error-text`}>{errors.imageFile.message}</p>
        )}
        {imageField}
        {errors.brand && <p className={`error-text`}>{errors.brand.message}</p>}
        <select
          {...register("brand", {
            validate: {
              require: (value) =>
                (isCreate && value !== "") || "Brand Name Required",
            },
          })}
        >
          <BrandSelectOptions />
        </select>
        {errors.series && (
          <p className={`error-text`}>{errors.series.message}</p>
        )}
        <input
          {...register("series", {
            validate: {
              require: (value) =>
                (isCreate && value !== "") ||
                "Car Series Required (ex. Corolla, Polo)",
            },
          })}
          type="text"
          placeholder="Series (Corolla, Polo etc.)"
        />
        {errors.used && <p className={`error-text`}>{errors.used.message}</p>}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("used", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) ||
                    "Used / New Car Information Needed",
                },
              })}
              type="radio"
              value="false"
            />
            New
          </label>
          <label>
            <input
              {...register("used", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) ||
                    "Used / New Car Information Needed",
                },
              })}
              type="radio"
              value="true"
            />
            Used
          </label>
        </div>
        {errors.year && <p className={`error-text`}>{errors.year.message}</p>}
        {yearField}
        {errors.color && <p className={`error-text`}>{errors.color.message}</p>}
        <select
          {...register("color", {
            validate: {
              require: (value) =>
                // @ts-ignore
                (isCreate && value !== "") || "Color Required",
            },
          })}
        >
          <ColorSelectOptions />
        </select>
        {errors.metallicColor && (
          <p className={`error-text`}>{errors.metallicColor.message}</p>
        )}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("metallicColor", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) ||
                    "Metallic / Matte color Information Needed",
                },
              })}
              type="radio"
              value="true"
            />
            metallic
          </label>
          <label>
            <input
              {...register("metallicColor", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) ||
                    "Metallic / Matte color Information Needed",
                },
              })}
              type="radio"
              value="false"
            />
            matte
          </label>
        </div>
        {errors.mileage && (
          <p className={`error-text`}>{errors.mileage.message}</p>
        )}
        {mileageField}
        {errors.transmissionType && (
          <p className={`error-text`}>{errors.transmissionType.message}</p>
        )}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("transmissionType", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) || "Transmission Type Needed",
                },
              })}
              type="radio"
              value="AUTOMATIC"
            />
            Automatic
          </label>
          <label>
            <input
              {...register("transmissionType", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) || "Transmission Type Needed",
                },
              })}
              type="radio"
              value="MANUAL"
            />
            Manuel
          </label>
        </div>
        {errors.fuelType && (
          <p className={`error-text`}>{errors.fuelType.message}</p>
        )}
        <select
          {...register("fuelType", {
            validate: {
              require: (value) =>
                // @ts-ignore
                (isCreate && value !== "") || "Fuel Type Required",
            },
          })}
        >
          <FuelTypeOptions />
        </select>
        {errors.bodyType && (
          <p className={`error-text`}>{errors.bodyType.message}</p>
        )}
        <select
          {...register("bodyType", {
            validate: {
              require: (value) =>
                // @ts-ignore
                (isCreate && value !== "") || "Body Type Required",
            },
          })}
        >
          <BodyTypeOptions />
        </select>
        {errors.engineDisplacement && (
          <p className={`error-text`}>{errors.engineDisplacement.message}</p>
        )}
        {engineDispleacementField}
        {errors.enginePower && (
          <p className={`error-text`}>{errors.enginePower.message}</p>
        )}
        {enginePowerField}
        {errors.traction && (
          <p className={`error-text`}>{errors.traction.message}</p>
        )}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("traction", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) ||
                    "Traction Information Needed",
                },
              })}
              type="radio"
              value="2x4"
            />
            2x4
          </label>
          <label>
            <input
              {...register("traction", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) ||
                    "Traction Information Needed",
                },
              })}
              type="radio"
              value="4x4"
            />
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
        {errors.seller && (
          <p className={`error-text`}>{errors.seller.message}</p>
        )}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("seller", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) || "Seller Information Needed",
                },
              })}
              type="radio"
              value="OWNER"
            />
            Owner
          </label>
          <label>
            <input
              {...register("seller", {
                validate: {
                  require: (value) =>
                    (isCreate && value !== null) || "Seller Information Needed",
                },
              })}
              type="radio"
              value="GALLERY"
            />
            Gallery
          </label>
        </div>
        {errors.price && <p className={`error-text`}>{errors.price.message}</p>}
        {errors.currency && (
          <p className={`error-text`}>{errors.currency.message}</p>
        )}
        <div className={`${classes["min-max-wrapper"]} flex`}>
          {priceField}
          <select
            {...register("currency", {
              validate: {
                require: (value) =>
                  // @ts-ignore
                  (isCreate && value !== "") || "Currency Required",
              },
            })}
          >
            <CurrencyOptions />
          </select>
        </div>
        {detailsField}
        {queryError && <p className={`error-text`}>{queryError}</p>}
        <Button isSubmit={true}>{isCreate ? "SELL" : "SEARCH"}</Button>
      </form>
    </div>
  );
};

export default CarForm;
