/* eslint-disable no-unused-vars */

import { Document } from 'mongoose';
import { USER_ROLE } from './userConstant';

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: string;
    isBlocked: boolean;
};

type TUserMethods = {
    comparePassword(password: string): Promise<boolean>;
    generateAccessToken(): Promise<string>;
};

export interface IUser extends TUser, TUserMethods, Document {}

export type TUserRole = keyof typeof USER_ROLE;
