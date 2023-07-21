import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

import { User } from "../models";
import { UserDocument } from "../types";
import { HttpError } from "../models";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422, {
      validationMessages: errors.array(),
    });
    return next(error);
  }

  let existingUser: UserDocument;
  try {
    existingUser = (await User.findOne({
      email: req.body.email,
    })) as UserDocument;
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again.", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError("User already exists", 422);
    return next(error);
  }

  const createdUser = new User(req.body) as UserDocument;
  try {
    await createdUser.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError("Signup failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.name });
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422, {
      validationMessages: errors.array(),
    });
    return next(error);
  }

  let user: UserDocument;
  try {
    user = (await User.findOne({
      email: req.body.email,
    })) as UserDocument;

    if (!user) {
      const error = new HttpError("Invalid credentials", 401);
      return next(error);
    }
    if (!(req.body.email === user.email)) {
      const error = new HttpError("Invalid credentials", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Signin failed, please try again.", 500);
    return next(error);
  }

  res.json({ message: "logged in!", user: user.name });
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let users: UserDocument[];
  try {
    users = await User.find({}, "-password");
    if (!users || users.length < 1) {
      const error = new HttpError("Could not find users", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError(
      "Fatching users failed, please try again.",
      500
    );
    return next(error);
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
    user = (await User.findById(userId, "-password")) as UserDocument;
    if (!user) {
      const error = new HttpError("Could not find user for this id", 401);
      return next(error);
    }
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  res.json({ user: user.toObject({ getters: true }) });
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError("Invalid input", 422, {
      validationMessages: errors.array(),
    });
    return next(error);
  }
  const userId = req.params.uid;
  let user: UserDocument;
  try {
    user = (await User.findById(userId)) as UserDocument;
    if (!user) {
      const error = new HttpError("Could not find user for this id", 401);
      return next(error);
    }
    user.set(req.body);
    await user.save();
  } catch {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
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
    user = (await User.findById(userId)) as UserDocument;
    if (!user) {
      const error = new HttpError("Could not find user for this id", 404);
      return next(error);
    }
    await user.deleteOne({ _id: userId });
  } catch (err) {
    const error = new HttpError("Something went wrong", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted user." });
};
