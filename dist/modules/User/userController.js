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
exports.userController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const cloudinary_1 = require("../../utils/cloudinary");
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const userServices_1 = require("./userServices");
const userValidation_1 = require("./userValidation");
const getUserById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const user = yield userServices_1.userServices.getUserByIdFromDB(userId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user retrieved succesfully!',
        data: user,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const validatedData = userValidation_1.userValidation.updateUser.parse(req.body);
    let avatarUrl = undefined;
    if (req.file) {
        const uploadResult = yield (0, cloudinary_1.uploadToCloudinary)(req.file.path);
        avatarUrl = uploadResult.secure_url;
        if (!uploadResult) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Upload failed');
        }
    }
    const user = yield userServices_1.userServices.updateUserFromDB(userId, Object.assign({ avatar: avatarUrl }, validatedData));
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'user updated succesfully!',
        data: user,
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const validatedData = userValidation_1.userValidation.changePassword.parse(req.body);
    yield userServices_1.userServices.changePasswordFromDB(userData, validatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Password changed successfully',
    });
}));
const blockUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const validatedData = userValidation_1.userValidation.statusUpdate.parse(req.body);
    yield userServices_1.userServices.blockUserFromDB(userId, validatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User status update succesfully!',
        data: {},
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userServices_1.userServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrived succesfully!',
        data: users,
    });
}));
exports.userController = {
    getUserById,
    updateUser,
    changePassword,
    blockUser,
    getAllUsers,
};
