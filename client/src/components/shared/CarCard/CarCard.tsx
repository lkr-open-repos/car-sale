import React from "react";
import { ICar } from "@/types/car-interface";
import classes from "./CarCard.module.css";
import { currencyIconHelper } from "@/utils/currencyIconHelper";
import favStarIcon from "@/assets/icons/favStarIcon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";

interface IProps {
  car: ICar;
}

const CarCard: React.FC<IProps> = ({ car }) => {
  const user = useSelector(selectCurrentUser);

  const currencyIcon = currencyIconHelper(car.currency);

  let isOwner = false;
  if (car.user === user?.id) {
    isOwner = true;
  }

  return (
    <Link to={`/cars/${car.id}`}>
      <div
        className={`${classes["car-card"]} flex ${
          user?.id && isOwner && classes["owner"]
        }`}
      >
        <div className={classes["fav-icon"]}>
          <img src={favStarIcon} alt="" />
        </div>
        <div className={classes["car-image"]}>
          <img
            className={classes["car-image_img"]}
            crossOrigin="anonymous"
            src={
              car?.image && typeof car.image === "string"
                ? import.meta.env.VITE_BACKEND_URL + car.image
                : "https://images.pexels.com/photos/2876872/pexels-photo-2876872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            }
            alt=""
          />
        </div>
        <div className={classes["car-info"]}>
          <h1>{car.brand}</h1>
          <h1> {car.series}</h1>
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
    </Link>
  );
};

export default CarCard;
