import { Schema } from "mongoose";
import { getFavoritesService } from "../services/";
import { createFavoriteService } from "../services/";
import { Request, Response, NextFunction, CarDocument } from "../types";

import { FavoriteDocument } from "../types";
import { throwErrorHelper } from "../utils";
import { getCarByIdService } from "../services";

export const createFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let createdFavorite: FavoriteDocument;

  try {
    createdFavorite = await createFavoriteService(req.body.carId, req.user!.Id);
  } catch (err) {
    return next(
      throwErrorHelper(err, "Creating favorite failed, please try again.")
    );
  }
  res.status(201).json({ favorite: createdFavorite });
};

export const getFavoritesByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let favorites: FavoriteDocument[];

  try {
    favorites = await getFavoritesService(req.user!.Id);
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.json({
    favorites: favorites.map((favorite) => favorite.carId.toString()),
  });
};

export const getCarsByFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let favorites: FavoriteDocument[];
  let carsByFavorites: CarDocument[] = [];

  try {
    favorites = await getFavoritesService(req.user!.Id, true);
  } catch (err) {
    return next(throwErrorHelper(err, "Could Not Get Favorites"));
  }

  // if (favorites && favorites.length > 0) {
  //   try {
  //     await Promise.all(
  //       favorites.map(async (favorite) => {
  //         let car = await getCarByIdService(favorite.carId.toString());
  //         carsByFavorites.push(car);
  //       })
  //     );
  //   } catch (err) {
  //     throwErrorHelper(err, "Could Not Get Favorites");
  //   }
  // }

  res.json({
    favorites: favorites.map((favorite) =>
      favorite.toObject({ getters: true })
    ),
  });
};
