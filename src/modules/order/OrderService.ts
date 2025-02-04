import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { Product } from '../product/productModel';
import { USER_ROLE } from '../User/userConstant';
import { User } from '../User/userModel';
import { OrderStatus } from './OrderConstants';
import { TOrder } from './orderInterface';
import { Order } from './orderModel';
import { orderUtils } from './orderUtils';

const placeOrder = async (
    orderData: Partial<TOrder>,
    userId: string,
    client_ip: string,
) => {
    const bicycle = await Product.findById(orderData.product);

    if (!bicycle) {
        throw new AppError(httpStatus.NOT_FOUND, 'Bicycle not found');
    }

    if (bicycle.quantity < orderData.quantity!) {
        throw new AppError(
            httpStatus.NOT_ACCEPTABLE,
            'Insufficient stock available',
        );
    }

    bicycle.quantity -= orderData.quantity!;

    if (bicycle.quantity === 0) {
        bicycle.inStock = false;
    }

    await bicycle.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalPrice, ...restOfOrderData } = orderData;
    let newOrder = await Order.create({
        totalPrice: bicycle.price * orderData.quantity!,
        ...restOfOrderData,
    });

    const user = await User.findById(userId);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    // payment integration
    const shurjopayPayload = {
        amount: orderData.totalPrice,
        order_id: newOrder._id,
        currency: 'BDT',
        customer_name: user.name,
        customer_address: 'Dhaka, Bangladesh',
        customer_email: user.email,
        customer_phone: '0134567890',
        customer_city: 'Dhaka',
        client_ip,
    };

    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

    if (payment?.transactionStatus) {
        newOrder = await newOrder.updateOne({
            transaction: {
                id: payment.sp_order_id,
                transactionStatus: payment.transactionStatus,
            },
        });
    }
    return payment.checkout_url;
    // return order;
};

const verifyPayment = async (order_id: string) => {
    const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

    if (verifiedPayment.length) {
        await Order.findOneAndUpdate(
            {
                'transaction.id': order_id,
            },
            {
                'transaction.bank_status': verifiedPayment[0].bank_status,
                'transaction.sp_code': verifiedPayment[0].sp_code,
                'transaction.sp_message': verifiedPayment[0].sp_message,
                'transaction.transactionStatus':
                    verifiedPayment[0].transaction_status,
                'transaction.method': verifiedPayment[0].method,
                'transaction.date_time': verifiedPayment[0].date_time,
                paymentStatus:
                    verifiedPayment[0].bank_status === 'Success'
                        ? 'Paid'
                        : verifiedPayment[0].bank_status === 'Failed'
                          ? 'Pending'
                          : verifiedPayment[0].bank_status === 'Cancel'
                            ? 'Cancelled'
                            : '',
            },
        );
    }

    return verifiedPayment;
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
    verifyPayment,
    getAllOrdersFromDB,
    getOrderById,
    calculateRevenue,
    orderCancel,
    orderStatusUpdate,
};
