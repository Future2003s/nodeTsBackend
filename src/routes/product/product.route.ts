"use strict";
import { Router } from "express";
import ProductController from "~/controllers/product/product.controller";
const productRouter: Router = Router();

productRouter.get("/allProduct", ProductController.getAllProduct);

export default productRouter;
