"use strict";
import PayOS from "@payos/node";
import { Request, Response } from "express";
import envConfig from "~/config/envConfig";

const payOS = new PayOS(envConfig.YOUR_CLIENT_ID_PAY, envConfig.YOUR_API_KEY_PAY, envConfig.YOUR_CHECKSUM_KEY_PAY);
class PaymentController {
    public static async createPaymentLink(req: Request, res: Response) {
        const YOUR_DOMAIN = `https://lalalycheee.vn`;
        try {
            const paymentLinkResponse = await payOS.createPaymentLink({
                ...req.body,
                orderCode: Number(String(Date.now()).slice(-6)),
                returnUrl: `${YOUR_DOMAIN}/payment-callback`,
                cancelUrl: `${YOUR_DOMAIN}/payment-callback`
            });

            res.status(200).json(paymentLinkResponse);
        } catch (error: any) {
            res.status(error.status || 500).json({ error: true, message: error.message || "Lỗi không xác định" });
        }
    }
}

export default PaymentController;
