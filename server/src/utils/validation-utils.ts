import { Request, Response, NextFunction } from "../types";
import { HttpError } from "../models";
import { Result } from "express-validator";

export const validationHelper = (errors: Result, next: NextFunction) => {
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422, {
      validationMessages: errors.array(),
    });
    return next(error);
  }
};
