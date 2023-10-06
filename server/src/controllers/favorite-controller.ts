import { newFavoriteService } from "../services/favorite-services";
import { Request, Response, NextFunction } from "../types";

import { FavoriteDocument } from "../types";
import { throwErrorHelper } from "../utils";

export const newFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let createdFavorite: FavoriteDocument;
  try {
    createdFavorite = await newFavoriteService({
      ...req.body,
    });
  } catch (err) {
    return next(
      throwErrorHelper(err, "Creating car failed, please try again.")
    );
  }
  res.status(201).json({ favorite: createdFavorite });
};
