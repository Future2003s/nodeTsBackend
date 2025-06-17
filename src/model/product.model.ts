"use strict";
import { model, Schema } from "mongoose";

export interface Product {
    id: string;
    name: string;
    price: number;
    img_url: string;
    description: string;
    details: string[];
    rating: number;
    review_count: number;
    gallery: string[];
}

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    description: { type: String },
    details: { type: [String] },
    rating: { type: Number },
    review_count: { type: Number },
    gallery: { type: [String] }
});

export default model("Products", productSchema);
