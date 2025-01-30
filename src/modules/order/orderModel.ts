import { model, Schema } from 'mongoose';
import { OrderStatus } from './OrderConstants';
import { TOrder } from './orderInterface';

const orderSchema = new Schema<TOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: Number,
        totalPrice: Number,
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.Pending,
        },
    },
    {
        timestamps: true,
    },
);

export const Order = model<TOrder>('Order', orderSchema);
