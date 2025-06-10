"use strict";
import { Router } from "express";
import PaymentController from "~/controllers/payment/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/create-payment-link", PaymentController.createPaymentLink);

export default paymentRouter;
