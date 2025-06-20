import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

export function validateRequestModel(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                console.log(error);
                console.log(req.body);
                res.status(400).json({
                    success: false,
                    error: error.errors.map((err) => {
                        return {
                            path: err.path.join("."),
                            message: err.message
                        };
                    })
                });
            }
        }
    };
}
