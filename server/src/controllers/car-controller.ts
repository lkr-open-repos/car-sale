import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

import { HttpError } from "../models";
import { Car } from "../models";
import { ICar } from "../types";

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

  const createdCar = new Car(req.body as ICar);

  try {
    await createdCar.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Creating car failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ car: createdCar });
};
