import { model, Schema } from "mongoose";
import { UserDocument } from "../types/";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically create createdAt timestamp
  }
);

export const User = model<UserDocument>("User", userSchema);
