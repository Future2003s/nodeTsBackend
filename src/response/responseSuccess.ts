import { Response } from "express";

interface SuccessResponse {
    statusCode: number;
    message: string;
    data?: any;
}
