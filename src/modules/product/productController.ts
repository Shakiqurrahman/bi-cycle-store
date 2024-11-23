import { NextFunction, Request, Response } from 'express';
import { productServices } from './productService';
import {
    productUpdateValidationSchema,
    productValidationSchema,
} from './productValidation';

const createABicycle = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const validatedData = productValidationSchema.parse(req.body);
        const newBicycle =
            await productServices.createBicycleIntoDB(validatedData);

        res.status(200).json({
            message: 'Bicycle created successfully',
            status: true,
            data: newBicycle,
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
        const bicycles = await productServices.getAllBicyclesFromDB();

        res.status(200).json({
            message: 'Bicycles retrieved successfully',
            status: true,
            data: bicycles,
        });
    } catch (error) {
        next(error);
    }
};

const getBicycleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;
        const bicycle = await productServices.getBicycleByIdFromDB(productId);

        res.status(200).json({
            message: 'Bicycle retrieved successfully',
            status: true,
            data: bicycle,
        });
    } catch (error) {
        next(error);
    }
};

const updateBicycleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;
        const validatedData = productUpdateValidationSchema.parse(req.body);
        const updatedBicycle = await productServices.updateBicycleFromDB(
            productId,
            validatedData,
        );

        res.status(200).json({
            message: 'Bicycle updated successfully',
            status: true,
            data: updatedBicycle,
        });
    } catch (error) {
        next(error);
    }
};

const deleteBicycleById = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { productId } = req.params;
        await productServices.deleteBicycleFromDB(productId);

        res.status(200).json({
            message: 'Bicycle deleted successfully',
            status: true,
            data: {},
        });
    } catch (error) {
        next(error);
    }
};

export const productController = {
    createABicycle,
    getAllBicycles,
    getBicycleById,
    updateBicycleById,
    deleteBicycleById,
};
