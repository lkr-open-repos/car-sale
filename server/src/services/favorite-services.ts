import { Favorite, HttpError } from "../models";
import { FavoriteDocument, IFavorite } from "../types";

export const newFavoriteService = async (
  favoriteData: IFavorite
): Promise<FavoriteDocument> => {
  const { userId, carId } = favoriteData;

  let createdFavorite: FavoriteDocument;

  createdFavorite = await Favorite.create({
    userId,
    carId,
  });

  await createdFavorite.save();

  return createdFavorite;
};
