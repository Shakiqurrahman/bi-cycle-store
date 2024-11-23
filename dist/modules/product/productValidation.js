"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateValidationSchema = exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    brand: zod_1.z.string(),
    price: zod_1.z.number().min(0, 'Price must be a positive number'),
    type: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']),
    description: zod_1.z.string(),
    quantity: zod_1.z.number().min(0, 'Price must be a positive number'),
    inStock: zod_1.z.boolean(),
});
exports.productUpdateValidationSchema = exports.productValidationSchema.partial();
