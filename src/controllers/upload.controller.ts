"use strict";
import { Request, Response } from "express";
import ErrorResponse from "~/response/error.response";
import SuccessResponse from "~/response/success.response";
import UploadService from "~/services/upload.service";
import { ApiResponse } from "~/utils/ApiResponse";

interface IRequest extends Request {
  file: any;
}

class UploadController {
  public static async uploadImageFromLocalS3(req: IRequest, res: Response) {
    const { file } = req;
    if (!file) {
      throw new ErrorResponse(400, "File Missing !!!!");
    }

    new SuccessResponse(200, "upload service successfully", await UploadService.uploadImageFromLocalS3({ file })).send(
      res
    );
  }

  public static uploadMultipleFiles = async (req: Request, res: Response) => {
    console.log("Request files:", req.files); // Debug log
    console.log("Request body:", req.body); // Debug log
    if (!req.files) {
      throw new ErrorResponse(400, "No files field found in request");
    }
    if (!Array.isArray(req.files)) {
      throw new ErrorResponse(400, "Files must be an array");
    }
    if (req.files.length === 0) {
      throw new ErrorResponse(400, "No files provided in the array");
    }
    const { folder } = req.body;
    try {
      const results = await UploadService.uploadMultipleFiles({
        files: req.files,
        folder
      });
      res.status(200).json(new ApiResponse(200, results, "Files uploaded successfully"));
    } catch (error: any) {
      console.error("Upload error:", error);
      throw new ErrorResponse(500, `Upload failed: ${error.message}`);
    }
  };
}

export default UploadController;
