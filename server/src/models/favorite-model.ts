import { model, Schema } from "mongoose";
import { FavoriteDocument } from "../types";

const favoriteSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carId: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
});

export const Favorite = model<FavoriteDocument>("Favorite", favoriteSchema);
