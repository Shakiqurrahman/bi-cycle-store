"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
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
    type: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
    },
    description: String,
    quantity: {
        type: Number,
        default: 0,
    },
    inStock: Boolean,
}, {
    timestamps: true,
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
