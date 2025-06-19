"use strict";
import { Request, Response } from "express";
import SuccessResponse from "~/response/success.response";
import { UserTypeModel, userValidation } from "~/schema/auth.schema";
import AccessService from "~/services/access.service";

class AccessController {
    public static async register(req: Request, res: Response) {
        const userRequest: UserTypeModel = userValidation.parse(req.body);
        new SuccessResponse(200, "Register SuccessFully", await AccessService.register(userRequest)).send(res);
    }

    public static async login(req: Request, res: Response) {
        new SuccessResponse(200, "OK", await AccessService.login(req.body)).send(res);
    }
}

export default AccessController;
