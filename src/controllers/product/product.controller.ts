"use strict";
import { Request, Response } from "express";
import { Product } from "~/model/product.model";
import SuccessResponse from "~/response/success.response";
import ProductService from "~/services/product.service";
class ProductController {
    public static async updateProduct(req: Request, res: Response) {
        const id: string = req.params.id;
        const data: Omit<Product, "id"> = req.body;

        new SuccessResponse(200, "Create Product Successfully", await ProductService.updateProduct(id, data)).send(res);
    }

    public static async createProduct(req: Request, res: Response) {
        const data: Product = req.body;
        new SuccessResponse(200, "Create Product Successfully", await ProductService.createProduct(data)).send(res);
    }

    public static async getAllProduct(req: Request, res: Response) {
        new SuccessResponse(200, "Get All Product SuccessFully", await ProductService.getAllProducts()).send(res);
    }
}

export default ProductController;
