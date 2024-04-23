import { Router } from "express";

import { createFrontendLogs } from "../controllers/";

const router = Router();

router.post("/frontendlogs", createFrontendLogs);

export default router;
