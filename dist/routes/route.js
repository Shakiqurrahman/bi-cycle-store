"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoute_1 = require("../modules/Auth/authRoute");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: authRoute_1.authRoutes,
    },
    // {
    //     path: '/blogs',
    //     route: blogRoutes,
    // },
    // {
    //     path: '/admin',
    //     route: adminRoutes,
    // },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
