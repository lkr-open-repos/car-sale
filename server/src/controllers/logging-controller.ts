import { Request, Response, NextFunction } from "../types";

import { frontendLogger } from "../utils/";

/**
 * Recieve the frontend errors and create logs. If done, send them as a JSON response.
 *
 * @param {Request} req - the request object
 * @param {Response} res - the response object
 * @param {NextFunction} next - the next middleware function
 * @return {Promise<void>} a promise that resolves when the JSON response is sent
 * */
export const createFrontendLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  frontendLogger.error({ message: req.body });
  next();
};
