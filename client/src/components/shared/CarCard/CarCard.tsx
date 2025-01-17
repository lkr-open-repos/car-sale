import React, { useEffect } from "react";
import { ICar } from "@/types/carInterface";
import classes from "./CarCard.module.css";
import { currencyIconHelper } from "@/utils/currencyIconHelper";
import favStarIcon from "@/assets/icons/favStarIcon.svg";
import removeFavStarIcon from "@/assets/icons/removeFavStarIcon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/app/authSlice";
import {
  useCreateFavoriteMutation,
  useDeleteFavoriteMutation,
} from "@/app/api/favoriteApiSlice";
import { sendErrorLog } from "@/utils/sendErrorLog";
import { keys } from "@/keys";
import fallbackCar from "../../../assets/images/fallbackCar.jpeg"

interface IProps {
  car: ICar;
  isFavorite?: boolean;
}

// Car card component
const CarCard = ({ car, isFavorite }: IProps) => {
  const user = useSelector(selectCurrentUser);
  const [
    addFavorite,
    { error: addFavoriteError, isError: isAddFavoriteError },
  ] = useCreateFavoriteMutation();
  const [
    removeFavorite,
    { error: removeFavoriteError, isError: isRemoveFavoriteError },
  ] = useDeleteFavoriteMutation();

  useEffect(() => {
    if (isAddFavoriteError) {
      const error = addFavoriteError as { data: { message: string } };
      sendErrorLog(`${error.data.message} => Add Favorite Error`);
    }
    if (isRemoveFavoriteError) {
      const error = removeFavoriteError as { data: { message: string } };
      sendErrorLog(`${error} => Remove Favorite Error`);
    }
  }, [isAddFavoriteError, isRemoveFavoriteError]);

  const currencyIcon = currencyIconHelper(car.currency);

  let isOwner = false;
  if (car.user === user?.id) {
    isOwner = true;
  }

  const addFavoriteHandler = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    addFavorite({ carId: car.id }).unwrap();
  };

  const removeFavoriteHandler = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    removeFavorite({ userId: user!.id, carId: car.id });
  };

  return (
    <Link to={`/cars/${car.id}`}>
      <div
        className={`${classes["car-card"]} flex ${
          user?.id && isOwner && classes["owner"]
        }`}
      >
        {!isOwner && !isFavorite && (
          <div onClick={addFavoriteHandler} className={classes["fav-icon"]}>
            <img src={favStarIcon} alt="" />
          </div>
        )}
        {!isOwner && isFavorite && (
          <div onClick={removeFavoriteHandler} className={classes["fav-icon"]}>
            <img src={removeFavStarIcon} alt="" />
          </div>
        )}

        <div className={classes["car-image"]}>
          <img
            className={classes["car-image_img"]}
            crossOrigin="anonymous"
            src={
              car?.image && typeof car.image === "string" && keys.BACKEND_URL + car.image
                ? keys.BACKEND_URL + car.image
                : fallbackCar
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
