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
import { fileUpload } from "../middleware";

const router = Router();

router.get("/", getAllCars);

router.get("/:cid", getCarById);

router.get("/user/:uid", getCarsByUser);

router.use(checkAuthToken);

router.post("/", fileUpload.single("image"), createCarValidation, createCar);

router.patch(
  "/:cid",
  fileUpload.single("image"),
  createCarValidation,
  updateCar
);

router.delete("/:cid", deleteCar);

export default router;