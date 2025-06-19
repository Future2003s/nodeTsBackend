"use strict";
import { Application } from "express";
import accessRouter from "./common/access.routes";
import paymentRouter from "./payment.routes";
import productRouter from "./product.route";
import uploadRouter from "./upload.route";

function routes(app: Application) {
    app.use("/v1/api", accessRouter);
    app.use("/v1/api", paymentRouter);
    app.use("/v1/api", productRouter);
    app.use("/v1/api", uploadRouter);
}

export default routes;
