"use strict";
import { Request, Response } from "express";
import ErrorResponse from "~/response/error.response";
import SuccessResponse from "~/response/success.response";
import UploadService from "~/services/upload.service";

interface IRequest extends Request {
    file: any;
}

class UploadController {
    public static async uploadImageFromLocalS3(req: IRequest, res: Response) {
        const { file } = req;
        if (!file) {
            throw new ErrorResponse(400, "File Missing !!!!");
        }

        new SuccessResponse(
            200,
            "upload service successfully",
            await UploadService.uploadImageFromLocalS3({ file })
        ).send(res);
    }
}

export default UploadController;
