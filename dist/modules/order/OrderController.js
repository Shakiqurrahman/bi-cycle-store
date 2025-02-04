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
exports.orderControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const OrderService_1 = require("./OrderService");
const orderValidation_1 = require("./orderValidation");
const orderABicycle = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const validatedData = orderValidation_1.orderValidationSchema.parse(req.body);
    const newOrder = yield OrderService_1.orderServices.placeOrder(validatedData, userId, req.ip);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.CREATED,
        message: 'Order created successfully!',
        data: newOrder,
    });
}));
const verifyPayment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield OrderService_1.orderServices.verifyPayment(req.query.order_id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Order verified successfully',
        data: order,
    });
}));
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const orders = yield OrderService_1.orderServices.getAllOrdersFromDB(userData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Orders retrieved successfully',
        data: orders,
    });
}));
const getOrderById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const { orderId } = req.params;
    const order = yield OrderService_1.orderServices.getOrderById(orderId, userData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Order retrieved successfully',
        data: order,
    });
}));
const orderCancelByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.user;
    const { orderId } = req.params;
    const order = yield OrderService_1.orderServices.orderCancel(orderId, userData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Order cancelled successfully',
        data: order,
    });
}));
const orderUpdateByAdmins = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId } = req.params;
    const { status } = orderValidation_1.orderStatusUpdateValidation.parse(req.body);
    const order = yield OrderService_1.orderServices.orderStatusUpdate(orderId, status);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Order status updated successfully',
        data: order,
    });
}));
const getRevenue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const totalRevenue = yield OrderService_1.orderServices.calculateRevenue();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Revenue calculated successfully',
        data: { totalRevenue },
    });
}));
exports.orderControllers = {
    orderABicycle,
    verifyPayment,
    getAllOrders,
    getOrderById,
    getRevenue,
    orderCancelByUser,
    orderUpdateByAdmins,
};
