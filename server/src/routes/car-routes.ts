import { Router } from "express";
import { checkAuthToken } from "../middleware";

import {
  createCar,
  getCarById,
  getAllCars,
  getCarsByUser,
  deleteCar,
  updateCar,
} from "../controllers";
import { createCarValidation } from "../validators";

const router = Router();

router.get("/", getAllCars);

router.get("/:cid", getCarById);

router.get("/user/:uid", getCarsByUser);

router.use(checkAuthToken);

router.post("/", createCarValidation, createCar);

router.patch("/:cid", createCarValidation, updateCar);

router.delete("/:cid", deleteCar);

export default router;
