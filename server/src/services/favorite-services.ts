import { Favorite, HttpError } from "../models";
import { FavoriteDocument, IFavorite } from "../types";
import { httpErrorLogger } from "../utils";

export const createFavoriteService = async (
  carId: string,
  userId: string
): Promise<FavoriteDocument> => {
  let createdFavorite: FavoriteDocument;
  let isFavorite: FavoriteDocument | null;
  try {
    isFavorite = await Favorite.findOne({ carId: carId, userId: userId });
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => query failed => favorite-service",
    });
    throw new HttpError(
      "Creating favorite failed, please try again later.",
      503
    );
  }
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
    let favorites: FavoriteDocument[] = [];

    try {
      favorites = await Favorite.find({ userId: userId }).populate("carId");
    } catch (err: any) {
      httpErrorLogger.error({
        message: err.message + " => query as cars failed => favorite-service",
      });
      throw new HttpError("Could not find favorites", 404);
    }
    favorites = favorites.map((favorite: any) => favorite.carId);
    return favorites;
  }

  try {
    favorites = await Favorite.find({ userId: userId });
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => query not as cars failed => favorite-service",
    });
    throw new HttpError("Could not find favorites", 404);
  }
  if (!favorites) {
    favorites = [];
  }

  return favorites;
};
