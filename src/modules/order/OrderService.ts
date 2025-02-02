import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { Product } from '../product/productModel';
import { USER_ROLE } from '../User/userConstant';
import { OrderStatus } from './OrderConstants';
import { TOrder } from './orderInterface';
import { Order } from './orderModel';

const placeOrder = async (orderData: TOrder) => {
    const bicycle = await Product.findById(orderData.product);

    if (!bicycle) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found');
    }

    if (bicycle.quantity < orderData.quantity) {
        throw new AppError(
            httpStatus.NOT_ACCEPTABLE,
            'Insufficient stock available',
        );
    }

    bicycle.quantity -= orderData.quantity;

    if (bicycle.quantity === 0) {
        bicycle.inStock = false;
    }

    await bicycle.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalPrice, ...restOfOrderData } = orderData;
    const order = await Order.create({
        totalPrice: bicycle.price * orderData.quantity,
        ...restOfOrderData,
    });
    return order;
};

const getAllOrdersFromDB = async (userData: JwtPayload) => {
    // for admin - retrieve all orders
    if (userData.role === USER_ROLE.admin) {
        const orders = await Order.find()
            .populate('user', '_id name email role isBlocked')
            .populate(
                'product',
                '-quantity -price -isFeatured -createdAt -updatedAt -__v',
            );
        return orders;
    }

    // for users - retrieve user's individual orders
    const orders = await Order.find({
        user: userData.userId,
    })
        .populate('user', '_id name email role isBlocked')
        .populate(
            'product',
            '-quantity -price -isFeatured -createdAt -updatedAt -__v',
        );

    return orders;
};

const getOrderById = async (orderId: string, userData: JwtPayload) => {
    const order = await Order.findById(orderId)
        .populate('user', '-createdAt -updatedAt -__v')
        .populate(
            'product',
            '-quantity -price -isFeatured -createdAt -updatedAt -__v',
        );
    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'Order not found');
    }

    // const user = order.user as { _id: Types.ObjectId };
    const validUser =
        (order.user && typeof order.user === 'object'
            ? order.user._id.toString()
            : order.user.toString()) === userData.userId ||
        userData.role === USER_ROLE.admin;

    if (!validUser) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            'You are not authorized to view this order!',
        );
    }

    return order;
};

const orderCancel = async (orderId: string, userData: JwtPayload) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
    }

    const validUser = order.user.toString() === userData.userId;

    if (!validUser) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized to cancel this order!',
        );
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    return order;
};
const orderStatusUpdate = async (
    orderId: string,
    status: keyof typeof OrderStatus,
) => {
    const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true, runValidators: true },
    );

    if (!order) {
        throw new AppError(httpStatus.NOT_FOUND, 'Order not found!');
    }

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
    getAllOrdersFromDB,
    getOrderById,
    calculateRevenue,
    orderCancel,
    orderStatusUpdate,
};
