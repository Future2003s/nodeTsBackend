"use strict";
import envConfig from "~/config/envConfig";
import { s3, PutObjectCommand, GetObjectCommand } from "~/config/s3.config";
import { ramdomImage } from "~/utils/utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";

interface UploadFileParams {
  file: any;
  folder?: string;
  fileName?: string;
  contentType?: string;
}

interface UploadResult {
  url: string;
  key: string | undefined;
  bucket: string;
}

class UploadService {
  private static readonly CLOUDFRONT_URL = "https://d3enplyig2yenj.cloudfront.net/";

  // Hàm upload image hiện tại (đã cải thiện)
  public static async uploadImageFromLocalS3({ file }: { file: any }): Promise<string> {
    const imageNameRandom = ramdomImage();
    console.log(file);

    const command = new PutObjectCommand({
      Bucket: envConfig.AWS_BUCKET_NAME,
      Key: imageNameRandom || "unknow",
      Body: file.buffer,
      ContentType: "image/jpeg"
    });

    const result = await s3.send(command);
    console.log(result);

    return this.CLOUDFRONT_URL + imageNameRandom;
  }

  // Hàm upload file tổng quát
  public static async uploadFile({
    file,
    folder = "",
    fileName,
    contentType
  }: UploadFileParams): Promise<UploadResult> {
    try {
      // Tạo tên file nếu không được cung cấp
      //   console.log(this.generateFileName(file.originalname || file.name));
      const finalFileName = fileName;

      // Tạo key với folder (nếu có)
      const key = folder ? `${folder}/${finalFileName}` : finalFileName;

      // Xác định content type
      const finalContentType = contentType || file.mimetype;

      const command = new PutObjectCommand({
        Bucket: envConfig.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: finalContentType
      });

      const result = await s3.send(command);
      console.log("Upload result:", result);

      return {
        url: this.CLOUDFRONT_URL + key,
        key: key,
        bucket: envConfig.AWS_BUCKET_NAME
      };
    } catch (error: any) {
      console.error("Error uploading file:", error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  // Hàm upload multiple files
  public static async uploadMultipleFiles({
    files,
    folder = ""
  }: {
    files: any[];
    folder?: string;
  }): Promise<UploadResult[]> {
    if (!files || !Array.isArray(files) || files.length === 0) {
      throw new Error("Invalid files array provided");
    }
    console.log(`Starting upload of ${files.length} files to folder: ${folder}`);
    try {
      const results: UploadResult[] = [];
      for (const file of files) {
        console.log(`Uploading file: ${file.originalname}`);
        const result = await this.uploadFile({ file, folder });
        results.push(result);
      }
      return results;
    } catch (error: any) {
      console.error("Error uploading multiple files:", error);
      throw new Error(`Failed to upload multiple files: ${error.message}`);
    }
  }

  // Hàm tạo signed URL để download file
  public static async getSignedDownloadUrl(key: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: envConfig.AWS_BUCKET_NAME,
        Key: key
      });

      const signedUrl = await getSignedUrl(s3, command, { expiresIn });
      return signedUrl;
    } catch (error: any) {
      console.error("Error generating signed URL:", error);
      throw new Error(`Failed to generate signed URL: ${error.message}`);
    }
  }

  // Hàm delete file
  public static async deleteFile(key: string): Promise<boolean> {
    try {
      const { DeleteObjectCommand } = await import("@aws-sdk/client-s3");
      const command = new DeleteObjectCommand({
        Bucket: envConfig.AWS_BUCKET_NAME,
        Key: key
      });

      await s3.send(command);
      console.log(`File deleted successfully: ${key}`);
      return true;
    } catch (error: any) {
      console.error("Error deleting file:", error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  // Utility functions
  private static generateFileName(originalName: string): string {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const extension = path.extname(originalName);
    const nameWithoutExt = path.basename(originalName, extension);

    return `${nameWithoutExt}-${timestamp}-${randomString}${extension}`;
  }

  private static getContentType(fileName: string): string {
    const extension = path.extname(fileName).toLowerCase();
    const mimeTypes: { [key: string]: string } = {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".pdf": "application/pdf",
      ".doc": "application/msword",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".txt": "text/plain",
      ".csv": "text/csv",
      ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ".zip": "application/zip",
      ".mp4": "video/mp4",
      ".mp3": "audio/mpeg"
    };

    return mimeTypes[extension] || "application/octet-stream";
  }

  // Hàm validate file
  public static validateFile(
    file: any,
    options: {
      maxSize?: number; // bytes
      allowedTypes?: string[];
      allowedExtensions?: string[];
    } = {}
  ): { isValid: boolean; error?: string } {
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [], allowedExtensions = [] } = options;

    // Check file size
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `File size exceeds maximum limit of ${maxSize / (1024 * 1024)}MB`
      };
    }

    // Check file type
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.mimetype)) {
      return {
        isValid: false,
        error: `File type ${file.mimetype} is not allowed`
      };
    }

    // Check file extension
    if (allowedExtensions.length > 0) {
      const extension = path.extname(file.originalname || file.name).toLowerCase();
      if (!allowedExtensions.includes(extension)) {
        return {
          isValid: false,
          error: `File extension ${extension} is not allowed`
        };
      }
    }

    return { isValid: true };
  }
}

export default UploadService;
