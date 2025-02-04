"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderStatusUpdateValidation = exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const OrderConstants_1 = require("./OrderConstants");
exports.orderValidationSchema = zod_1.z.object({
    user: zod_1.z.string({ required_error: 'User Id is required' }),
    product: zod_1.z.string({ required_error: 'Product Id is required' }),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
    totalPrice: zod_1.z.number().min(0, 'Total price must be a positive number'),
    status: zod_1.z
        .enum(Object.values(OrderConstants_1.OrderStatus))
        .default(OrderConstants_1.OrderStatus.Pending),
});
exports.orderStatusUpdateValidation = zod_1.z.object({
    status: zod_1.z.enum(Object.values(OrderConstants_1.OrderStatus)),
});
