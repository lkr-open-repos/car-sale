import { Router } from "express";
import { createMessage, getMessagesByConversation } from "../controllers";

const router = Router();

router.post("/", createMessage);

router.get("/:conversationId", getMessagesByConversation);

export default router;
