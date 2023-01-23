import { Request, Response, NextFunction } from "express";
import MoiraError from "./MoiraError";
import logger from "../logger";

export default function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const error = new MoiraError({
    title: "Not Found",
    detail: `No resource could be found at ${req.method} ${req.originalUrl}`,
    httpStatus: 404,
  });
  logger.error(error);
  next(error);
}
