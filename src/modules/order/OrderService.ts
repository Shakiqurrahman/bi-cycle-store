import { Product } from '../product/productModel';
import { TOrder } from './orderInterface';
import { Order } from './orderModel';

const placeOrder = async (orderData: TOrder) => {
    const bicycle = await Product.findById(orderData.product);

    if (!bicycle) {
        throw new Error('Bicycle not found');
    }

    if (bicycle.quantity < orderData.quantity) {
        throw new Error('Insufficient stock available');
    }

    bicycle.quantity -= orderData.quantity;

    if (bicycle.quantity === 0) {
        bicycle.inStock = false;
    }

    await bicycle.save();

    const order = await Order.create(orderData);
    return order;
};

const calculateRevenue = async () => {
    const revenue = await Order.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $project: {
                totalRevenue: {
                    $multiply: ['$productDetails.price', '$quantity'],
                },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: '$totalRevenue',
                },
            },
        },
    ]);

    return revenue.length > 0 ? revenue[0].totalRevenue : 0;
};

export const orderServices = {
    placeOrder,
    calculateRevenue,
};
