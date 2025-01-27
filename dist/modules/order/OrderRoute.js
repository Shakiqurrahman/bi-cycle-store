"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const OrderController_1 = require("./OrderController");
const router = (0, express_1.Router)();
// Order a Bicycle
router.post('/', OrderController_1.orderControllers.orderABicycle);
// Calculate Revenue from Orders
router.get('/revenue', OrderController_1.orderControllers.getRevenue);
exports.OrderRoutes = router;
