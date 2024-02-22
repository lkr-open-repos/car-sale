import fs from "fs";
import { Request, Response, NextFunction } from "../types";
import { HttpError } from "../models";
import { httpErrorLogger } from "../utils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      // console.log(err);
    });
  }
  if (res.headersSent) {
    return next(err);
  }

  httpErrorLogger.error({
    message: err.message + " => error-middleware",
  });

  if (err instanceof HttpError) {
    res.status(err.code || 500);
    const errorResponse: { message: string; validationMessages?: {} } = {
      message: err.message || "An unknown error occurred!",
    };
    if (err.validationMessages) {
      errorResponse.validationMessages =
        err.validationMessages.validationMessages;
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
