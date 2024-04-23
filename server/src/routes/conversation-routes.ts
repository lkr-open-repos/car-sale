import { Router } from "express";
import {
  createConversation,
  getConversationsByUser,
  getConversationByUsers,
} from "../controllers";

const router = Router();

router.post("/", createConversation);

router.get("/:userId", getConversationsByUser);

router.get("/find/:firstUserId/:secondUserId", getConversationByUsers);

export default router;
