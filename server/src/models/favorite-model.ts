import { model, Schema } from "mongoose";
import { FavoriteDocument } from "../types";

const favoriteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

export const Favorite = model<FavoriteDocument>("Favorite", favoriteSchema);
