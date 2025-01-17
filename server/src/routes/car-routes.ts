import { Router } from "express";
import { checkAuthToken } from "../middleware";

import {
  createCar,
  getCarById,
  getAllCars,
  getCarsByUser,
  deleteCar,
  updateCar,
  getCarsBySearch,
} from "../controllers";
import { createCarValidation } from "../validators";
import { fileUpload, resizeImage } from "../middleware";
import { updateCarValidation } from "../validators/car-validator";

const router = Router();

router.get("/", getAllCars);

router.post("/search", getCarsBySearch);

router.get("/:cid", getCarById);

router.get("/user/:uid", getCarsByUser);

router.use(checkAuthToken);

router.post("/", fileUpload.single("image"), resizeImage,createCarValidation, createCar);

router.patch(
  "/:cid",
  fileUpload.single("image"),
  updateCarValidation,
  updateCar
);

router.delete("/:cid", deleteCar);

export default router;
