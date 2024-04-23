import { HttpError } from "../models";

/**
 * Helper function for throwing an error.
 *
 * @param {any} error - the error object
 * @param {string} message - the error message
 * @return {HttpError} the error object
 * */
export const throwErrorHelper = (error: any, message?: string): HttpError => {
  if (error instanceof HttpError) {
    return error;
  }
  return new HttpError(message ? message : "Something went wrong", 500);
};
