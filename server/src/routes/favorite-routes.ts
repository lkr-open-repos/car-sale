import { Router } from "express";
import { checkAuthToken } from "../middleware";
import {
  createFavorite,
  getCarsByFavorites,
  getFavoritesByUser,
  deleteFavorite,
} from "../controllers/";

const router = Router();

router.use(checkAuthToken);

router.get("/", getFavoritesByUser);

router.post("/", createFavorite);

router.post("/cars", getCarsByFavorites);

router.delete("/:favoriteId", deleteFavorite);

export default router;
