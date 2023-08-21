import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "../types";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models";
import { UserDocument } from "../types";
import { HttpError } from "../models";
import { throwErrorHelper, validationHelper } from "../utils";
import {
  signUpService,
  signInService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  validationHelper(validationResult(req), next);

  let signUpData: { user: UserDocument; token: string };

  try {
    signUpData = await signUpService(req.body);
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.status(201).json({
    user: { id: signUpData.user.id, email: signUpData.user.email },
    token: signUpData.token,
  });
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  validationHelper(validationResult(req), next);

  let signInData: { user: UserDocument; token: string };
  try {
    signInData = await signInService(req.body);
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.json({
    user: { id: signInData.user.id, email: signInData.user.email },
    token: signInData.token,
  });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let users: UserDocument[];
  try {
    users = await getAllUsersService();
  } catch (err) {
    return next(throwErrorHelper(err));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.uid;
  let user: UserDocument;
  try {
    user = await getUserByIdService(userId);
  } catch (err) {
    return next(throwErrorHelper(err));
  }

  res.json({ user: user.toObject({ getters: true }) });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  validationHelper(validationResult(req), next);
  const userId = req.params.uid;
  let user: UserDocument;
  try {
    user = await updateUserService(userId, req.body);
  } catch (err) {
    return next(throwErrorHelper(err, "Something went wrong"));
  }
  res.status(201).json({ message: "Updated!", user: user.name });
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;
  let user: UserDocument;
  try {
    await deleteUserService(userId);
  } catch (err) {
    return next(throwErrorHelper(err));
  }
};
