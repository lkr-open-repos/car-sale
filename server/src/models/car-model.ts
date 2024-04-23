import { model, Schema } from "mongoose";
import { CarDocument } from "../types";

const carSchema = new Schema<CarDocument>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    used: { type: String, required: true },
    brand: { type: String, required: true },
    series: { type: String, required: true },
    year: { type: Number, required: true },
    color: {
      type: String,
      required: true,
    },
    metallicColor: { type: String, required: true },
    mileage: { type: Number, required: true },
    transmissionType: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      required: true,
    },
    bodyType: { type: String, required: true },
    engineDisplacement: { type: Number, required: true },
    enginePower: { type: Number, required: true },
    traction: { type: String, required: true },
    paintChanged: { type: Boolean, required: true, default: false },
    eligibleForTrade: { type: Boolean, required: true, default: false },
    adDate: { type: String, required: true },
    seller: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
    currency: {
      type: String,
      required: true,
    },
    image: { type: String, required: false },
    details: { type: String, required: false },
  },

  { timestamps: true }
);

export const Car = model<CarDocument>("Car", carSchema);
