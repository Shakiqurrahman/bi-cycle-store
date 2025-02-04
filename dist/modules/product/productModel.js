"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productContstant_1 = require("./productContstant");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    brand: String,
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(productContstant_1.bicycleCategory),
    },
    imageUrl: String,
    description: String,
    quantity: {
        type: Number,
        default: 0,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
