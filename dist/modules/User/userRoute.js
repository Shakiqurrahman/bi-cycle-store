"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const multer_1 = require("../../middlewares/multer");
const userConstant_1 = require("./userConstant");
const userController_1 = require("./userController");
const router = (0, express_1.Router)();
router.get('/me', (0, auth_1.default)(userConstant_1.USER_ROLE.admin, userConstant_1.USER_ROLE.customer), userController_1.userController.getUserById);
router.patch('/update', (0, auth_1.default)(userConstant_1.USER_ROLE.admin, userConstant_1.USER_ROLE.customer), multer_1.upload.single('avatar'), userController_1.userController.updateUser);
router.post('/change-password', (0, auth_1.default)(userConstant_1.USER_ROLE.admin, userConstant_1.USER_ROLE.customer), userController_1.userController.changePassword);
router.patch('/:userId/status', (0, auth_1.default)(userConstant_1.USER_ROLE.admin), userController_1.userController.blockUser);
router.get('/', (0, auth_1.default)(userConstant_1.USER_ROLE.admin), userController_1.userController.getAllUsers);
exports.userRoutes = router;
