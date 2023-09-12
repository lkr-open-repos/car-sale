import { model, Schema } from "mongoose";
import { CarDocument } from "../types";

const carSchema = new Schema<CarDocument>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    used: { type: Boolean, default: false, required: true },
    brand: { type: String, required: true },
    series: { type: String, required: true },
    year: { type: Number, required: true },
    color: {
      type: String,
      required: true,
      enum: [
        "BLACK",
        "WHITE",
        "SILVER",
        "RED",
        "BLUE",
        "GREEN",
        "YELLOW",
        "BROWN",
        "PURPLE",
      ],
    },
    mileage: { type: String, required: true },
    transmissionType: {
      type: String,
      required: true,
      enum: ["MANUAL", "AUTOMATIC"],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["PETROL", "DIESEL", "ELECTRIC", "HYBRID"],
    },
    bodyType: { type: String, required: true },
    engineDisplacement: { type: Number, required: true },
    enginePower: { type: Number, required: true },
    traction: { type: String, required: true, enum: ["2x4", "4x4"] },
    paintChanged: { type: Boolean, required: true, default: false },
    eligibleForTrade: { type: Boolean, required: true, default: false },
    adDate: { type: String, required: true },
    seller: {
      type: String,
      required: true,
      enum: ["OWNER", "GALLERY"],
    },
    price: { type: String, required: true },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "TRY"],
    },
    image: { type: String, required: false },
    details: { type: String, required: false },
  },

  { timestamps: true }
);

export const Car = model<CarDocument>("Car", carSchema);
