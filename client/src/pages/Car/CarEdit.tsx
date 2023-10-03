import { ICar } from "@/types/car-interface";
import React, { useEffect, useState } from "react";
import { ICarFormInput } from "@/types/car-form-input-interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { appendFormDataHelper } from "@/utils/appendFormDataHelper";
import { useUpdateCarMutation } from "@/app/api/carsApiSlice";
import { useParams } from "react-router-dom";
import Button from "@/components/shared/Button/Button";

import classes from "./CarEdit.module.css";
import BrandSelectOptions from "@/components/shared/CarFormSelectOptions/BrandSelectOptions";
import BodyTypeOptions from "@/components/shared/CarFormSelectOptions/BodyTypeOptions";
import CurrencyOptions from "@/components/shared/CarFormSelectOptions/CurrencyOptions";
import ColorSelectOptions from "@/components/shared/CarFormSelectOptions/ColorSelectOptions";
import FuelTypeOptions from "@/components/shared/CarFormSelectOptions/FuelTypeOptions";

interface IProps {
  car: ICar;
  setEditMode: (value: boolean) => void;
  user: {
    id: string;
    email: string;
  };
}

const CarEdit: React.FC<IProps> = ({ car, setEditMode, user }) => {
  const [updateCar] = useUpdateCarMutation();
  const [queryErrors, setQueryErrors] = useState(null);

  const { cid } = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ICarFormInput>();

  useEffect(() => {
    if (car) {
      setValue("used", car.used);
      setValue("traction", car.traction);
      setValue("metallicColor", car.metallicColor);
      setValue("transmissionType", car.transmissionType);
      setValue("seller", car.seller);
      setValue("paintChanged", car.paintChanged);
      setValue("eligibleForTrade", car.eligibleForTrade);
      setValue("details", car.details);
    }
  }, [car]);

  const onSubmit: SubmitHandler<ICarFormInput> = async (
    data: Partial<ICarFormInput>
  ) => {
    const formData = appendFormDataHelper(data, user);

    console.log(formData.get("series"));

    if (cid) {
      let response = await updateCar({ updateData: formData, cid })
        .unwrap()
        .catch((error) => {
          console.log(error);
        });

      console.log(response);
    }

    reset();
    // window.location.reload();
  };

  return (
    <section>
      <div className={`${classes["car-wrapper"]} flex`}>
        <div className={`${classes["car-image-wrapper"]}`}>
          <img
            className={`${classes["car-image_img"]}`}
            crossOrigin="anonymous"
            src={
              car?.image && typeof car?.image === "string"
                ? import.meta.env.VITE_BACKEND_URL + car.image
                : "https://images.pexels.com/photos/2876872/pexels-photo-2876872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt="car image"
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={`${classes["car-primary-info"]} flex`}>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3 className={classes["car-info-key"]}>Brand: </h3>
              <select {...register("brand", { value: car?.brand })}>
                <BrandSelectOptions />
              </select>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3 className={classes["car-info-key"]}>Series: </h3>
              <input
                {...register("series", { value: car?.series })}
                type="text"
              />
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3 className={classes["car-info-key"]}>Year: </h3>
              <input type="text" {...register("year", { value: car?.year })} />
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3 className={classes["car-info-key"]}>Body Type: </h3>
              <select {...register("bodyType", { value: car?.bodyType })}>
                <BodyTypeOptions />
              </select>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <>
                <div className={`${classes["radio-wrapper"]} flex`}>
                  <label>
                    <input {...register("used")} type="radio" value="New" />
                    New
                  </label>
                  <label>
                    <input {...register("used")} type="radio" value="Used" />
                    Used
                  </label>
                </div>
              </>
            </div>
            {car?.used && (
              <div className={`${classes["car-feature-wrapper"]} flex`}>
                <h2>
                  <input
                    {...register("mileage", { value: car?.mileage || "0" })}
                    type="text"
                  />
                  km
                </h2>
              </div>
            )}
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h1 className={`${classes["car-price"]}`}>
                <select {...register("currency", { value: car?.currency })}>
                  <CurrencyOptions />
                </select>

                <input
                  type="text"
                  placeholder="Price"
                  {...register("price", { value: car?.price })}
                />
              </h1>
            </div>
          </div>
          <div className={`${classes["car-secondary-info"]} flex`}>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Color: </span>

                <select {...register("color", { value: car?.color })}>
                  <ColorSelectOptions />
                </select>

                <>
                  <label>
                    <input
                      {...register("metallicColor")}
                      type="radio"
                      value="Metallic"
                    />
                    metallic
                  </label>{" "}
                  <label>
                    <input
                      {...register("metallicColor")}
                      type="radio"
                      value="Matte"
                    />
                    matte
                  </label>
                </>
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Transmission: </span>
                <>
                  <label>
                    <input
                      {...register("transmissionType")}
                      type="radio"
                      value="Automatic"
                    />
                    Automatic
                  </label>
                  <label>
                    <input
                      {...register("transmissionType")}
                      type="radio"
                      value="Manual"
                    />
                    Manuel
                  </label>
                </>
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Fuel: </span>
                <select {...register("fuelType", { value: car?.fuelType })}>
                  <FuelTypeOptions />
                </select>
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Power: </span>
                <input
                  {...register("enginePower", { value: car?.enginePower })}
                  type="text"
                  placeholder="Engine Power"
                />
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Displacement: </span>
                <input
                  {...register("engineDisplacement", {
                    value: car?.engineDisplacement,
                  })}
                  type="text"
                  placeholder="Engine Displacement"
                />
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Paint Changed: </span>
                <input
                  {...register("paintChanged", {
                    value: car?.eligibleForTrade,
                  })}
                  type="checkbox"
                />
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Traction: </span>
                <>
                  <label>
                    <input {...register("traction")} type="radio" value="2x4" />
                    2x4
                  </label>
                  <label>
                    <input {...register("traction")} type="radio" value="4x4" />
                    4x4
                  </label>
                </>
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>
                  Trade Eligibility:{" "}
                </span>
                <input
                  {...register("eligibleForTrade", {
                    value: car?.eligibleForTrade,
                  })}
                  type="checkbox"
                />
              </h3>{" "}
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Seller: </span>
                <>
                  <label>
                    <input {...register("seller")} type="radio" value="Owner" />
                    Owner
                  </label>
                  <label>
                    <input
                      {...register("seller")}
                      type="radio"
                      value="Gallery"
                    />
                    Gallery
                  </label>
                </>
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3>
                <span className={classes["car-info-key"]}>Ad Date: </span>
                {car?.adDate}
              </h3>
            </div>
            <div className={`${classes["car-feature-wrapper"]} flex`}>
              <h3 className={classes["car-info-key"]}>Details: </h3>
              <textarea cols={30} rows={8} {...register("details")}></textarea>
            </div>
          </div>
          <div className={`${classes["car-buttons"]}`}>
            <Button isSubmit={true}>Save</Button>
            <Button onClick={() => setEditMode(false)}>Cancel Edit</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CarEdit;
