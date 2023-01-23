import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { IMoiraResponse, respond } from "../utils";
import logger from "../logger";

export default function makeSchemaValidator(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      logger.error(error);
      const { details } = error;
      const message = details.map((item) => item.message).join(",");
      respond(res, {
        success: false,
        status: 422,
        error: {
          title: "Unprocessable entity",
          detail: message,
        },
      } as IMoiraResponse);
    } else {
      next();
    }
  };
}
