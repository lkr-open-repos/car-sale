import { Schema } from "mongoose";
import {
  getFavoritesService,
  createFavoriteService,
  deleteFavoriteService,
} from "../services/";
import { Request, Response, NextFunction } from "../types";

import { FavoriteDocument } from "../types";
import { throwErrorHelper } from "../utils";

/**
 * Create a favorite and send the created favorite as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} a promise of void
 */
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

/**
 * Retrieve all favorites and send the favorite data as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the JSON response is sent
 * */
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

/**
 * Retrieve all favorites and send the favorite data as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the JSON response is sent
 * */
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

/**
 * Delete a favorite and send a message as response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise of void
 * */
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
