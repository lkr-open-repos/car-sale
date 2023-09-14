import fs from "fs";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction, ICar } from "../types";

import { HttpError } from "../models";
import { Car } from "../models";
import { CarDocument } from "../types";
import { throwErrorHelper, validationHelper } from "../utils/";
import {
  createCarService,
  getAllCarsService,
  getCarByIdService,
  getCarsByUserService,
  deleteCarService,
  getCarsBySearchDataService,
  updateCarService,
} from "../services";

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  validationHelper(validationResult(req), next);
  let createdCar: CarDocument;
  try {
    createdCar = await createCarService({
      ...req.body,
      image: req.file?.path,
    });
  } catch (err) {
    return next(
      throwErrorHelper(err, "Creating car failed, please try again.")
    );
  }
  res.status(201).json({ car: createdCar });
};

export const getAllCars = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let cars: CarDocument[];
  try {
    cars = await getAllCarsService();
  } catch (err) {
    return next(throwErrorHelper(err));
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
    car = await getCarByIdService(carId);
  } catch (err) {
    return next(throwErrorHelper(err));
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
    cars = await getCarsByUserService(userId);
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.json({ cars: cars.map((car) => car.toObject({ getters: true })) });
};

export const getCarsBySearchData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cars: CarDocument[];
  try {
    console.log(req.body);

    cars = await getCarsBySearchDataService(req.body);
  } catch (err) {
    return next(throwErrorHelper(err));
  }
  res.json({ cars });
};

export const updateCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validationHelper(validationResult(req), next);
  const carId = req.params.cid;
  let car: CarDocument;
  try {
    car = await updateCarService(carId, req.user!.Id, req.body);
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
    deleteCarService(carId, req.user!.Id);
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.status(200).json({ message: "Deleted car." });
};
