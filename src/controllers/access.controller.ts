"use strict";
import { NextFunction, Request, Response } from "express";
import SuccessResponse from "~/response/success.response";
import AccessService from "~/services/access.service";

class AccessController {
    public static async login(req: Request, res: Response, next: NextFunction) {
        new SuccessResponse(200, "OK", await AccessService.login(req.body)).send(res);
    }
}

export default AccessController;
