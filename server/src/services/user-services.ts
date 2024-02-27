import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { httpErrorLogger } from "../utils";

import { User } from "../models";
import { IUser, UserDocument } from "../types";
import { HttpError } from "../models";
import { throwErrorHelper } from "../utils";

export const signUpService = async (
  userData: IUser
): Promise<{ user: UserDocument; token: string }> => {
  const { name, email, password } = userData;
  let createdUser: UserDocument;
  try {
    let existingUser: UserDocument | null = (await User.findOne({
      email,
    })) as UserDocument;
    if (existingUser) {
      httpErrorLogger.error({
        message: `User already exists => user-service`,
      });
      throw new HttpError("User already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    createdUser = new User({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
    });
    await createdUser.save();
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => sign up failed => user-service",
    });
    throw throwErrorHelper(err, "Sign up failed, please try again.");
  }
  let token: string;
  try {
    token = jwt.sign(
      { userId: createdUser!.id, email: createdUser!.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7 days" }
    );
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => Auto sign in failed => user-service",
    });
    throw throwErrorHelper(
      err,
      "Auto sign-in failed. Please sign in manually."
    );
  }
  return { user: createdUser!, token };
};

export const signInService = async (
  userData: IUser
): Promise<{ user: UserDocument; token: string }> => {
  let user: UserDocument;
  const { email, password } = userData;
  let token: string;
  try {
    user = (await User.findOne({
      email: email,
    })) as UserDocument;

    if (!user) {
      httpErrorLogger.error({
        message: `Attempt with invalid credentials => user-service`,
      });
      throw new HttpError("Invalid credentials", 403);
    }

    let isValidPassword = await bcrypt.compare(password, user!.password);

    if (!isValidPassword) {
      httpErrorLogger.error({
        message: `Attempt with invalid credentials => user-service`,
      });
      throw new HttpError("Invalid credentials", 403);
    }

    token = jwt.sign(
      { userId: user!.id, email: user!.email },
      process.env.JWT_SECRET!,
      { expiresIn: "7 days" }
    );
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => signin failed => user-service",
    });
    throw throwErrorHelper(err, "Signin failed, please try again.");
  }

  return { user, token };
};

export const getAllUsersService = async (): Promise<UserDocument[]> => {
  let users: UserDocument[] = [];
  users = (await User.find({}, "-password")) as UserDocument[];
  if (!users || users.length === 0) {
    httpErrorLogger.error({
      message: `Could not get users => user-service`,
    });
    const error = new HttpError("Could not find users", 404);
    throw error;
  }
  return users;
};

export const getUserByIdService = async (
  userId: string
): Promise<UserDocument> => {
  let user: UserDocument | null;
  user = (await User.findById(userId, "-password")) as UserDocument | null;
  if (!user) {
    httpErrorLogger.error({
      message: `Could not find user for this id => user-service`,
    });
    const error = new HttpError("Could not find user for this id", 404);
    throw error;
  }
  return user;
};

export const updateUserService = async (
  userId: string,
  userData: IUser
): Promise<UserDocument> => {
  const { name, email, password } = userData;
  let user: UserDocument;
  user = (await User.findById(userId)) as UserDocument;
  if (!user) {
    httpErrorLogger.error({
      message: `Could not find user for this id => user-service`,
    });
    throw new HttpError("Could not find user for this id", 404);
  }
  if (user.id.toString() !== userId) {
    httpErrorLogger.error({
      message: `You are not authorized to update this user => user-service`,
    });
    throw new HttpError("You are not authorized to update this user", 401);
  }
  user!.name = name;
  user!.email = email;
  try {
    if (password) {
      user!.password = await bcrypt.hash(password, 12);
    }
    await user.save();
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => update failed => user-service",
    });
    throw throwErrorHelper(err, "Update failed, please try again.");
  }
  return user;
};

export const deleteUserService = async (userId: string): Promise<void> => {
  let user: UserDocument | null;
  user = (await User.findById(userId)) as UserDocument | null;
  if (!user) {
    httpErrorLogger.error({
      message: `Could not find user for this id => user-service`,
    });
    throw new HttpError("Could not find user for this id", 404);
  }
  if (user!.id.toString() !== userId) {
    httpErrorLogger.error({
      message: `You are not authorized to delete this user => user-service`,
    });
    throw new HttpError("You are not authorized to delete this user", 401);
  }
  try {
    await user!.deleteOne({ _id: userId });
  } catch (err: any) {
    httpErrorLogger.error({
      message: err.message + " => delete failed => user-service",
    });
    throw throwErrorHelper(err, "Delete failed, please try again");
  }
};
