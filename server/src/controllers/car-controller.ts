import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

import { HttpError } from "../models";
import { Car } from "../models";
import { CarDocument } from "../types";
import { User } from "../models";

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422, {
      validationMessages: errors.array(),
    });
    return next(error);
  }
  const createdCar = new Car(req.body as CarDocument);
  try {
    await createdCar.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating car failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ car: createdCar });
};

export const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let cars: CarDocument[] = [];
  try {
    cars = await Car.find({});
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!cars || cars.length === 0) {
    const error = new HttpError("Could not find cars", 404);
    return next(error);
  }
  res.json({ cars: cars.map((car) => car.toObject({ getters: true })) });
};

export const getCarById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const carId = req.params.cid;
  let car: CarDocument;
  try {
    car = (await Car.findById(carId)) as CarDocument;
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!car) {
    const error = new HttpError("Could not find car for this id", 404);
    return next(error);
  }

  res.json({ car: car.toObject({ getters: true }) });
};

export const getCarsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.uid;
  let cars: CarDocument[];
  try {
    cars = (await Car.find({ user: userId })) as CarDocument[];
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  if (!cars || cars.length === 0) {
    const error = new HttpError("Could not find car for this id", 404);
    return next(error);
  }

  res.json({ cars: cars.map((car) => car.toObject({ getters: true })) });
};

export const updateCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422, {
      validationMessages: errors.array(),
    });
    return next(error);
  }
  const carId = req.params.cid;
  let car: CarDocument;
  try {
    car = (await Car.findById(carId)) as CarDocument;
    if (!car) {
      const error = new HttpError("Could not find car for this id", 404);
      return next(error);
    }

    if (car.user.toString() !== req.body.userData.userId) {
      const error = new HttpError(
        "You are not authorized to update this car",
        401
      );
      return next(error);
    }
    car.set(req.body);
    await car.save();
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  res.status(200).json({ car: car.toObject({ getters: true }) });
};

export const deleteCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const carId = req.params.cid;

  let car: CarDocument;
  try {
    car = (await Car.findById(carId)) as CarDocument;
    if (!car) {
      const error = new HttpError("Could not find car for this id", 404);
      return next(error);
    }
    if (car.user.toString() !== req.body.userData.userId) {
      const error = new HttpError(
        "You are not authorized to delete this car",
        401
      );
      return next(error);
    }
    await Car.deleteOne({ _id: carId });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted car." });
};
