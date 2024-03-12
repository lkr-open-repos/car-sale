import { Favorite, HttpError } from "../models";
import { CarDocument, FavoriteDocument, IFavorite } from "../types";
import { httpErrorLogger } from "../utils";

/**
 *  Creates a new favorite in the database. Returns the created favorite.
 *
 * @param {string} carId - the car ID
 * @param {string} userId - the user ID
 * @return {Promise<FavoriteDocument>} a promise that resolves when the favorite is created
 * */
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

/**
 * Retrieves all favorites from the database and returns an array of favorite objects.
 *
 * @param {string} userId - the user ID
 * @param {boolean} asCars - whether to return the favorites as cars
 * @return {Promise<FavoriteDocument[]>} a promise that resolves when the favorites are retrieved
 * */
export const getFavoritesService = async (
  userId: string,
  asCars: boolean = false
): Promise<FavoriteDocument[]> => {
  let favorites: FavoriteDocument[] = [];

  if (asCars) {
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
    favorites = (await Favorite.find({ userId: userId })) as FavoriteDocument[];
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

/**
 * Deletes a favorite from the database. Checks if the user is allowed to delete the favorite before.
 *
 * @param {string} carId - the car ID
 * @param {string} userId - the user ID
 * @return {Promise<void>} a promise that resolves when the favorite is deleted
 * */
export const deleteFavoriteService = async (
  carId: string,
  userId: string
): Promise<void> => {
  let favorite: FavoriteDocument | null;
  try {
    favorite = await Favorite.findOne({ carId: carId, userId: userId });
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => find query failed => favorite-service",
    });
    throw new HttpError("Could not find favorite", 404);
  }
  if (!favorite) {
    httpErrorLogger.error({
      message: "could not find favorite for the id => favorite-service",
    });
    throw new HttpError("Could not delete favorite", 404);
  }
  if (favorite.userId.toString() !== userId) {
    httpErrorLogger.error({
      message: "could not delete favorite for the id => favorite-service",
    });
    throw new HttpError("You are not allowed to delete this favorite", 401);
  }
  try {
    await favorite.deleteOne();
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => delete query failed => favorite-service",
    });
    throw new HttpError("Could not delete favorite", 404);
  }
};
