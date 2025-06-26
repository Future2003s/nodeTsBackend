"use strict";
import { Response } from "express";

class SuccessResponse<T> {
    private readonly statusCode: number;
    private readonly message: string;
    private readonly metaData: T;
    constructor(statusCode: number, message: string, metaData: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.metaData = metaData;
    }

    public send(res: Response) {
        return res.status(this.statusCode).json(this);
    }
}

export default SuccessResponse;
