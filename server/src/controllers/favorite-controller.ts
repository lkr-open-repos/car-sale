import { Schema } from "mongoose";
import {
  getFavoritesService,
  createFavoriteService,
  deleteFavoriteService,
} from "../services/";
import { Request, Response, NextFunction } from "../types";

import { FavoriteDocument } from "../types";
import { throwErrorHelper } from "../utils";

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
  let favorites: FavoriteDocument[] = [];

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

  try {
    favorites = await getFavoritesService(req.user!.Id, true);
  } catch (err) {
    return next(throwErrorHelper(err, "Could Not Get Favorites"));
  }

  res.json({
    favorites: favorites.map((favorite) =>
      favorite.toObject({ getters: true })
    ),
  });
};

export const deleteFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { carId, userId } = req.body;

  try {
    await deleteFavoriteService(carId, userId);
  } catch (err) {
    return next(throwErrorHelper(err, "Could Not Delete Favorite"));
  }

  res.status(200).json({ message: "Favorite Deleted" });
};
