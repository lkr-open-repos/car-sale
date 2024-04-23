import { Router } from "express";

import { signUpValidation, signInValidation } from "../validators";

import {
  signUp,
  signIn,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers";

const router = Router();

router.post("/signup", signUpValidation, signUp);

router.post("/signin", signInValidation, signIn);

router.get("/", getAllUsers);

router.get("/:uid", getUserById);

router.patch("/:uid", signUpValidation, updateUser);

router.delete("/:uid", deleteUser);

export default router;
