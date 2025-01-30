import { z } from 'zod';
import { OrderStatus } from './OrderConstants';

export const orderValidationSchema = z.object({
    user: z.string({ required_error: 'User Id is required' }),
    product: z.string({ required_error: 'Product Id is required' }),
    quantity: z.number().min(1, 'Quantity must be at least 1'),
    totalPrice: z.number().min(0, 'Total price must be a positive number'),
    status: z
        .enum(
            Object.values(OrderStatus) as [
                keyof typeof OrderStatus,
                ...Array<keyof typeof OrderStatus>,
            ],
        )
        .default(OrderStatus.Pending),
});

export const orderStatusUpdateValidation = z.object({
    status: z.enum(
        Object.values(OrderStatus) as [
            keyof typeof OrderStatus,
            ...Array<keyof typeof OrderStatus>,
        ],
    ),
});
