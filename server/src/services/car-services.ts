import { Car, HttpError } from "../models";
import { CarDocument, ICar } from "../types";
import { deleteImageHelper } from "../utils";

export const createCarService = async (carData: ICar): Promise<CarDocument> => {
  const {
    user,
    used,
    brand,
    type,
    series,
    model,
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
    currency,
    image,
  } = carData;
  let createdCar: CarDocument;

  createdCar = await Car.create({
    user,
    used,
    brand,
    type,
    series,
    model,
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
    currency,
    image,
  });
  await createdCar.save();

  return createdCar;
};

export const getAllCarsService = async (): Promise<CarDocument[]> => {
  let cars: CarDocument[] = [];
  cars = await Car.find({});
  if (!cars || cars.length === 0) {
    throw new HttpError("Could not find cars", 404);
  }

  return cars;
};

export const getCarByIdService = async (
  carId: string
): Promise<CarDocument> => {
  let car: CarDocument;
  car = (await Car.findById(carId)) as CarDocument;
  if (!car) {
    throw new HttpError("Could not find car for this id", 404);
  }
  return car;
};

export const getCarsByUserService = async (
  userId: string
): Promise<CarDocument[]> => {
  let cars: CarDocument[] = [];
  cars = (await Car.find({ user: userId })) as CarDocument[];
  if (!cars || cars.length === 0) {
    throw new HttpError("Could not find car for this id", 404);
  }
  return cars;
};

export const updateCarService = async (
  carId: string,
  userId: string,
  carData: ICar
): Promise<CarDocument> => {
  const {
    user,
    used,
    brand,
    type,
    series,
    model,
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
    currency,
    image,
  } = carData;

  let car: CarDocument;
  car = (await Car.findById(carId)) as CarDocument;
  if (!car) {
    throw new HttpError("Could not find car for this id", 404);
  }
  if (car.user.toString() !== userId) {
    throw new HttpError("You are not authorized to update this car", 401);
  }
  const imagePath = car.image;
  if (!!imagePath) {
    deleteImageHelper(imagePath);
  }

  car.user = user;
  car.used = used;
  car.brand = brand;
  car.type = type;
  car.series = series;
  car.model = model;
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
  car.adDate = adDate;
  car.seller = seller;
  car.price = price;
  car.currency = currency;
  car.image = image;

  car = await car.save();
  return car;
};

export const deleteCarService = async (
  carId: string,
  userId: string
): Promise<void> => {
  let car: ICar = (await Car.findById(carId)) as CarDocument;
  if (!car) {
    const error = new HttpError("Could not find car for this id", 404);
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
