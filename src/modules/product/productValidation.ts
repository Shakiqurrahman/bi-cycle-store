import { z } from 'zod';

export const categoryEnumValues = [
    'Road Bicycle',
    'Mountain Bike',
    'Kids Bicycles',
    'Electric Bikes',
    'Hybrid Bicycle',
    'BMX Bike',
] as const;

export const productValidationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    brand: z.string(),
    price: z.string({
        required_error: 'Price must be a positive number',
    }),
    category: z.enum(categoryEnumValues),
    imageUrl: z.string().optional(),
    description: z.string(),
    quantity: z.string({
        required_error: 'Quantity must be a positive number',
    }),
    inStock: z.boolean().default(true),
    isFeatured: z.boolean().default(false),
});

export const productUpdateValidationSchema = productValidationSchema.partial();
