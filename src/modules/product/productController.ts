import { NextFunction, Request, Response } from 'express';
import { productValidationSchema } from './productValidation';

const createABicycle = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const validatedData = productValidationSchema.parse(req.body);
    try {
        res.status(200).json({
            message: 'Bicycle created successfully',
            status: true,
            // data :
        });
    } catch (error) {
        next(error);
    }
};

const getAllBicycles = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        res.status(200).json({
            message: 'Bicycles retrieved successfully',
            status: true,
            // data :
        });
    } catch (error) {
        next(error);
    }
};

export const productController = { createABicycle, getAllBicycles };
