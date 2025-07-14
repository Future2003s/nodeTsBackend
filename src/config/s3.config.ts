"use strict";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import envConfig from "./envConfig";

const s3Config = {
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: envConfig.AWS_BUCKET_ACCESSKEY,
    secretAccessKey: envConfig.AWS_SECRET_KEY
  }
};

const s3 = new S3Client(s3Config);

export { s3, PutObjectCommand, GetObjectCommand };
