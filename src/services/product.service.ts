"use strict";
import productModel, { Product } from "~/model/product.model";
import ErrorResponse from "~/response/error.response";

class ProductService {
    public static async updateProduct(id: string, data: Omit<Product, "id">) {
        const findProduct = await productModel.findById(id);
        if (!findProduct) {
            throw new ErrorResponse(400, "Can't find product id");
        }

        findProduct.updateOne({
            name: data.name
        });

        findProduct.save();

        return findProduct;
    }

    public static async createProduct(data: Product) {
        const dataResult = { ...data };
        try {
            if (!data.name || !data.price || !data.img_url) {
                throw new ErrorResponse(400, "Name, price, and img_url are required");
            }
            return await productModel.create({ ...data });
        } catch (error) {
            throw new ErrorResponse(400, String(error) || "Error creating product");
        }
    }

    public static async getAllProducts() {
        try {
            return await productModel.find({});
        } catch (error) {
            throw new ErrorResponse(400, "Error get all product");
        }
    }
}

export default ProductService;
