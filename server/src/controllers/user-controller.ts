import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "../types";

import { User } from "../models";
import { UserDocument } from "../types";
import { throwErrorHelper, validationHelper } from "../utils";
import {
  signUpService,
  signInService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services";

/**
 * Create a user based on the request body, validate it, create the user in the database, generate a token and return the created user with the token in the response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} Promise that resolves when the user is created and the response is sent
 * */
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

/**
 * Sign in a user based on the request body, validate it, generate a token and return the user with the token in the response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} Promise that resolves when the user is created and the response is sent
 * */
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

/**
 * Retrieve all users and send the user data as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 *
 * @return {Promise<void>} Promise that resolves when the user is created and the response is sent
 * */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let users: UserDocument[];
  try {
    users = await getAllUsersService();
  } catch (err) {
    return next(throwErrorHelper(err));
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

/**
 * Retrieve a user byu ID and send the user data as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} Promise that resolves when the user is created and the response is sent
 * */
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

/**
 * Update a user and send the updated users name and Updated message as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} Promise that resolves when the user is created and the response is sent
 * */
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

/**
 * Delete a user and send a message as response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next function
 * @return {Promise<void>} Promise that resolves when the user is created and the response is sent
 * */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.params.uid;
  let user: UserDocument;
  try {
    await deleteUserService(userId);
  } catch (err) {
    return next(throwErrorHelper(err));
  }
};
