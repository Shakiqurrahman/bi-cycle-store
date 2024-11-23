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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const productModel_1 = require("../product/productModel");
const orderModel_1 = require("./orderModel");
const placeOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const bicycle = yield productModel_1.Product.findById(orderData.product);
    if (!bicycle) {
        throw new Error('Bicycle not found');
    }
    if (bicycle.quantity < orderData.quantity) {
        throw new Error('Insufficient stock available');
    }
    bicycle.quantity -= orderData.quantity;
    if (bicycle.quantity === 0) {
        bicycle.inStock = false;
    }
    yield bicycle.save();
    const order = yield orderModel_1.Order.create(orderData);
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
    calculateRevenue,
};
