/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from 'http-status';
import { config } from '../../config/config';
import AppError from '../../errors/AppError';
import { TUser } from '../User/userInterface';
import { User } from '../User/userModel';
import { TLoginPayload, TRegisterPayload } from './authInterface';
import { createToken } from './authUtils';

const registerUserIntoDB = async (
    payload: TRegisterPayload,
): Promise<Omit<TUser, 'password'>> => {
    const isUserRegistered = await User.findOne({ email: payload.email });

    if (isUserRegistered) {
        throw new AppError(httpStatus.CONFLICT, 'User already exists');
    }

    const newUser = await User.create(payload);
    const { password, ...data } = newUser.toObject();
    return data;
};

const loginUserFromDB = async (payload: TLoginPayload) => {
    const user = await User.findOne({ email: payload.email }).select(
        '+password',
    );

    if (!user || !(await user.comparePassword(payload.password))) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
    }

    if (user.isBlocked) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'This user is blocked');
    }

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = createToken(
        jwtPayload,
        config.ACCESS_TOKEN_SECRET as string,
        config.ACCESS_TOKEN_EXPIRY as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.REFRESH_TOKEN_SECRET as string,
        config.REFRESH_TOKEN_EXPIRY as string,
    );

    return { accessToken, refreshToken };
};

export const authServices = {
    registerUserIntoDB,
    loginUserFromDB,
};
