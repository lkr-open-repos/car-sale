import dotenv from "dotenv";

dotenv.config();

export const keys = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING,
};
