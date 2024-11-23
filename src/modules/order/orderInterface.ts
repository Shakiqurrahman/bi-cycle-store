import { Types } from 'mongoose';

export type TOrder = {
    email: string;
    product: string | Types.ObjectId;
    quantity: number;
    totalPrice: number;
};
