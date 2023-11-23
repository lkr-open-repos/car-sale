import { Router } from "express";
import { checkAuthToken } from "../middleware";
import {
  createFavorite,
  getCarsByFavorites,
  getFavoritesByUser,
} from "../controllers/index";

import { Request, Response, NextFunction } from "../types";

const router = Router();

router.use(checkAuthToken);

router.get("/", getFavoritesByUser);

router.post("/", createFavorite);

router.post("/cars", getCarsByFavorites);

export default router;
