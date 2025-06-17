"use strict";
class ErrorResponse extends Error {
    private readonly statusCode: number;
    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ErrorResponse;
