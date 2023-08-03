import express from "express";
import { Request, Response, NextFunction } from "./types";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import carsRoutes from "./routes/car-routes";
import userRoutes from "./routes/user-routes";

import { errorHandler, notFound } from "./middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));

// morgan

dotenv.config();

// Routes
app.use("/api/v1/cars", carsRoutes);
app.use("/api/v1/users", userRoutes);

// Error handling middlewares
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(
    "mongodb+srv://4dm1n:xLdGhy6JlSg7BDBO@cluster0.6l6ml.mongodb.net/cars?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => console.log(err));