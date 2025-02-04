"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = require("../modules/Auth/authRoute");
const OrderRoute_1 = require("../modules/order/OrderRoute");
const productRoute_1 = require("../modules/product/productRoute");
const userRoute_1 = require("../modules/User/userRoute");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute_1.authRoutes,
    },
    {
        path: '/products',
        route: productRoute_1.productRoutes,
    },
    {
        path: '/orders',
        route: OrderRoute_1.OrderRoutes,
    },
    {
        path: '/users',
        route: userRoute_1.userRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
