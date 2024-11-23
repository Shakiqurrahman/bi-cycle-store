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
exports.orderControllers = void 0;
const OrderService_1 = require("./OrderService");
const orderValidation_1 = require("./orderValidation");
const orderABicycle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = orderValidation_1.orderValidationSchema.parse(req.body);
        const newOrder = yield OrderService_1.orderServices.placeOrder(validatedData);
        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: newOrder,
        });
    }
    catch (error) {
        next(error);
    }
});
const getRevenue = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield OrderService_1.orderServices.calculateRevenue();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: { totalRevenue },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.orderControllers = {
    orderABicycle,
    getRevenue,
};
