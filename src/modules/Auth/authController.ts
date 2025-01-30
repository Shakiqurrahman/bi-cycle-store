import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { config } from '../../config/config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authServices } from './authService';
import { authValidation } from './authValidation';

const registerUser: RequestHandler = catchAsync(async (req, res) => {
    const validatedData = authValidation.registerValidationSchema.parse(
        req.body,
    );

    const newUser = await authServices.registerUserIntoDB(validatedData);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User registered successfully',
        data: newUser,
    });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
    const validatedData = authValidation.loginValidationSchema.parse(req.body);

    const { accessToken, refreshToken } =
        await authServices.loginUserFromDB(validatedData);

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Login successful',
        data: {
            accessToken,
        },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    const accessToken = await authServices.generateNewAccessToken(refreshToken);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Access token is retrieved succesfully!',
        data: accessToken,
    });
});

const logoutUser = catchAsync(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!req.cookies || !refreshToken) {
        return sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Logged out successfully',
        });
    }

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Logged out successfully',
    });
});

export const authControllers = {
    registerUser,
    loginUser,
    refreshToken,
    logoutUser,
};
