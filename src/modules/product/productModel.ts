import { model, Schema } from 'mongoose';
import { TBicycle } from './productInterface';

const productSchema = new Schema<TBicycle>({
    name: {
        type: String,
        required: true,
    },
    brand: String,
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
    },
    description: String,
    quantity: {
        type: Number,
        default: 0,
    },
    inStock: Boolean,
});

export const Product = model<TBicycle>('Product', productSchema);
