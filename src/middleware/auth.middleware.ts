"use strict";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "~/response/error.response";

export function checkAuthPermission(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    throw new ErrorResponse(403, "Không Có Token");
  }

  next();
}
