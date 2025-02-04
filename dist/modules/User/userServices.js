"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const userModel_1 = require("./userModel");
const getUserByIdFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found !');
    }
    return user;
});
const updateUserFromDB = (userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = userModel_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const updatedUser = yield userModel_1.User.findByIdAndUpdate(userId, payload, {
        new: true,
        runValidators: true,
    });
    return updatedUser;
});
const changePasswordFromDB = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findById(userData.userId).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isBlocked) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'This user is block !');
    }
    if (!(yield user.comparePassword(payload.oldPassword))) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Incorrect old password');
    }
    user.password = payload.newPassword;
    yield user.save();
});
const blockUserFromDB = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    user.isBlocked = status.isBlocked;
    yield user.save();
    return;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userModel_1.User.find({ role: 'customer' });
    return users;
});
exports.userServices = {
    getUserByIdFromDB,
    updateUserFromDB,
    changePasswordFromDB,
    blockUserFromDB,
    getAllUsersFromDB,
};
