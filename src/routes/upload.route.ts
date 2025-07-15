"use strict";
import { Request, Response, Router } from "express";
import multer from "multer";
import { uploadMemory } from "~/config/multer.config";
import UploadController from "~/controllers/upload.controller";
import asyncHandller from "~/helpers/asyncHandller";
const uploadRouter: Router = Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB per file
    files: 10, // Maximum 10 files
    fieldSize: 2 * 1024 * 1024 // 2MB for text fields
  },
  fileFilter: (req, file, cb) => {
    // Optional: filter files
    console.log("File being processed:", file.originalname);
    cb(null, true);
  }
});

uploadRouter.post(
  "/product/bucket",
  uploadMemory.single("file"),
  asyncHandller(UploadController.uploadImageFromLocalS3)
);

// upload multifile
uploadRouter.post("/multiple", upload.array("files", 10), asyncHandller(UploadController.uploadMultipleFiles));
//singed url to download
// uploadRouter.get("/download/:key");
// delete file
// uploadRouter.delete("/file/:key");

export default uploadRouter;
