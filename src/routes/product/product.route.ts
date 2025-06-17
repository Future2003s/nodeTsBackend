"use strict";
import { Router } from "express";
import ProductController from "~/controllers/product/product.controller";
import asyncHandller from "~/helpers/asynceHandller";
const productRouter: Router = Router();

productRouter.get("/allProduct", asyncHandller(ProductController.getAllProduct));

productRouter.post("/create-product", asyncHandller(ProductController.createProduct));

productRouter.put("/update-product/:id", asyncHandller(ProductController.updateProduct));

export default productRouter;
