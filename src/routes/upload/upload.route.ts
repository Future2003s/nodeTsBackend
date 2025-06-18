"use strict";
import { Router } from "express";
import { uploadMemory } from "~/config/multer.config";
import ProductController from "~/controllers/product/product.controller";
import UploadController from "~/controllers/upload/upload.controller";
import asyncHandller from "~/helpers/asyncHandller";
const uploadRouter: Router = Router();

uploadRouter.post(
    "/product/bucket",
    uploadMemory.single("file"),
    asyncHandller(UploadController.uploadImageFromLocalS3)
);

export default uploadRouter;
