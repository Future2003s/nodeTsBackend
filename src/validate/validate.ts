"use strict";

import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

function validateMiddleware(schema: ZodSchema<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({
                    success: false,
                    errors: error.errors.map((err) => {
                        return {
                            path: err.path.join("."),
                            message: err.message
                        };
                    })
                });
            }
            res.status(500).json({ message: "Internal server error" });
        }
    };
}

export { validateMiddleware };
