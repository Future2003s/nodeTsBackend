"use strict";
import { Request, Response } from "express";

class PaymentController {
    public static createPaymentLink(req: Request, res: Response) {
        res.status(200).json({
            name: "OK"
        });
    }
}

export default PaymentController;
