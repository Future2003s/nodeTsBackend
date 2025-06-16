"use strict";
import { Request, Response } from "express";
import SuccessResponse from "~/response/success.response";
import ProductService from "~/services/product.service";
class ProductController {
    public static async createProduct(req: Request, res: Response) {
        new SuccessResponse(200, "Create Product Successfully", await ProductService.getAllProducts).send(res);
    }

    public static async getAllProduct(req: Request, res: Response) {
        new SuccessResponse(200, "Get All Product SuccessFully", await ProductService.getAllProducts).send(res);
    }
}

export default ProductController;
