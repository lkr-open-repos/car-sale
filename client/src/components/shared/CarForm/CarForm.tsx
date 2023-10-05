import { useForm, SubmitHandler } from "react-hook-form";
import { ReactNode, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { selectCurrentUser } from "@/app/authSlice";
import { useCreateCarMutation } from "@/app/api/carsApiSlice";
import { appendFormDataHelper } from "@/utils/appendFormDataHelper";
import { ICarFormInput } from "@/types/car-form-input-interface";
import { useNavigate } from "react-router-dom";
import {
  MileageField,
  ImageField,
  YearField,
  EngineDispleacementField,
  EnginePowerField,
  PriceField,
} from "./CarFormConditionalFields";

import classes from "./CarForm.module.css";
import BrandSelectOptions from "@/components/shared/CarFormSelectOptions/BrandSelectOptions";
import ColorSelectOptions from "@/components/shared/CarFormSelectOptions/ColorSelectOptions";
import FuelTypeOptions from "@/components/shared/CarFormSelectOptions/FuelTypeOptions";
import BodyTypeOptions from "@/components/shared/CarFormSelectOptions/BodyTypeOptions";
import CurrencyOptions from "@/components/shared/CarFormSelectOptions/CurrencyOptions";
import Button from "@/components/shared/Button/Button";
import uploadIcon from "@/assets/icons/uploadIcon.svg";

interface IProps {
  children?: ReactNode;
  isCreate?: boolean;
}

const CarForm: React.FC<IProps> = ({ isCreate = false, children }) => {
  const [createCar] = useCreateCarMutation();
  const user = useSelector(selectCurrentUser);

  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageThumbnail, setImageThumbnail] = useState("");
  const [queryError, setQueryError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICarFormInput>();

  const onSubmit: SubmitHandler<ICarFormInput> = async (
    data: Partial<ICarFormInput>
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
    } else {
      navigate("/searchresults", {
        replace: true,
        state: { ...data },
      });
    }
    reset();
  };

  const setImageThumbnailHandler = (value: string) => {
    setImageThumbnail(value);
  };

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
        <ImageField
          register={register}
          isCreate={isCreate}
          imageThumbnail={imageThumbnail}
          classes={classes}
          uploadIcon={uploadIcon}
          setImageThumbnailHandler={setImageThumbnailHandler}
        />
        {errors.brand && <p className={`error-text`}>{errors.brand.message}</p>}
        <select
          {...register("brand", {
            validate: {
              require: (value) =>
                !isCreate || value !== "" || "Brand Name Required",
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
                !isCreate ||
                value !== "" ||
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
                    !isCreate ||
                    value !== null ||
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
                    !isCreate ||
                    value !== null ||
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
        <YearField classes={classes} register={register} isCreate={isCreate} />
        {errors.color && <p className={`error-text`}>{errors.color.message}</p>}
        <select
          {...register("color", {
            validate: {
              require: (value) =>
                // @ts-ignore
                !isCreate || value !== "" || "Color Required",
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
                    !isCreate ||
                    value !== null ||
                    "Metallic / Matte color Information Needed",
                },
              })}
              type="radio"
              value="true"
            />
            Metallic
          </label>
          <label>
            <input
              {...register("metallicColor", {
                validate: {
                  require: (value) =>
                    !isCreate ||
                    value !== null ||
                    "Metallic / Matte color Information Needed",
                },
              })}
              type="radio"
              value="false"
            />
            Matte
          </label>
        </div>
        {errors.mileage && (
          <p className={`error-text`}>{errors.mileage.message}</p>
        )}
        <MileageField
          classes={classes}
          register={register}
          isCreate={isCreate}
        />
        {errors.transmissionType && (
          <p className={`error-text`}>{errors.transmissionType.message}</p>
        )}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("transmissionType", {
                validate: {
                  require: (value) =>
                    !isCreate || value !== null || "Transmission Type Needed",
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
                    !isCreate || value !== null || "Transmission Type Needed",
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
                !isCreate || value !== "" || "Fuel Type Required",
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
                !isCreate || value !== "" || "Body Type Required",
            },
          })}
        >
          <BodyTypeOptions />
        </select>
        {errors.engineDisplacement && (
          <p className={`error-text`}>{errors.engineDisplacement.message}</p>
        )}
        <EngineDispleacementField
          classes={classes}
          isCreate={isCreate}
          register={register}
        />
        {errors.enginePower && (
          <p className={`error-text`}>{errors.enginePower.message}</p>
        )}
        <EnginePowerField
          classes={classes}
          register={register}
          isCreate={isCreate}
        />
        {errors.traction && (
          <p className={`error-text`}>{errors.traction.message}</p>
        )}
        <div className={`${classes["radio-wrapper"]} flex`}>
          <label>
            <input
              {...register("traction", {
                validate: {
                  require: (value) =>
                    !isCreate ||
                    value !== null ||
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
                    !isCreate ||
                    value !== null ||
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
                    !isCreate || value !== null || "Seller Information Needed",
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
                    !isCreate || value !== null || "Seller Information Needed",
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
          <PriceField
            classes={classes}
            register={register}
            isCreate={isCreate}
          />
          <select
            {...register("currency", {
              validate: {
                require: (value) =>
                  // @ts-ignore
                  !isCreate || value !== "" || "Currency Required",
              },
            })}
          >
            <CurrencyOptions />
          </select>
        </div>
        {isCreate && (
          <textarea
            cols={30}
            rows={8}
            placeholder="More Details"
            {...register("details")}
          ></textarea>
        )}
        {queryError && <p className={`error-text`}>{queryError}</p>}
        <Button isSubmit={true}>{isCreate ? "SELL" : "SEARCH"}</Button>
      </form>
    </div>
  );
};

export default CarForm;
