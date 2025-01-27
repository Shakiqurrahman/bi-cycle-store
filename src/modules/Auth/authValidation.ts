import { z } from 'zod';

const registerValidationSchema = z.object({
    name: z.string({
        required_error: 'Name is required.',
    }),
    email: z
        .string({
            required_error: 'Email is required.',
        })
        .email({ message: 'Invalid email address' }),
    password: z.string({
        required_error: 'Name is required.',
    }),
});

const loginValidationSchema = z.object({
    email: z
        .string({
            required_error: 'Email is required.',
        })
        .email({ message: 'Invalid email address' }),
    password: z.string({
        required_error: 'Name is required.',
    }),
});

export const authValidation = {
    registerValidationSchema,
    loginValidationSchema,
};
