import { Request, Response, NextFunction } from "../types";
import { HttpError } from "../models";
import { Result } from "express-validator";

/**
 * Helper function for validating the request body.
 *
 * @param {Result} errors - the validation errors
 * @param {NextFunction} next - the next middleware function
 * @return {HttpError} the error object
 * */
export const validationHelper = (errors: Result, next: NextFunction) => {
  if (!errors.isEmpty()) {
    return new HttpError("Invalid input", 422, {
      validationMessages: errors.array(),
    });
  }
};
