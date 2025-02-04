"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const userConstant_1 = require("../User/userConstant");
const OrderController_1 = require("./OrderController");
const router = (0, express_1.Router)();
// Order a Bicycle
router.post('/order/create', (0, auth_1.default)(userConstant_1.USER_ROLE.customer), OrderController_1.orderControllers.orderABicycle);
router.get('/order/verify', (0, auth_1.default)(userConstant_1.USER_ROLE.customer), OrderController_1.orderControllers.verifyPayment);
router.get('/', (0, auth_1.default)(userConstant_1.USER_ROLE.admin, userConstant_1.USER_ROLE.customer), OrderController_1.orderControllers.getAllOrders);
router.get('/:orderId', (0, auth_1.default)(userConstant_1.USER_ROLE.admin, userConstant_1.USER_ROLE.customer), OrderController_1.orderControllers.getOrderById);
router.patch('/:orderId/cancel', (0, auth_1.default)(userConstant_1.USER_ROLE.customer), OrderController_1.orderControllers.orderCancelByUser);
router.patch('/:orderId/status', (0, auth_1.default)(userConstant_1.USER_ROLE.admin), OrderController_1.orderControllers.orderUpdateByAdmins);
// Calculate Revenue from Orders
router.get('/revenue', (0, auth_1.default)(userConstant_1.USER_ROLE.admin), OrderController_1.orderControllers.getRevenue);
exports.OrderRoutes = router;
