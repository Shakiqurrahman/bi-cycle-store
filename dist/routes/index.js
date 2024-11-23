"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const OrderRoute_1 = require("../modules/order/OrderRoute");
const productRoute_1 = require("../modules/product/productRoute");
exports.router = (0, express_1.Router)();
// product router
exports.router.use('/products', productRoute_1.productRouter);
// order router
exports.router.use('/orders', OrderRoute_1.OrderRouter);
