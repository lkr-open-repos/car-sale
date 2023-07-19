import { body, ValidationChain } from "express-validator";

export const createCarValidation: ValidationChain[] = [
  body("used")
    .trim()
    .isBoolean()
    .withMessage("Used must be a boolean value")
    .toBoolean(),
  body("brand").trim().notEmpty().withMessage("Brand is required"),
  body("type")
    .trim()
    .notEmpty()
    .withMessage("Type is required")
    .isIn(["NEW", "USED"])
    .withMessage("Invalid type"),
  body("series").trim().notEmpty().withMessage("Series is required"),
  body("model").trim().notEmpty().withMessage("Model is required"),
  body("year")
    .trim()
    .notEmpty()
    .withMessage("Year is required")
    .isInt()
    .withMessage("Year must be an integer"),
  body("mileage").trim().notEmpty().withMessage("Mileage is required"),
  body("transmissionType")
    .trim()
    .notEmpty()
    .withMessage("Transmission Type is required")
    .isIn(["MANUAL", "AUTOMATIC"])
    .withMessage("Invalid transmission type"),
  body("fuelType")
    .trim()
    .notEmpty()
    .withMessage("Fuel Type is required")
    .isIn(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"])
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
  body("Traction")
    .trim()
    .notEmpty()
    .withMessage("Traction is required")
    .isIn(["AUTOMATIC", "MANUAL"])
    .withMessage("Invalid traction"),
  body("fuelTankCapacity")
    .trim()
    .notEmpty()
    .withMessage("Fuel Tank Capacity is required")
    .isNumeric()
    .withMessage("Fuel Tank Capacity must be a number"),
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
    .isIn(["OWNER", "GALLERY"])
    .withMessage("Invalid seller"),
  body("price").trim().notEmpty().withMessage("Price is required"),
  body("currency")
    .trim()
    .notEmpty()
    .withMessage("Currency is required")
    .isIn(["USD", "EUR", "TRY"])
    .withMessage("Invalid currency"),
];
