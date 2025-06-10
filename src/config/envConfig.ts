"use strict";
import "dotenv/config";
import { z } from "zod";

const configEnvProject = z.object({
    port: z.number(),
    YOUR_CLIENT_ID_PAY: z.string(),
    YOUR_API_KEY_PAY: z.string(),
    YOUR_CHECKSUM_KEY_PAY: z.string()
});

const _configEnvProject = configEnvProject.safeParse({
    port: process.env.port,
    YOUR_CLIENT_ID_PAY: process.env.YOUR_CLIENT_ID_PAY,
    YOUR_API_KEY_PAY: process.env.YOUR_API_KEY_PAY,
    YOUR_CHECKSUM_KEY_PAY: process.env.YOUR_CHECKSUM_KEY_PAY
});

if (!_configEnvProject.success) {
    console.log("Error format enviroment !!!! ASD N NDFYHM, GH F");
    throw new Error("Khai báo biến môi trường không hợp lệ");
}

const envConfig = _configEnvProject.data;

export default envConfig;
