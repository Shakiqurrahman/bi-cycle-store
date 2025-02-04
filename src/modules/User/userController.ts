import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import { uploadToCloudinary } from '../../utils/cloudinary';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './userServices';
import { userValidation } from './userValidation';

const getUserById = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const user = await userServices.getUserByIdFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user retrieved succesfully!',
        data: user,
    });
});

const updateUser = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const validatedData = userValidation.updateUser.parse(req.body);

    let avatarUrl: string | undefined = undefined;

    if (req.file) {
        const uploadResult = await uploadToCloudinary(req.file.path);
        avatarUrl = uploadResult.secure_url;

        if (!uploadResult) {
            throw new AppError(
                httpStatus.INTERNAL_SERVER_ERROR,
                'Upload failed',
            );
        }
    }

    const user = await userServices.updateUserFromDB(userId, {
        avatar: avatarUrl,
        ...validatedData,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user updated succesfully!',
        data: user,
    });
});

const changePassword: RequestHandler = catchAsync(async (req, res) => {
    const userData = req.user;
    const validatedData = userValidation.changePassword.parse(req.body);

    await userServices.changePasswordFromDB(userData, validatedData);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Password changed successfully',
    });
});

const blockUser = catchAsync(async (req, res) => {
    const { userId } = req.params;

    await userServices.blockUserFromDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user blocked succesfully!',
        data: {},
    });
});

export const userController = {
    getUserById,
    updateUser,
    changePassword,
    blockUser,
};
