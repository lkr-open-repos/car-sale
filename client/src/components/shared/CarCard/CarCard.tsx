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

interface IProps {
  car: ICar;
  isFavorite?: boolean;
}

const CarCard: React.FC<IProps> = ({ car, isFavorite }) => {
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
      try {
        const error = addFavoriteError as { data: { message: string } };
        sendErrorLog(`${error.data.message} => Add Favorite Error`);
      } catch (error) {
        // Just to avoid crash. Not much to do if error logging can't be done.
      }
    }
    if (isRemoveFavoriteError) {
      try {
        const error = removeFavoriteError as { data: { message: string } };
        sendErrorLog(`${error} => Remove Favorite Error`);
      } catch (error) {
        // Just to avoid crash. Not much to do if error logging can't be done.
      }
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
