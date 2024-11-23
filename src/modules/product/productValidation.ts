import { z } from 'zod';

export const productValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    brand: z.string(),
    price: z.number().min(0, 'Price must be a positive number'),
    type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric']),
    description: z.string(),
    quantity: z.number().min(0, 'Price must be a positive number'),
    inStock: z.boolean(),
});

export const productUpdateValidationSchema = productValidationSchema.partial();
