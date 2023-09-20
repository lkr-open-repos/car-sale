import { Car, HttpError } from "../models";
import { CarDocument, ICar } from "../types";
import { deleteImageHelper, fillSearchDataHelper } from "../utils";
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

  createdCar = await Car.create({
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
    currency,
    details,
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

export const getCarsBySearchService = async (
  rawSearchData: Partial<ICarFormInput>,
  page: number,
  limit: number
): Promise<{ cars: CarDocument[]; totalPages: Number }> => {
  let cars: CarDocument[] = [];
  let totalPages: Number = 0;
  let searchData: Partial<ICar> = fillSearchDataHelper(rawSearchData);

  try {
    const totalItems = await Car.countDocuments();
    totalPages = Math.ceil(totalItems / limit);
    cars = await Car.find({ ...searchData })
      .skip((page - 1) * limit)
      .limit(limit);
  } catch (err) {
    console.log(err);
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
    used,
    brand,
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
    details,
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
  car.details = details;

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
