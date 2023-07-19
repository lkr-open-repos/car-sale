import { Router } from "express";
import { Response, Request, NextFunction } from "express";

import { createCar } from "../controllers";
import { createCarValidation } from "../validators/car-validator";

const router = Router();

router.post("/", createCarValidation, createCar);

router.get("/", (res: Response, Req: Request) => {
  console.log("hello");
  res.status(401);
});

router.patch("/:id");

router.delete("/:id");

export default router;
