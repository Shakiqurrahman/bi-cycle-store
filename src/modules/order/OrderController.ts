import { NextFunction, Request, Response } from 'express';
import { orderServices } from './OrderService';
import { orderValidationSchema } from './orderValidation';

const orderABicycle = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const validatedData = orderValidationSchema.parse(req.body);
        const newOrder = await orderServices.placeOrder(validatedData);

        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: newOrder,
        });
    } catch (error) {
        next(error);
    }
};

const getRevenue = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const totalRevenue = await orderServices.calculateRevenue();

        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue },
        });
    } catch (error) {
        next(error);
    }
};

export const orderControllers = {
    orderABicycle,
    getRevenue,
};
