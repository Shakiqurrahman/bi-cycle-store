"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
exports.orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    product: zod_1.z.string().min(1, 'Product Id is required'),
    quantity: zod_1.z.number().min(1, 'Quantity must be at least 1'),
    totalPrice: zod_1.z.number().min(0, 'Total price must be a positive number'),
});
