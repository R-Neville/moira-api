import { Request, Response, NextFunction } from "express";
import MoiraError from "./MoiraError";

export default function notFoundHandler(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  next(
    new MoiraError({
      title: "Not Found",
      detail: `No resource could be found at ${req.method} ${req.originalUrl}`,
      httpStatus: 404,
    })
  );
}
