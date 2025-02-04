import { model, Schema } from 'mongoose';
import { TBicycle } from './productInterface';
import { bicycleCategory } from './productContstant';

const productSchema = new Schema<TBicycle>(
    {
        name: {
            type: String,
            required: true,
        },
        brand: String,
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            enum: Object.values(bicycleCategory),
        },
        imageUrl: String,
        description: String,
        quantity: {
            type: Number,
            default: 0,
        },
        inStock: {
            type: Boolean,
            default: true,
        },
        isFeatured: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

export const Product = model<TBicycle>('Product', productSchema);
