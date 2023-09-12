import { Router } from "express";
import { checkAuthToken } from "../middleware";
import { Request, Response, NextFunction } from "../types";

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

router.post(
  "/",
  // (req: Request, res: Response, next: NextFunction) => {
  //   console.log(req.body, "before multer body");
  //   next();
  // },
  fileUpload.single("image"),
  // (req: Request, res: Response, next: NextFunction) => {
  //   console.log("after multer body", req.body);
  //   next();
  // },
  createCarValidation,
  createCar
);

router.patch(
  "/:cid",
  fileUpload.single("image"),
  createCarValidation,
  updateCar
);

router.delete("/:cid", deleteCar);

export default router;
