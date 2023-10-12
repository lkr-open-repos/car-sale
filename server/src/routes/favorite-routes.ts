import { Router } from "express";
import { checkAuthToken } from "../middleware";
import {
  createFavorite,
  getFavoritesByUser,
} from "../controllers/favorite-controller";

const router = Router();

router.use(checkAuthToken);

router.get("/", getFavoritesByUser);

router.post("/", createFavorite);

export default router;
