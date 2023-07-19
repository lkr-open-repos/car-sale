import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import carsRoutes from "./routes/cars-routes";

import { errorHandler, notFound } from "./middleware";

const app = express();

app.use(express.json());

// morgan

dotenv.config();

// Routes
app.use("/api/v1/cars", carsRoutes);

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
