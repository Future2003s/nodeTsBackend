"use strict";
import { Request, Response, NextFunction } from "express";
import ErrorResponse from "~/response/error.response";
import JWT from "jsonwebtoken";
import keyTokenModel from "~/model/keyToken.model";

interface CustomRequest extends Request {
  headers: {
    "x-client_id": string;
    authorization: string;
  };
}

const verifyToken = async (token: string, key: string) => {
  const result = await JWT.verify(token, key);

  return result;
};

export async function checkAuthPermission(req: CustomRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  const client_id = req.headers["x-client_id"];

  if (!token) {
    throw new ErrorResponse(403, "Không Có Token");
  }

  const keyPublicAndPrivateKey = await keyTokenModel.findOne({
    access_token: token
  });

  const result = verifyToken(token, client_id);

  if (!result) {
    throw new ErrorResponse(400, "Token Khong Chinh Xac");
  }

  console.log(token);

  next();
}
