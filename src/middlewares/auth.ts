import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/User/userInterface';
import { User } from '../modules/User/userModel';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token =
                req.headers['authorization']?.split(' ')[1] ||
                req?.headers?.authorization;

            // checking if the token is missing
            if (!token) {
                throw new AppError(
                    httpStatus.FORBIDDEN,
                    'You are not authorized!',
                );
            }

            // checking if the given token is valid
            const decoded = jwt.verify(
                token,
                config.ACCESS_TOKEN_SECRET as string,
            ) as JwtPayload;

            const { role, userId } = decoded;

            const user = await User.findById(userId);

            if (!user) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'This user is not found!',
                );
            }

            if (user.isBlocked) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'This user is blocked',
                );
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You are not authorized!',
                );
            }

            req.user = decoded as JwtPayload;
            next();
        },
    );
};

export default auth;
