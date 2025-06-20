"use strict";
import { Application, NextFunction, Request, Response } from "express";

function ExceptionError(app: Application) {
    app.use((req: Request, res: Response, next: NextFunction) => {
        const error: ErrorResponse = new Error("Not Found");
        const statusCode: number = 404;
        error.statusCode = statusCode;
        next(error);
    });
    app.use((error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
        res.status(error.statusCode || 500).json({
            code: error.statusCode,
            message: error.message || "Internal Server"
        });
    });
}

export default ExceptionError;
