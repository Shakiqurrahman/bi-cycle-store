import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderServices } from './OrderService';
import { orderValidationSchema } from './orderValidation';

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
    getRevenue,
};
