"use strict";
import { Response } from "express";

class SuccessResponse<T> {
    private readonly statusCode: number;
    private readonly message: string;
    private readonly data: T;
    constructor(statusCode: number, message: string, data: T) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
    public send(res: Response) {
        return res.status(this.statusCode).json(this);
    }
}

export default SuccessResponse;
