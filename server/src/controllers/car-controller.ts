import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "../types";

import { CarDocument } from "../types";
import { throwErrorHelper, validationHelper } from "../utils/";
import {
  createCarService,
  getAllCarsService,
  getCarByIdService,
  getCarsByUserService,
  deleteCarService,
  getCarsBySearchService,
  updateCarService,
} from "../services";

/**
 * Create a car based on the request data, validate it, and return the created car in the response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} Promise that resolves when the car is created and the response is sent
 */

export const createCar = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const validationError = validationHelper(validationResult(req), next);
  if (validationError) {
    return next(validationError);
  }
  let createdCar: CarDocument;
  try {
    createdCar = await createCarService({
      ...req.body,
      image: req.file?.path,
    });
    console.log(req.file?.path);
  } catch (err) {
    return next(
      throwErrorHelper(err, "Creating car failed, please try again.")
    );
  }
  res.status(201).json({ car: createdCar.toObject({ getters: true }) });
};

/**
 * Retrieve all cars and send the car data as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the JSON response is sent
 */
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

/**
 * Retrieves a car by its ID and sends it as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the car is successfully retrieved and sent as a JSON response
 */
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

/**
 * Retrieves cars associated with a specific user and sends the result as JSON.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the cars are sent as JSON
 */
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

/**
 * Retrieves cars based on search criteria and paginates the results.
 *
 * @param {Request} req - the incoming request object
 * @param {Response} res - the outgoing response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a Promise that resolves with the JSON response containing the retrieved cars and total pages
 */
export const getCarsBySearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let cars: CarDocument[] = [];
  let totalPages: Number = 0;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;

  try {
    const result = await getCarsBySearchService(req.body, page, limit);
    cars = result.cars;
    totalPages = result.totalPages;
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.status(200).json({
    cars: cars.map((car) => car.toObject({ getters: true })),
    totalPages,
  });
};

/**
 * Update a car based on the request and response objects, and call the next function.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function to call
 * @return {Promise<void>} a Promise that resolves to nothing
 */
export const updateCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const carId = req.params.cid;
  const validationError = validationHelper(validationResult(req), next);
  if (validationError) {
    return next(validationError);
  }

  let car: CarDocument;
  try {
    car = await updateCarService(carId, req.user!.Id, req.body);
  } catch (err) {
    return next(
      throwErrorHelper(err, "Updating car failed, please try again.")
    );
  }

  res.status(200).json({ car: car.toObject({ getters: true }) });
};

/**
 * Deletes a car based on the car ID provided in the request parameters.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} a Promise that resolves when the car is deleted
 */
export const deleteCar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const carId = req.params.cid;

  try {
    await deleteCarService(carId, req.user!.Id);
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.status(200).json({ message: "Deleted car." });
};
