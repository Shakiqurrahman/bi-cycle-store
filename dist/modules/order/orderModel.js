"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const OrderConstants_1 = require("./OrderConstants");
const orderSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: Number,
    totalPrice: Number,
    status: {
        type: String,
        enum: Object.values(OrderConstants_1.OrderStatus),
        default: OrderConstants_1.OrderStatus.Pending,
    },
    paymentStatus: {
        type: String,
        default: 'Pending',
    },
    transaction: {
        id: String,
        transactionStatus: String,
        bank_status: String,
        sp_code: String,
        sp_message: String,
        method: String,
        date_time: String,
    },
}, {
    timestamps: true,
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
