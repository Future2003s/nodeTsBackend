"use strict";
import { Application } from "express";
import accessRouter from "./access.routes";
import paymentRouter from "./payment.routes";
import productRouter from "./product.route";
import uploadRouter from "./upload.route";
import mailRouter from "./mail.routes";

function routes(app: Application) {
  app.use("/v1/api/auth", accessRouter);
  app.use("/v1/api", paymentRouter);
  app.use("/v1/api", productRouter);
  app.use("/v1/api", mailRouter);
  app.use("/v1/api/upload", uploadRouter);
}

export default routes;
