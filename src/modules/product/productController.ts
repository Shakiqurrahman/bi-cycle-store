import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './productService';
import {
    productUpdateValidationSchema,
    productValidationSchema,
} from './productValidation';

const createABicycle = catchAsync(async (req, res) => {
    const validatedData = productValidationSchema.parse(req.body);
    const newBicycle = await productServices.createBicycleIntoDB(validatedData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bicycle created successfully',
        data: newBicycle,
    });
});

const getAllBicycles = catchAsync(async (req, res) => {
    const bicycles = await productServices.getAllBicyclesFromDB();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bicycles retrieved successfully',
        data: bicycles,
    });
});

const getBicycleById = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const bicycle = await productServices.getBicycleByIdFromDB(productId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bicycle retrieved successfully',
        data: bicycle,
    });
});

const updateBicycleById = catchAsync(async (req, res) => {
    const { productId } = req.params;
    const validatedData = productUpdateValidationSchema.parse(req.body);
    const updatedBicycle = await productServices.updateBicycleFromDB(
        productId,
        validatedData,
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bicycle updated successfully',
        data: updatedBicycle,
    });
});

const deleteBicycleById = catchAsync(async (req, res) => {
    const { productId } = req.params;
    await productServices.deleteBicycleFromDB(productId);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Bicycle deleted successfully',
        data: {},
    });
});

export const productController = {
    createABicycle,
    getAllBicycles,
    getBicycleById,
    updateBicycleById,
    deleteBicycleById,
};
