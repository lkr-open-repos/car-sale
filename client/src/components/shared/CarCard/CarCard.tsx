import React from "react";
import { ICar } from "../../../types/car-interface";
import classes from "./CarCard.module.css";
import { currencyIconHelper } from "../../../utils/currencyIconHelper";
import favHeartIcon from "../../../assets/icons/favHeartIcon.svg";
import favStarIcon from "../../../assets/icons/favStarIcon.svg";

interface IProps {
  car: ICar;
}

const CarCard: React.FC<IProps> = ({ car }) => {
  const currencyIcon = currencyIconHelper(car.currency);
  console.log(car.id);

  return (
    <div className={`${classes["car-card"]} flex`}>
      <div className={classes["fav-icon"]}>
        <img src={favStarIcon} alt="" />
      </div>
      <div className={classes["car-image"]}>
        <img
          className={classes["car-image_img"]}
          src={
            car.image ||
            "https://images.pexels.com/photos/2876872/pexels-photo-2876872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          }
          alt=""
        />
      </div>
      <div className={classes["car-info"]}>
        <h1>{`${car.brand} ${car.series}`}</h1>
        <h3>
          <span>{currencyIcon} </span>
          {car.price}
        </h3>
        <h3>
          <span>{car.year}</span> / <span>{car.transmissionType}</span>
          {" / "}
          <span>{car.enginePower}hp</span>
        </h3>
      </div>
    </div>
  );
};

export default CarCard;
