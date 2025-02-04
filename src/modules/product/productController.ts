import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';
import sendResponse from '../../utils/sendResponse';
import { productServices } from './productService';
import {
    productUpdateValidationSchema,
    productValidationSchema,
} from './productValidation';

const createABicycle = catchAsync(async (req, res) => {
    const validatedData = productValidationSchema.parse(req.body);

    let imageUrl: string | undefined = undefined;

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path);
        imageUrl = uploadResult.secure_url;

        if (!uploadResult) {
            throw new AppError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Upload failed',
            );
        }
    }

    const newBicycle = await productServices.createBicycleIntoDB({
        imageUrl,
        ...validatedData,
        price: Number(validatedData.price),
        quantity: Number(validatedData.quantity),
    });

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

    let imageUrl: string | undefined = undefined;

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path);
        imageUrl = uploadResult.secure_url;

        if (!uploadResult) {
            throw new AppError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Upload failed',
            );
        }
    }

    const updatedBicycle = await productServices.updateBicycleFromDB(
        productId,
        {
            imageUrl,
            ...validatedData,
            price: Number(validatedData.price),
            quantity: Number(validatedData.quantity),
        },
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
