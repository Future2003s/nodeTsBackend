"use strict";
import { Application } from "express";
import accessRouter from "./common/access.routes";
import paymentRouter from "./payment/payment.routes";

function routes(app: Application) {
    app.use("/v1/api", accessRouter);
    app.use("/v1/api", paymentRouter);
}

export default routes;
