"use strict";
import { Application } from "express";
import accessRouter from "./common/access.routes";
import paymentRouter from "./payment/payment.routes";
import productRouter from "./product/product.route";

function routes(app: Application) {
    app.use("/v1/api", accessRouter);
    app.use("/v1/api", paymentRouter);
    app.use("/v1/api", productRouter);
}

export default routes;
