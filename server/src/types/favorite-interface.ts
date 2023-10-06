import { Model, Document, Schema } from "mongoose";

export interface IFavorite {
  userId: Schema.Types.ObjectId;
  carId: Schema.Types.ObjectId;
}

export interface FavoriteDocument extends IFavorite, Document {}

export interface FavoriteModel extends Model<FavoriteDocument> {}
