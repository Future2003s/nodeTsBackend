"use strict";
import envConfig from "~/config/envConfig";
import { s3, PutObjectCommand, GetObjectCommand } from "~/config/s3.config";
import { ramdomImage } from "~/utils/utils";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
class UploadService {
    private static readonly imageNameRandom = ramdomImage();
    public static async uploadImageFromLocalS3({ file }: { file: any }) {
        console.log(file);
        const command = new PutObjectCommand({
            Bucket: envConfig.AWS_BUCKET_NAME,
            Key: this.imageNameRandom || "unknow",
            Body: file.buffer,
            ContentType: "image/jpeg"
        });

        //export url
        const signedUrl = new GetObjectCommand({
            Bucket: envConfig.AWS_BUCKET_NAME,
            Key: this.imageNameRandom || "unknow"
        });

        const url = await getSignedUrl(s3, signedUrl);

        const result = await s3.send(command);

        console.log(result);

        return "https://d3enplyig2yenj.cloudfront.net/" + this.imageNameRandom;
    }
}

export default UploadService;
