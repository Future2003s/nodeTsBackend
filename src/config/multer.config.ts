"use strict";
import multer from "multer";

const uploadMemory = multer({
    storage: multer.memoryStorage()
});

const uploadDisk = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "/tmp/my-uploads");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + "-" + uniqueSuffix);
        }
    })
});

export { uploadMemory, uploadDisk };
