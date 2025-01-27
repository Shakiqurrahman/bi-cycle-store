"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const registerValidationSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: 'Name is required.',
    }),
    email: zod_1.z
        .string({
        required_error: 'Email is required.',
    })
        .email({ message: 'Invalid email address' }),
    password: zod_1.z.string({
        required_error: 'Name is required.',
    }),
});
const loginValidationSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: 'Email is required.',
    })
        .email({ message: 'Invalid email address' }),
    password: zod_1.z.string({
        required_error: 'Name is required.',
    }),
});
exports.authValidation = {
    registerValidationSchema,
    loginValidationSchema,
};
