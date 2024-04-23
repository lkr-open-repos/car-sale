import { body, ValidationChain } from "express-validator";

export const createCarValidation: ValidationChain[] = [
  body("user").trim().notEmpty().withMessage("User is required"),
  body("used")
    .trim()
    .notEmpty()
    .withMessage("Used information is required")
    .isIn(["New", "Used"]),
  body("brand").trim().notEmpty().withMessage("Brand is required"),
  body("series").trim().notEmpty().withMessage("Series is required"),
  body("year")
    .trim()
    .notEmpty()
    .withMessage("Year is required")
    .isInt()
    .withMessage("Year must be an integer"),
  body("color").trim().notEmpty().withMessage("Color is requered"),
  body("metallicColor").notEmpty(),
  body("mileage").trim().notEmpty().withMessage("Mileage is required"),
  body("transmissionType")
    .trim()
    .notEmpty()
    .withMessage("Transmission Type is required")
    .isIn(["Manual", "Automatic"])
    .withMessage("Invalid transmission type"),
  body("fuelType")
    .trim()
    .notEmpty()
    .withMessage("Fuel Type is required")
    .isIn(["Petrol", "Diesel", "Electric", "Hybrid"])
    .withMessage("Invalid fuel type"),
  body("bodyType").trim().notEmpty().withMessage("Body Type is required"),
  body("engineDisplacement")
    .trim()
    .notEmpty()
    .withMessage("Engine Displacement is required")
    .isNumeric()
    .withMessage("Engine Displacement must be a number"),
  body("enginePower")
    .trim()
    .notEmpty()
    .withMessage("Engine Power is required")
    .isNumeric()
    .withMessage("Engine Power must be a number"),
  body("traction")
    .trim()
    .notEmpty()
    .withMessage("Traction is required")
    .isIn(["2x4", "4x4"])
    .withMessage("Invalid traction"),
  body("paintChanged")
    .trim()
    .isBoolean()
    .withMessage("Paint Changed must be a boolean value")
    .toBoolean(),
  body("eligibleForTrade")
    .trim()
    .isBoolean()
    .withMessage("Eligible For Trade must be a boolean value")
    .toBoolean(),
  body("adDate").trim().notEmpty().withMessage("Ad Date is required"),
  body("seller")
    .trim()
    .notEmpty()
    .withMessage("Seller is required")
    .isIn(["Owner", "Gallery"])
    .withMessage("Invalid seller"),
  body("price").trim().notEmpty().withMessage("Price is required"),
  body("currency")
    .trim()
    .notEmpty()
    .withMessage("Currency is required")
    .isIn(["USD", "EUR", "TRY"])
    .withMessage("Invalid currency"),
];

export const updateCarValidation: ValidationChain[] = [
  body("user").trim().notEmpty().withMessage("User is required"),
  body("used")
    .trim()
    .notEmpty()
    .withMessage("Used information is required")
    .isIn(["New", "Used"]),
  body("brand").trim().notEmpty().withMessage("Brand is required"),
  body("series").trim().notEmpty().withMessage("Series is required"),
  body("year")
    .trim()
    .notEmpty()
    .withMessage("Year is required")
    .isInt()
    .withMessage("Year must be an integer"),
  body("color").trim().notEmpty().withMessage("Color is requered"),
  body("metallicColor").notEmpty(),
  body("mileage").trim().notEmpty().withMessage("Mileage is required"),
  body("transmissionType")
    .trim()
    .notEmpty()
    .withMessage("Transmission Type is required")
    .isIn(["Manual", "Automatic"])
    .withMessage("Invalid transmission type"),
  body("fuelType")
    .trim()
    .notEmpty()
    .withMessage("Fuel Type is required")
    .isIn(["Petrol", "Diesel", "Electric", "Hybrid"])
    .withMessage("Invalid fuel type"),
  body("bodyType").trim().notEmpty().withMessage("Body Type is required"),
  body("engineDisplacement")
    .trim()
    .notEmpty()
    .withMessage("Engine Displacement is required")
    .isNumeric()
    .withMessage("Engine Displacement must be a number"),
  body("enginePower")
    .trim()
    .notEmpty()
    .withMessage("Engine Power is required")
    .isNumeric()
    .withMessage("Engine Power must be a number"),
  body("traction")
    .trim()
    .notEmpty()
    .withMessage("Traction is required")
    .isIn(["2x4", "4x4"])
    .withMessage("Invalid traction"),
  body("paintChanged")
    .trim()
    .isBoolean()
    .withMessage("Paint Changed must be a boolean value")
    .toBoolean(),
  body("eligibleForTrade")
    .trim()
    .isBoolean()
    .withMessage("Eligible For Trade must be a boolean value")
    .toBoolean(),
  body("seller")
    .trim()
    .notEmpty()
    .withMessage("Seller is required")
    .isIn(["Owner", "Gallery"])
    .withMessage("Invalid seller"),
  body("price").trim().notEmpty().withMessage("Price is required"),
  body("currency")
    .trim()
    .notEmpty()
    .withMessage("Currency is required")
    .isIn(["USD", "EUR", "TRY"])
    .withMessage("Invalid currency"),
];
