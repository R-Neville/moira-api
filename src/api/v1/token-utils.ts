import { NextFunction, Request } from "express";
import { verify } from "jsonwebtoken";
import MoiraError from "../../exceptions/MoiraError";

export interface JwtDecoded {
  id: number;
  email: string;
  username: string;
  iat: number;
}

export interface TokenUserInfo {
  id: number;
  email: string;
  username: string;
}

export function decodeToken(token: string, secret: string) {
  const decoded = verify(token, secret) as JwtDecoded;
  return {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
  } as TokenUserInfo;
}

export function getTokenFromRequest(req: Request): string | null {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  return token ? token : null;
}

export function processToken(req: Request, next: NextFunction) {
  const token = getTokenFromRequest(req);

  if (!token) {
    next(
      new MoiraError({
        title: "Unauthorized",
        detail: "Authentication required",
        httpStatus: 403,
      })
    );
  }

  return decodeToken(token!, process.env.JWT_SECRET!);
}
