import { Request, Response, NextFunction } from "../types";
import { HttpError } from "../models";
import jwt from "jsonwebtoken";
import { IToken } from "../types";

export const checkAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("You are not logged in.");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as IToken;
    req.user = { Id: decodedToken.userId };
    next();
  } catch {
    const error = new HttpError("You are not logged in.", 401);
    return next(error);
  }
};
