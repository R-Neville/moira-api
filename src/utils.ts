import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "./HttpStatus";
import MoiraError from "./exceptions/MoiraError";

export interface IError {
  title: string;
  detail: string;
}

export interface IMoiraResponse {
  success: boolean;
  status: HttpStatus;
  error?: IError;
  data: any;
}

export function respond(res: Response, payload: IMoiraResponse) {
  res.status(payload.status).json(payload);
}
