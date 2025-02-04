"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateValidationSchema = exports.productValidationSchema = exports.categoryEnumValues = void 0;
const zod_1 = require("zod");
exports.categoryEnumValues = [
    'Road Bicycle',
    'Mountain Bike',
    'Kids Bicycles',
    'Electric Bikes',
    'Hybrid Bicycle',
    'BMX Bike',
];
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    brand: zod_1.z.string(),
    price: zod_1.z.string({
        required_error: 'Price must be a positive number',
    }),
    category: zod_1.z.enum(exports.categoryEnumValues),
    imageUrl: zod_1.z.string().optional(),
    description: zod_1.z.string(),
    quantity: zod_1.z.string({
        required_error: 'Quantity must be a positive number',
    }),
    inStock: zod_1.z.boolean().default(true),
    isFeatured: zod_1.z.boolean().default(false),
});
exports.productUpdateValidationSchema = exports.productValidationSchema.partial();
