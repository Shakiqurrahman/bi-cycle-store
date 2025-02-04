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
        paymentStatus: {
            type: String,
            default: 'Pending',
        },
        transaction: {
            id: String,
            transactionStatus: String,
            bank_status: String,
            sp_code: String,
            sp_message: String,
            method: String,
            date_time: String,
        },
    },
    {
        timestamps: true,
    },
);

export const Order = model<TOrder>('Order', orderSchema);
