import { Car, HttpError } from "../models";
import { CarDocument, ICar } from "../types";
import {
  deleteImageHelper,
  fillSearchDataHelper,
  httpErrorLogger,
} from "../utils";
import { ICarFormInput } from "../types";

export const createCarService = async (carData: ICar): Promise<CarDocument> => {
  const {
    user,
    used,
    brand,
    series,
    year,
    color,
    metallicColor,
    mileage,
    transmissionType,
    fuelType,
    bodyType,
    engineDisplacement,
    enginePower,
    traction,
    paintChanged,
    eligibleForTrade,
    adDate,
    seller,
    price,
    details,
    currency,
    image,
  } = carData;

  let createdCar: CarDocument;

  try {
    createdCar = await Car.create({
      user,
      used,
      brand,
      series,
      year,
      color,
      metallicColor: metallicColor || false,
      mileage,
      transmissionType,
      fuelType,
      bodyType,
      engineDisplacement,
      enginePower,
      traction,
      paintChanged,
      eligibleForTrade,
      adDate,
      seller,
      price,
      currency,
      details,
      image,
    });
    await createdCar.save();
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => query failed => car-service",
    });
    throw new HttpError("Creating Car Failed", 500);
  }

  if (!createdCar) {
    httpErrorLogger.error({
      message: "created car returned null => car-service",
    });
    throw new HttpError("Creating Car Failed", 500);
  }

  return createdCar;
};

export const getAllCarsService = async (): Promise<CarDocument[]> => {
  let cars: CarDocument[] = [];
  try {
    cars = await Car.find({});
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + "query failed => car-service",
    });
    throw new HttpError("Could not find cars", 404);
  }
  if (!cars || cars.length === 0) {
    httpErrorLogger.error({
      message: "no cars found => car-service",
    });
    throw new HttpError("Could not find cars", 404);
  }

  return cars;
};

export const getCarByIdService = async (
  carId: string
): Promise<CarDocument> => {
  let car: CarDocument;
  try {
    car = (await Car.findById(carId)) as CarDocument;
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + "query failed => car-service",
    });
    throw new HttpError("Could not find car for this Id", 404);
  }
  if (!car) {
    httpErrorLogger.error({
      message: "no car found => car-service",
    });
    throw new HttpError("Could not find car for this Id", 404);
  }
  return car;
};

export const getCarsByUserService = async (
  userId: string
): Promise<CarDocument[]> => {
  let cars: CarDocument[] = [];
  try {
    cars = (await Car.find({ user: userId })) as CarDocument[];
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + "query failed => car-service",
    });
    throw new HttpError("Could not find car for this user", 404);
  }
  if (!cars || cars.length === 0) {
    throw new HttpError("Could not find car for this user", 404);
  }
  return cars;
};

export const getCarsBySearchService = async (
  rawSearchData: Partial<ICarFormInput>,
  page: number,
  limit: number
): Promise<{ cars: CarDocument[]; totalPages: Number }> => {
  let cars: CarDocument[] = [];
  let totalPages: Number = 0;

  let searchData = fillSearchDataHelper(rawSearchData);

  try {
    const totalItems = await Car.countDocuments({ ...searchData });
    totalPages = Math.ceil(totalItems / limit);
    cars = await Car.find({ ...searchData })
      .skip((page - 1) * limit)
      .limit(limit);
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => query failed => car-service",
    });
    throw new HttpError("Could not find cars for this search", 404);
  }
  return { cars, totalPages };
};

export const updateCarService = async (
  carId: string,
  userId: string,
  carData: ICar
): Promise<CarDocument> => {
  const {
    user,
    brand,
    series,
    used,
    year,
    color,
    metallicColor,
    mileage,
    transmissionType,
    fuelType,
    bodyType,
    engineDisplacement,
    enginePower,
    traction,
    paintChanged,
    eligibleForTrade,
    seller,
    price,
    currency,
    details,
  } = carData;

  let car: CarDocument;

  try {
    car = (await Car.findById(carId)) as CarDocument;
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => query failed => car-service",
    });
    throw new HttpError("Could not find car for this Id", 404);
  }
  if (!car) {
    httpErrorLogger.error({
      message: "Could not find car for this Id => car-service",
    });
    throw new HttpError("Could not find car for this Id", 404);
  }
  if (car.user.toString() !== userId) {
    httpErrorLogger.error({
      message: "User is not authorized to update this car => car-service",
    });
    throw new HttpError("You are not authorized to update this car", 401);
  }
  // const imagePath = car.image;
  // if (!!imagePath) {
  //   deleteImageHelper(imagePath);
  // }

  car.user = user;
  car.brand = brand;
  car.series = series;
  car.used = used;
  car.year = year;
  car.color = color;
  car.metallicColor = metallicColor;
  car.mileage = mileage;
  car.transmissionType = transmissionType;
  car.fuelType = fuelType;
  car.bodyType = bodyType;
  car.engineDisplacement = engineDisplacement;
  car.enginePower = enginePower;
  car.traction = traction;
  car.paintChanged = paintChanged;
  car.eligibleForTrade = eligibleForTrade;
  car.seller = seller;
  car.price = price;
  car.currency = currency;
  car.details = details;

  car = await car.save();
  return car;
};

export const deleteCarService = async (
  carId: string,
  userId: string
): Promise<void> => {
  let car: ICar;
  try {
    car = (await Car.findById(carId)) as CarDocument;
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => deleteCarService",
    });
    throw new HttpError("Query error", 404);
  }
  if (!car) {
    const error = new HttpError("Could not find car for this Id", 404);
    throw error;
  }
  if (car.user.toString() !== userId) {
    throw new HttpError("You are not authorized to delete this car", 401);
  }
  const imagePath = car.image;
  await Car.deleteOne({ _id: carId });
  if (!!imagePath) {
    deleteImageHelper(imagePath);
  }
};
