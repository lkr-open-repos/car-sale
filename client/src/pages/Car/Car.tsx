import { useParams } from "react-router-dom";

import {
  useGetCarByIdQuery,
  useUpdateCarMutation,
} from "@/app/api/carsApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ICarFormInput } from "@/types/car-form-input-interface";
import Button from "@/components/shared/Button/Button";
import { appendFormDataHelper } from "@/utils/appendFormDataHelper";
import CarInfo from "./CarInfo";
import CarEdit from "./CarEdit";

const Car = () => {
  const [updateCar] = useUpdateCarMutation();

  const { cid } = useParams();
  const [editMode, setEditMode] = useState(false);

  const { data, isSuccess } = useGetCarByIdQuery(`${cid}`);

  const car = data;

  const user = useSelector(selectCurrentUser);

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
    }
  }, [car]);

  let isOwner = false;
  if (car?.user === user?.id) {
    isOwner = true;
  }

  const onSubmit: SubmitHandler<ICarFormInput> = async (
    data: Partial<ICarFormInput>
  ) => {
    const formData = appendFormDataHelper(data, user);

    if (cid) {
      await updateCar({ updateData: formData, cid })
        .unwrap()
        .catch((error) => {
          setQueryError(error.data.message);
        });
    }
    reset();
    window.location.reload();
  };

  return (
    <>
      {editMode ? (
        <CarEdit car={car!} user={user!} setEditMode={setEditMode}></CarEdit>
      ) : (
        <CarInfo
          isOwner={isOwner}
          car={car!}
          setEditMode={setEditMode}
        ></CarInfo>
      )}
      {!isOwner && <Button>Message Seller</Button>}
    </>
  );
};

export default Car;
function setQueryError(message: any) {
  throw new Error("Function not implemented.");
}

{
  /* <section>
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
          <div className={`${classes["car-features-wrapper"]} flex`}>
            {editMode ? (
              <select {...register("brand", { value: car?.brand })}>
                <BrandSelectOptions />
              </select>
            ) : (
              <h1>{car?.brand}</h1>
            )}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            {editMode ? (
              <input
                {...register("series", { value: car?.series })}
                type="text"
              />
            ) : (
              <h2>{car?.series}</h2>
            )}{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            {editMode ? (
              <input
                type="text"
                placeholder={String(car?.year)}
                {...register("year", { value: car?.year })}
              />
            ) : (
              <h2>{car?.year}</h2>
            )}{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            {editMode ? (
              <select {...register("bodyType", { value: car?.bodyType })}>
                <BodyTypeOptions />
              </select>
            ) : (
              <h2>{car?.bodyType}</h2>
            )}{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            {editMode ? (
              <>
                <div className={`${classes["radio-wrapper"]} flex`}>
                  <label>
                    <input {...register("used")} type="radio" value="New" />
                    New
                  </label>
                  <label>
                    <input
                      {...register("used")}
                      type="radio"
                      value="Used"
                    />
                    Used
                  </label>
                </div>
              </>
            ) : (
              <h2>{car?.used === "Used" ? "Used" : "New"}</h2>
            )}{" "}
          </div>
          {car?.used && (
            <div className={`${classes["car-features-wrapper"]} flex`}>
              <h2>
                {editMode ? (
                  <input
                    {...register("mileage", { value: car?.mileage || "0" })}
                    type="text"
                  />
                ) : (
                  car?.mileage
                )}{" "}
                km
              </h2>
            </div>
          )}
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h1 className={`${classes["car-price"]}`}>
              {editMode ? (
                <select {...register("currency", { value: car?.currency })}>
                  <CurrencyOptions />
                </select>
              ) : (
                car?.currency
              )}{" "}
              {editMode ? (
                <input
                  type="text"
                  placeholder="Price"
                  {...register("price", { value: car?.price })}
                />
              ) : (
                car?.price
              )}
            </h1>
          </div>
        </div>
        <div className={`${classes["car-secondary-info"]} flex`}>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Color: </span>
              {editMode ? (
                <select {...register("color", { value: car?.color })}>
                  <ColorSelectOptions />
                </select>
              ) : (
                car?.color
              )}{" "}
              {editMode ? (
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
              ) : car?.metallicColor ? (
                "metallic"
              ) : null}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>
                Transmission:{" "}
              </span>
              {editMode ? (
                <>
                  {" "}
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
              ) : (
                car?.transmissionType
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Fuel: </span>
              {editMode ? (
                <select {...register("fuelType", { value: car?.fuelType })}>
                  <FuelTypeOptions />
                </select>
              ) : (
                car?.fuelType
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Power: </span>
              {editMode ? (
                <input
                  {...register("enginePower", { value: car?.enginePower })}
                  type="text"
                  placeholder="Engine Power"
                />
              ) : (
                car?.enginePower
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>
                Displacement:{" "}
              </span>
              {editMode ? (
                <input
                  {...register("engineDisplacement", {
                    value: car?.engineDisplacement,
                  })}
                  type="text"
                  placeholder="Engine Displacement"
                />
              ) : (
                car?.engineDisplacement
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>
                Paint Changed:{" "}
              </span>
              {editMode ? (
                <input
                  {...register("paintChanged", {
                    value: car?.eligibleForTrade,
                  })}
                  type="checkbox"
                />
              ) : car?.paintChanged ? (
                "changed"
              ) : (
                "original color"
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Traction: </span>
              {editMode ? (
                <>
                  <label>
                    <input
                      {...register("traction")}
                      type="radio"
                      value="2x4"
                    />
                    2x4
                  </label>
                  <label>
                    <input
                      {...register("traction")}
                      type="radio"
                      value="4x4"
                    />
                    4x4
                  </label>
                </>
              ) : (
                car?.traction || "2x4"
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>
                Trade Eligibility:{" "}
              </span>
              {editMode ? (
                <input
                  {...register("eligibleForTrade", {
                    value: car?.eligibleForTrade,
                  })}
                  type="checkbox"
                />
              ) : car?.eligibleForTrade ? (
                "Eligible for trade"
              ) : (
                "Not eligible for trade"
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Seller: </span>
              {editMode ? (
                <>
                  {" "}
                  <label>
                    <input
                      {...register("seller")}
                      type="radio"
                      value="Owner"
                    />
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
              ) : (
                car?.seller
              )}
            </h3>{" "}
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Ad Date: </span>
              {car?.adDate}
            </h3>{" "}
          </div>
        </div>
        <div className={`${classes["car-details"]}`}>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              {car?.details && (
                <span className={classes["car-info-key"]}>
                  More Details: {car?.details}
                </span>
              )}
            </h3>{" "}
          </div>
        </div>
        <div className={`${classes["car-buttons"]}`}>
          {isOwner ? (
            <>
              {editMode ? (
                <>
                  <button type="submit">Save</button>
                  <button onClick={() => setEditMode(false)}>
                    Cancel Edit
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}>Edit Car</button>
              )}
            </>
          ) : (
            <button>Message Seller</button>
          )}
        </div>
      </form>
    </div>
  </section> */
}
