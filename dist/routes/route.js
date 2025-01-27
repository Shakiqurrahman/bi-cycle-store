"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = require("../modules/Auth/authRoute");
const OrderRoute_1 = require("../modules/order/OrderRoute");
const productRoute_1 = require("../modules/product/productRoute");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute_1.authRoutes,
    },
    {
        path: '/product',
        route: productRoute_1.productRoutes,
    },
    {
        path: '/order',
        route: OrderRoute_1.OrderRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
