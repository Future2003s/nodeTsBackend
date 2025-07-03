"use strict";
import { Request, Response, NextFunction } from "express";

export function checkAuthPermission(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if(!token) {
    a
  }
}
