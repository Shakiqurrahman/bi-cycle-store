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
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const AppError_1 = __importDefault(require("../errors/AppError"));
const userModel_1 = require("../modules/User/userModel");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const auth = (...requiredRoles) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const token = ((_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) ||
            ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.authorization);
        // checking if the token is missing
        if (!token) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized!');
        }
        try {
            // checking if the given token is valid
            const decoded = jsonwebtoken_1.default.verify(token, config_1.config.ACCESS_TOKEN_SECRET);
            const { role, userId } = decoded;
            const user = yield userModel_1.User.findById(userId);
            if (!user) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'This user is not found!');
            }
            if (user.isBlocked) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'This user is blocked');
            }
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
            }
            req.user = decoded;
            next();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }
        catch (error) {
            throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'Invalid token');
        }
    }));
};
exports.default = auth;
