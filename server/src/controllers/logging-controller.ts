import { Request, Response, NextFunction } from "../types";

import { frontendLogger } from "../utils/";

export const createFrontendLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  frontendLogger.error({ message: req.body });
  next();
};
