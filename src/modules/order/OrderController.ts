import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './OrderService';
import {
    orderStatusUpdateValidation,
    orderValidationSchema,
} from './orderValidation';

const orderABicycle = catchAsync(async (req, res) => {
    const validatedData = orderValidationSchema.parse(req.body);
    const newOrder = await orderServices.placeOrder(validatedData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Order created successfully',
        data: newOrder,
    });
});

const getAllOrders = catchAsync(async (req, res) => {
    const userData = req.user;
    const orders = await orderServices.getAllOrdersFromDB(userData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Orders retrieved successfully',
        data: orders,
    });
});

const getOrderById = catchAsync(async (req, res) => {
    const userData = req.user;
    const { orderId } = req.params;
    const order = await orderServices.getOrderById(orderId, userData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Order retrieved successfully',
        data: order,
    });
});

const orderCancelByUser = catchAsync(async (req, res) => {
    const userData = req.user;
    const { orderId } = req.params;

    const order = await orderServices.orderCancel(orderId, userData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Order cancelled successfully',
        data: order,
    });
});

const orderUpdateByAdmins = catchAsync(async (req, res) => {
    const { orderId } = req.params;
    const { status } = orderStatusUpdateValidation.parse(req.body);

    const order = await orderServices.orderStatusUpdate(orderId, status);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Order status updated successfully',
        data: order,
    });
});

const getRevenue = catchAsync(async (req, res) => {
    const totalRevenue = await orderServices.calculateRevenue();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Revenue calculated successfully',
        data: { totalRevenue },
    });
});

export const orderControllers = {
    orderABicycle,
    getAllOrders,
    getOrderById,
    getRevenue,
    orderCancelByUser,
    orderUpdateByAdmins,
};
