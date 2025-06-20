import { Response } from "express";
import SuccessResponse from "~/response/success.response";

export async function RequestData({
    statusCode,
    serviceLayer,
    res,
    message
}: {
    statusCode: number;
    serviceLayer: any;
    res: Response;
    message: string;
}) {
    try {
        new SuccessResponse(statusCode, message, await serviceLayer).send(res);
    } catch (error) {}
}
