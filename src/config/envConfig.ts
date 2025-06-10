"use strict";
import { config } from "dotenv";
import { z } from "zod";

config({
    path: ".env"
});

const configEnvProject = z.object({
    PORT: z.coerce.number(),
    YOUR_CLIENT_ID_PAY: z.string(),
    YOUR_API_KEY_PAY: z.string(),
    YOUR_CHECKSUM_KEY_PAY: z.string(),
    IS_PRODUCTION: z.enum(["false", "true"]).transform((val) => val === "true"),
    API_DOMAIN_URL: z.string()
});

const _configEnvProject = configEnvProject.safeParse(process.env);

if (!_configEnvProject.success) {
    console.log("Error format enviroment !!!!");
    throw new Error("Khai báo biến môi trường không hợp lệ");
}

const envConfig = _configEnvProject.data;

export const API_URL =
    envConfig.IS_PRODUCTION === true ? envConfig.API_DOMAIN_URL : `http://localhost:${envConfig.PORT}`;

export default envConfig;
