"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: Number,
    totalPrice: Number,
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
