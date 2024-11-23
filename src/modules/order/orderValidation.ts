import { z } from 'zod';

export const orderValidationSchema = z.object({
    email: z.string().email('Invalid email address'),
    product: z.string().min(1, 'Product Id is required'),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    totalPrice: z.number().min(0, 'Total price must be a positive number'),
});
