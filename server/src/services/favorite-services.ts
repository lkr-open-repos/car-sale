import { Favorite, HttpError } from "../models";
import { FavoriteDocument, IFavorite } from "../types";

export const createFavoriteService = async (
  carId: string,
  userId: string
): Promise<FavoriteDocument> => {
  let createdFavorite: FavoriteDocument;

  const isFavorite = await Favorite.findOne({ carId: carId, userId: userId });
  if (!isFavorite) {
    createdFavorite = await Favorite.create({ carId, userId });
    await createdFavorite.save();
    return createdFavorite;
  }

  return isFavorite;
};

export const getFavoritesService = async (
  userId: string,
  asCars: boolean = false
): Promise<FavoriteDocument[]> => {
  let favorites: FavoriteDocument[] = [];

  if (asCars) {
    favorites = await Favorite.find({ userId: userId }).populate("carId");
    favorites = favorites.map((favorite: any) => favorite.carId);
    return favorites;
  }

  favorites = await Favorite.find({ userId: userId });
  if (!favorites) {
    favorites = [];
  }

  return favorites;
};
