import { Request, Response, NextFunction } from "express";
import { HttpError } from "../models";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    res.status(err.code || 500);
    const errorResponse: { message: string; validationMessages?: {} } = {
      message: err.message || "An unknown error occurred!",
    };
    if (err.validationMessages) {
      errorResponse.validationMessages = err.validationMessages;
    }
    res.json(errorResponse);
  } else {
    res.status(500);
    res.json({ message: "An unknown error occurred!" });
  }
};

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
};
