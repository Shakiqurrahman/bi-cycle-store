import { bicycleCategory } from './productContstant';

export type TBicycle = {
    name: string;
    brand: string;
    price: number;
    category: keyof typeof bicycleCategory;
    description: string;
    quantity: number;
    inStock: boolean;
    isFeatured: boolean;
    imageUrl?: string;
};
