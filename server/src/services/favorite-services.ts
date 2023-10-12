import { Favorite, HttpError } from "../models";
import { FavoriteDocument, IFavorite } from "../types";

export const createFavoriteService = async (
  carId: string,
  userId: string
): Promise<FavoriteDocument> => {
  let createdFavorite: FavoriteDocument;

  createdFavorite = await Favorite.create({ carId, userId });

  await createdFavorite.save();

  return createdFavorite;
};

export const getFavoritesByUserService = async (
  userId: string
): Promise<FavoriteDocument[]> => {
  let favorites: FavoriteDocument[] = [];

  favorites = await Favorite.find({ userId });
  if (!favorites || favorites.length < 1) {
    throw new HttpError("Could not find favorites for this user", 404);
  }

  return favorites;
};
