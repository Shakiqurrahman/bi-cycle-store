import { Types } from 'mongoose';
import { OrderStatus } from './OrderConstants';

type TOrderStatus = keyof typeof OrderStatus;

export type TOrder = {
    userId: string | Types.ObjectId;
    product: string | Types.ObjectId;
    quantity: number;
    totalPrice: number;
    status: TOrderStatus;
};
