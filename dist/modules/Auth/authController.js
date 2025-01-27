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
exports.authControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = require("../../config/config");
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const authService_1 = require("./authService");
const authValidation_1 = require("./authValidation");
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = authValidation_1.authValidation.registerValidationSchema.parse(req.body);
    const newUser = yield authService_1.authServices.registerUserIntoDB(validatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User registered successfully',
        data: newUser,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedData = authValidation_1.authValidation.loginValidationSchema.parse(req.body);
    const { accessToken, refreshToken } = yield authService_1.authServices.loginUserFromDB(validatedData);
    res.cookie('refreshToken', refreshToken, {
        secure: config_1.config.NODE_ENV === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Login successful',
        data: {
            accessToken,
        },
    });
}));
exports.authControllers = {
    registerUser,
    loginUser,
};
