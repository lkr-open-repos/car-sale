import {
  createFavoriteService,
  getFavoritesByUserService,
} from "../services/favorite-services";
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
  let favorites: FavoriteDocument[];
  try {
    favorites = await getFavoritesByUserService(req.user!.Id);
  } catch (err) {
    return next(throwErrorHelper(err));
  }
  res.json({
    favorites: favorites.map((favorite) =>
      favorite.toObject({
        getters: true,
      })
    ),
  });
};
