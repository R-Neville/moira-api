import { Request, Response, NextFunction } from "express";
import MoiraError from "./MoiraError";
import { respond, IMoiraResponse } from "../utils";
import { HttpStatus } from "../HttpStatus";
import logger from "../logger";

export default function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  logger.error(error);
  if (error instanceof MoiraError) {
    respond(res, {
      success: false,
      status: error.httpStatus,
      error: {
        title: error.title,
        detail: error.detail,
      },
    } as IMoiraResponse);
  } else {
    respond(res, {
      success: false,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: {
        title: "Internal Server Error",
        detail: "Sorry - something went wrong on our end",
      },
    } as IMoiraResponse);
  }
}
