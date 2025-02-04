import { Types } from 'mongoose';
import { OrderStatus } from './OrderConstants';

type TOrderStatus = keyof typeof OrderStatus;

export type TOrder = {
    user: string | Types.ObjectId;
    product: string | Types.ObjectId;
    quantity: number;
    totalPrice: number;
    status: TOrderStatus;
    paymentStatus: string;
    transaction: {
        id: string;
        transactionStatus: string;
        bank_status: string;
        sp_code: string;
        sp_message: string;
        method: string;
        date_time: string;
    };
};
