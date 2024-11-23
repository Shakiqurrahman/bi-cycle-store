import { model, Schema, Types } from 'mongoose';
import { TOrder } from './orderInterface';

const orderSchema = new Schema<TOrder>(
    {
        email: {
            type: String,
            lowercase: true,
            required: true,
        },
        product: {
            type: Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: Number,
        totalPrice: Number,
    },
    {
        timestamps: true,
    },
);

export const Order = model<TOrder>('Order', orderSchema);
