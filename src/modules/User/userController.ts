import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
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

    const user = await userServices.updateUserFromDB(userId, validatedData);

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

export const userController = {
    getUserById,
    updateUser,
    changePassword,
};
