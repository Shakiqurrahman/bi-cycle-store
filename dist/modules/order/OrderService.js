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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const productModel_1 = require("../product/productModel");
const userConstant_1 = require("../User/userConstant");
const OrderConstants_1 = require("./OrderConstants");
const orderModel_1 = require("./orderModel");
const placeOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const bicycle = yield productModel_1.Product.findById(orderData.product);
    if (!bicycle) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Bicycle not found');
    }
    if (bicycle.quantity < orderData.quantity) {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Insufficient stock available');
    }
    bicycle.quantity -= orderData.quantity;
    if (bicycle.quantity === 0) {
        bicycle.inStock = false;
    }
    yield bicycle.save();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { totalPrice } = orderData, restOfOrderData = __rest(orderData, ["totalPrice"]);
    const order = yield orderModel_1.Order.create(Object.assign({ totalPrice: bicycle.price * orderData.quantity }, restOfOrderData));
    return order;
});
const getAllOrdersFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // for admin - retrieve all orders
    if (userData.role === userConstant_1.USER_ROLE.admin) {
        const orders = yield orderModel_1.Order.find()
            .populate('user', '_id name email role isBlocked')
            .populate('product', '-quantity -price -isFeatured -createdAt -updatedAt -__v');
        return orders;
    }
    // for users - retrieve user's individual orders
    const orders = yield orderModel_1.Order.find({
        user: userData.userId,
    })
        .populate('user', '_id name email role isBlocked')
        .populate('product', '-quantity -price -isFeatured -createdAt -updatedAt -__v');
    return orders;
});
const getOrderById = (orderId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(orderId)
        .populate('user', '-createdAt -updatedAt -__v')
        .populate('product', '-quantity -price -isFeatured -createdAt -updatedAt -__v');
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    // const user = order.user as { _id: Types.ObjectId };
    const validUser = (order.user && typeof order.user === 'object'
        ? order.user._id.toString()
        : order.user.toString()) === userData.userId ||
        userData.role === userConstant_1.USER_ROLE.admin;
    if (!validUser) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to view this order!');
    }
    return order;
});
const orderCancel = (orderId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findById(orderId);
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    }
    const validUser = order.user.toString() === userData.userId;
    if (!validUser) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized to cancel this order!');
    }
    order.status = OrderConstants_1.OrderStatus.Cancelled;
    yield order.save();
    return order;
});
const orderStatusUpdate = (orderId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield orderModel_1.Order.findByIdAndUpdate(orderId, { status }, { new: true, runValidators: true });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found!');
    }
    return order;
});
const calculateRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenue = yield orderModel_1.Order.aggregate([
        {
            $lookup: {
                from: 'products',
                localField: 'product',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $project: {
                totalRevenue: {
                    $multiply: ['$productDetails.price', '$quantity'],
                },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: {
                    $sum: '$totalRevenue',
                },
            },
        },
    ]);
    return revenue.length > 0 ? revenue[0].totalRevenue : 0;
});
exports.orderServices = {
    placeOrder,
    getAllOrdersFromDB,
    getOrderById,
    calculateRevenue,
    orderCancel,
    orderStatusUpdate,
};
