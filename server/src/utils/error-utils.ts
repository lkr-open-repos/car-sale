import { HttpError } from "../models";

export const throwErrorHelper = (error: any, message?: string): HttpError => {
  if (error instanceof HttpError) {
    return error;
  }
  return new HttpError(message ? message : "Something went wrong", 500);
};
