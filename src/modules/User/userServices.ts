import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TUser } from './userInterface';
import { User } from './userModel';

const getUserByIdFromDB = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    return user;
};

const updateUserFromDB = async (userId: string, payload: Partial<TUser>) => {
    const user = User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const updatedUser = await User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
};

const changePasswordFromDB = async (
    userData: JwtPayload,
    payload: {
        oldPassword: string;
        newPassword: string;
    },
) => {
    const user = await User.findById(userData.userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }
    const isBlocked = user?.isBlocked;

    if (isBlocked) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'This user is block !');
    }
    if (!(await user.comparePassword(payload.oldPassword))) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect old password');
    }

    user.password = payload.newPassword;
    await user.save();
};

const blockUserFromDB = async (userId: string) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    user.isBlocked = true;
    user.save();

    return;
};

export const userServices = {
    getUserByIdFromDB,
    updateUserFromDB,
    changePasswordFromDB,
    blockUserFromDB,
};
