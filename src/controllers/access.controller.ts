"use strict";
import { Request, Response } from "express";
import SuccessResponse from "~/response/success.response";
import AccessService from "~/services/access.service";

class AccessController {
    public static async register(req: Request, res: Response) {
        new SuccessResponse(201, "Register SuccessFully", await AccessService.register(req.body)).send(res);
    }

    public static async login(req: Request, res: Response) {
        new SuccessResponse(200, "OK", await AccessService.login(req.body)).send(res);
    }
}

export default AccessController;
