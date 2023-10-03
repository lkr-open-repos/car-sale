import { ICar } from "@/types/car-interface";
import React from "react";
import classes from "./car.module.css";
import Button from "@/components/shared/Button/Button";

interface IProps {
  car: ICar;
  setEditMode: (value: boolean) => void;
  isOwner: boolean;
}

const CarInfo: React.FC<IProps> = ({ car, setEditMode, isOwner }) => {
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
        <div className={`${classes["car-primary-info"]} flex`}>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h1>{car?.brand}</h1>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h2>{car?.series}</h2>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h2>{car?.year}</h2>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h2>{car?.bodyType}</h2>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h2>{car?.used === "Used" ? "Used" : "New"}</h2>
          </div>
          {car?.used && (
            <div className={`${classes["car-features-wrapper"]} flex`}>
              <h2>{car?.mileage} km</h2>
            </div>
          )}
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h1 className={`${classes["car-price"]}`}>
              {car?.currency} {car?.price}
            </h1>
          </div>
        </div>
        <div className={`${classes["car-secondary-info"]} flex`}>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Color: </span>
              {car?.color} {car?.metallicColor && "metallic"}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Transmission: </span>
              {car?.transmissionType}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Fuel: </span>
              {car?.fuelType}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Power: </span>
              {car?.enginePower}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Displacement: </span>
              {car?.engineDisplacement}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Paint Changed: </span>
              {car?.paintChanged ? "changed" : "original color"}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Traction: </span>
              {car?.traction || "2x4"}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>
                Trade Eligibility:
              </span>
              {car?.eligibleForTrade
                ? "Eligible for trade"
                : "Not eligible for trade"}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Seller: </span>
              {car?.seller}
            </h3>
          </div>
          <div className={`${classes["car-features-wrapper"]} flex`}>
            <h3>
              <span className={classes["car-info-key"]}>Ad Date: </span>
              {car?.adDate}
            </h3>
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
            </h3>
          </div>
        </div>
        <div className={`${classes["car-buttons"]}`}>
          {isOwner && (
            <>
              <Button onClick={() => setEditMode(true)}>Edit Car</Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default CarInfo;
