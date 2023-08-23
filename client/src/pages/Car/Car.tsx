import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetCarByIdQuery } from "../../app/api/carsApiSplice";
import classes from "./car.module.css";

const Car = () => {
  const { cid } = useParams();

  const { data, isSuccess } = useGetCarByIdQuery(`${cid}`);

  const car = data;

  useEffect(() => {
    console.log(car?.color);
  }, [car]);

  return (
    <div className={`${classes["car-wrapper"]} grid`}>
      <div className={`${classes["car-image-wrapper"]}`}>
        <img
          className={`${classes["car-image_img"]}`}
          src={
            car?.image ||
            "https://images.pexels.com/photos/2876872/pexels-photo-2876872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt="car image"
        />
      </div>
      <div className={`${classes["car-primary-info"]} flex`}>
        <h1>{car?.brand}</h1>
        <h2>{car?.series}</h2>
        <h2>{car?.year}</h2>
        <h2>{car?.bodyType}</h2>
        <h2>{car?.used ? "Used" : "New"}</h2>
        {car?.used ? <h2>{car.mileage} km</h2> : null}
        <h1 className={`${classes["car-price"]}`}>
          {car?.currency} {car?.price}
        </h1>
      </div>
      <div className={`${classes["car-secondary-info"]} flex`}>
        <h3>
          <span className={classes["car-info-key"]}>Color: </span>
          {/* {car?.metallicColor ? "metallic" : null} */}{" "}
          {car?.color || "white"}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Transmission: </span>
          {car?.transmissionType}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Fuel: </span>
          {car?.fuelType}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Displacement: </span>
          {car?.engineDisplacement}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Power: </span>
          {car?.enginePower}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Displacement: </span>
          {car?.engineDisplacement}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Paint Change: </span>
          {car?.paintChanged ? "changed" : "original color"}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Traction: </span>
          {car?.traction || "2x4"}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Trade Eligibility: </span>
          {car?.eligibleForTrade
            ? "Eligible for trade"
            : "Not eligible for trade"}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Seller: </span>
          {car?.seller}
        </h3>
        <h3>
          <span className={classes["car-info-key"]}>Ad Date: </span>
          {car?.adDate}
        </h3>
      </div>
      <div className={`${classes["car-details"]}`}>
        <h3>
          <span className={classes["car-info-key"]}>More Details: </span>
          {car?.details}
        </h3>
      </div>
    </div>
  );
};

export default Car;
